import logging
from dataclasses import dataclass

from homeassistant.core import HomeAssistant
from homeassistant.helpers.storage import Store

from custom_components.rts_link.rts_serial import RTSSerial
from custom_components.rts_link.cover import remove_cover, add_cover, rename_cover

_LOGGER = logging.getLogger(__name__)


@dataclass
class Cover:
    def __init__(self, id: int, name: str, **kwargs):
        self.id = id
        self.name = name


class RTSLinkApi:
    def __init__(self, hass: HomeAssistant, port: str):
        self.ser = RTSSerial(port)
        self.hass = hass
        self.store = Store(hass, 1, 'rts-link')
        self.covers = []

    async def async_init(self):
        data = await self.store.async_load()
        if data:
            _LOGGER.info(data)
            self.covers = [Cover(**cover) for cover in data]

    def start(self):
        self.ser.start_serial()
        self.ser.start()

    def stop(self):
        self.ser.stop()

    def is_accessible(self):
        return self.ser.start_serial()

    def send_command(self, rts_id: int, command) -> bool:
        return self.ser.write(F'{command.value};{rts_id}\n')

    async def add_cover(self, name: str) -> bool:
        _LOGGER.info('adding new cover : ' + name)
        data_id = self.ser.write_prog(F'PROG\n')
        _LOGGER.info(data_id)
        if not data_id:
            return False
        rts_id = int(data_id)
        await add_cover(self.hass, name, rts_id)
        self.covers.append(Cover(rts_id, name))
        await self.store.async_save(self.covers)
        return True

    def add_shutter_to_existing_cover(self, rts_id: int) -> bool:
        data_id = self.ser.write_prog(F'MULTIPROG;{rts_id}\n')
        if not data_id:
            return False
        data_id = int(data_id)
        return rts_id == data_id

    async def remove_cover(self, rts_id: int):
        covers = []
        for cover in self.covers:
            if cover.id != rts_id:
                covers.append(cover)
        self.covers = covers
        await self.store.async_save(self.covers)
        await remove_cover(self.hass, rts_id)
        return True

    async def rename_cover(self, rts_id: int, name: str):
        covers = []
        for cover in self.covers:
            if cover.id == rts_id:
                cover.name = name
            covers.append(cover)
        self.covers = covers
        await self.store.async_save(self.covers)
        await rename_cover(self.hass, rts_id, name)
        return True

    def get_all_covers(self):
        return self.covers
