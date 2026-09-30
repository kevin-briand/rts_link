import asyncio
import logging
from typing import Optional
import serial_asyncio_fast
import serial.tools.list_ports

_LOGGER = logging.getLogger(__name__)

BANNER = 'Somfy RTS link'
# The Arduino reboots when the port is opened, the banner arrives after ~2s
BANNER_TIMEOUT = 5.0
# A radio frame takes ~0.5s to emit
COMMAND_TIMEOUT = 3.0
RECONNECT_DELAY = 10


class RTSProtocol(asyncio.Protocol):
    """Line based protocol: every '\\n' terminated line is queued."""

    def __init__(self):
        self.transport = None
        self._buffer = ''
        self.lines: asyncio.Queue[str] = asyncio.Queue()

    def connection_made(self, transport):
        self.transport = transport
        _LOGGER.info('Connection established.')

    def data_received(self, data):
        self._buffer += data.decode('utf-8', errors='replace')
        while '\n' in self._buffer:
            line, self._buffer = self._buffer.split('\n', 1)
            line = line.strip()
            if line:
                self.lines.put_nowait(line)

    def connection_lost(self, exc):
        _LOGGER.error('Connection lost: %s', exc)
        self.transport = None

    def is_connected(self) -> bool:
        return self.transport is not None and not self.transport.is_closing()

    def clear(self):
        """Drop any unread line (late answer of a previous command...)."""
        while not self.lines.empty():
            self.lines.get_nowait()

    def write(self, data: str) -> bool:
        if not self.is_connected():
            return False
        self.transport.write(data.encode('utf-8'))
        return True

    async def read(self, timeout: Optional[float] = None) -> Optional[str]:
        try:
            return await asyncio.wait_for(self.lines.get(), timeout=timeout or COMMAND_TIMEOUT)
        except asyncio.TimeoutError:
            _LOGGER.error('Read timeout')
            return None


class RTSSerial:
    def __init__(self, port: str):
        self.port = port
        self.protocol: Optional[RTSProtocol] = None
        self.running = True
        self.lock = asyncio.Lock()

    def is_connected(self) -> bool:
        return self.protocol is not None and self.protocol.is_connected()

    async def start_serial(self) -> bool:
        """(Re)open the serial port and wait for the device banner."""
        self._close()
        try:
            loop = asyncio.get_running_loop()
            _, protocol = await serial_asyncio_fast.create_serial_connection(
                loop, RTSProtocol, self.port, baudrate=115200)
        except Exception as e:
            _LOGGER.error("Cannot open %s: %s", self.port, e)
            return False

        self.protocol = protocol
        # Skip any stray line (boot noise) until the banner or the timeout
        deadline = asyncio.get_running_loop().time() + BANNER_TIMEOUT
        while (remaining := deadline - asyncio.get_running_loop().time()) > 0:
            result = await self.protocol.read(remaining)
            _LOGGER.info('Device answered: %s', result)
            if result is None:
                break
            if BANNER in result:
                return True
        _LOGGER.error('Device on %s is not a RTS Link', self.port)
        self._close()
        return False

    async def run(self):
        """Reconnect the serial port when it is lost."""
        while self.running:
            if not self.is_connected():
                _LOGGER.error("Serial disconnected, restarting in %ss", RECONNECT_DELAY)
                await asyncio.sleep(RECONNECT_DELAY)
                if not self.running:
                    break
                async with self.lock:
                    await self.start_serial()
            await asyncio.sleep(1)

    def _close(self):
        if self.protocol and self.protocol.transport:
            self.protocol.transport.close()
        self.protocol = None

    def stop(self):
        self.running = False
        self._close()

    async def _send(self, data: str) -> Optional[str]:
        """Send one command and return the answer line (None on failure)."""
        async with self.lock:
            if not self.is_connected():
                _LOGGER.error('Cannot send %s: serial disconnected', data.strip())
                return None
            self.protocol.clear()
            if not self.protocol.write(data):
                return None
            result = await self.protocol.read()
            _LOGGER.info('%s -> %s', data.strip(), result)
            return result

    async def write(self, data: str) -> bool:
        result = await self._send(data)
        return result == 'OK'

    async def write_prog(self, data: str) -> Optional[str]:
        result = await self._send(data)
        if not result or not result.isdigit():
            return None
        return result

    @staticmethod
    async def get_device_tty(vid: int, pid: int) -> Optional[str]:
        loop = asyncio.get_running_loop()
        devices = await loop.run_in_executor(None, serial.tools.list_ports.comports)
        for device in devices:
            if device.vid == vid and device.pid == pid:
                return device.device
        return None
