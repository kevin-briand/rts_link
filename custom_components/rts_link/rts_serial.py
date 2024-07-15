import time
import threading
from concurrent.futures import ThreadPoolExecutor
from typing import Optional

import serial
import logging
import asyncio

_LOGGER = logging.getLogger(__name__)


class RTSSerial(threading.Thread):
    def __init__(self, port: str):
        super().__init__()
        self.ser: Optional[serial.Serial] = None
        self.port = port
        self.running = True
        self.is_available = threading.Lock()

    def start_serial(self) -> bool:
        try:
            self.ser = serial.Serial(self.port, 57600, timeout=3)
            result = self.read()
            _LOGGER.info(result)
            return 'Somfy RTS link' in result
        except Exception as e:
            _LOGGER.error(f"Error: {e}")
            if self.ser:
                self.ser.close()

    def run(self):
        while self.running:
            try:
                line = self.read(False)
                if not line:
                    continue
                _LOGGER.info(f"Received: {line}")
            except Exception as e:
                if not self.running:
                    return
                _LOGGER.error(f"Error: {e}")
                _LOGGER.error(f"restart in 10s")
                if self.ser:
                    self.ser.close()
                time.sleep(10)
                self.start_serial()

    def stop(self):
        self.running = False
        if self.ser:
            self.ser.close()

    def read(self, blocking=True):
        result = None
        if self.is_available.acquire(blocking=blocking):
            try:
                result = self.ser.readline().decode('utf-8').rstrip()
            finally:
                self.is_available.release()
        return result

    def write(self, data: str):
        self.ser.cancel_write()
        try:
            with self.is_available:
                # send data
                self.ser.write(data.encode('utf-8'))
                # read response
                result = self.ser.readline().decode('utf-8').rstrip()
                return 'OK' in result
        except Exception as e:
            _LOGGER.error(f"Error: {e}")

    def write_prog(self, data: str):
        self.ser.cancel_write()
        try:
            with self.is_available:
                # send data
                self.ser.write(data.encode('utf-8'))
                # read response
                result = self.ser.readline().decode('utf-8').rstrip()
                _LOGGER.info(f"{result} {data}")
            if 'ERROR' in result:
                return None
            return result
        except Exception as e:
            _LOGGER.error(f"Error: {e}")

    @staticmethod
    async def get_device_tty(vid: str, pid: str):
        loop = asyncio.get_running_loop()
        with ThreadPoolExecutor() as executor:
            devices = await loop.run_in_executor(executor, serial.tools.list_ports.comports)
        for device in devices:
            if device.vid == vid and device.pid == pid:
                return device.device
        return None
