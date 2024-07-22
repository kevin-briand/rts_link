import asyncio
import logging
from typing import Optional
import serial_asyncio
import serial.tools.list_ports

_LOGGER = logging.getLogger(__name__)


class RTSProtocol(asyncio.Protocol):
    def __init__(self):
        self.transport = None
        self.buffer = ''
        self.ready_event = asyncio.Event()

    def connection_made(self, transport):
        self.transport = transport
        _LOGGER.info('Connection established.')

    def data_received(self, data):
        self.buffer += data.decode('utf-8')
        if '\n' in self.buffer:
            self.ready_event.set()

    def connection_lost(self, exc):
        _LOGGER.error('Connection lost.')
        self.transport = None

    async def write(self, data: str) -> bool:
        if self.transport:
            self.transport.write(data.encode('utf-8'))
            return True
        return False

    async def read(self) -> Optional[str]:
        try:
            await asyncio.wait_for(self.ready_event.wait(), timeout=5.0)
            data = self.buffer
            self.buffer = ''
            self.ready_event.clear()
            return data.strip()
        except asyncio.TimeoutError:
            _LOGGER.error('Read timeout')
            return None


class RTSSerial:
    def __init__(self, port: str):
        self.port = port
        self.protocol: Optional[RTSProtocol] = None
        self.running = True
        self.lock = asyncio.Lock()

    async def start_serial(self) -> bool:
        try:
            loop = asyncio.get_running_loop()
            transport, protocol = await serial_asyncio.create_serial_connection(
                loop, RTSProtocol, self.port, baudrate=115200)
            self.protocol = protocol
            result = await self.protocol.read()
            _LOGGER.info(result)
            return 'Somfy RTS link' in result
        except Exception as e:
            _LOGGER.error(f"Error: {e}")
            return False

    async def run(self):
        while self.running:
            if not self.protocol or not self.protocol.transport:
                _LOGGER.error(f"Error: serial disconnected")
                _LOGGER.error(f"Restarting in 10s")
                await asyncio.sleep(10)
                await self.start_serial()
            await asyncio.sleep(1)

    def stop(self):
        self.running = False
        if self.protocol and self.protocol.transport:
            self.protocol.transport.close()

    async def write(self, data: str) -> bool:
        async with self.lock:
            if self.protocol:
                _LOGGER.info(f'{data}')
                if await self.protocol.write(data):
                    result = await self.protocol.read()
                    if "OK" in result:
                        return True
        return False

    async def write_prog(self, data: str) -> Optional[str]:
        async with self.lock:
            if self.protocol:
                self.protocol.ready_event.clear()
                if not await self.protocol.write(data):
                    return None
                result = await self.protocol.read()
                _LOGGER.info(f"{data} {result}")
                if not result or 'ERROR' in result:
                    return None
                return result
        return None

    @staticmethod
    async def get_device_tty(vid: str, pid: str) -> Optional[str]:
        loop = asyncio.get_running_loop()
        devices = await loop.run_in_executor(None, serial.tools.list_ports.comports)
        for device in devices:
            if device.vid == vid and device.pid == pid:
                return device.device
        return None
