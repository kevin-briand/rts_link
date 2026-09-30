import asyncio
import contextlib
import logging

from homeassistant.core import HomeAssistant
from homeassistant.helpers.storage import Store

from custom_components.rts_link.rts_serial import RTSSerial
from custom_components.rts_link.manage_cover import remove_cover, add_cover, rename_cover, change_type_cover, CoverType

_LOGGER = logging.getLogger(__name__)


class Cover:
    def __init__(self, id: int, name: str, cover_type: CoverType = CoverType.SHUTTER, **kwargs):
        self.id = int(id)
        self.name = name
        self.cover_type = CoverType(cover_type)

    def as_dict(self) -> dict:
        return {'id': self.id, 'name': self.name, 'cover_type': str(self.cover_type)}


class RTSLinkApi:
    def __init__(self, hass: HomeAssistant, port: str):
        self.ser = RTSSerial(port)
        self.hass = hass
        self.store = Store(hass, 1, 'rts-link')
        self.covers = []
        self.run_task = None
        self.run_queue = None

    async def async_init(self):
        data = await self.store.async_load()
        if data:
            _LOGGER.info(data)
            self.covers = [Cover(**cover) for cover in data]

    async def start(self) -> bool:
        """Open the serial port and start the reconnection loop."""
        connected = await self.ser.start_serial()
        self.run_task = self.hass.async_create_background_task(self.ser.run(), 'rts_link_serial')
        return connected

    async def stop(self):
        self.ser.stop()
        if self.run_task:
            self.run_task.cancel()
            with contextlib.suppress(asyncio.CancelledError):
                await self.run_task
            self.run_task = None

    async def _save(self):
        await self.store.async_save([cover.as_dict() for cover in self.covers])

    async def send_command(self, rts_id: int, command) -> bool:
        return await self.ser.write(F'{command.value};{rts_id}\n')

    async def add_cover(self, name: str, cover_type: CoverType) -> bool:
        _LOGGER.info('adding new cover : ' + name)
        data_id = await self.ser.write_prog(F'PROG\n')
        if not data_id:
            return False
        rts_id = int(data_id)
        await add_cover(self.hass, name, rts_id, cover_type)
        self.covers.append(Cover(rts_id, name, cover_type))
        await self._save()
        return True

    async def add_shutter_to_existing_cover(self, rts_id: int) -> bool:
        data_id = await self.ser.write_prog(F'MULTIPROG;{rts_id}\n')
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
        await self._save()
        await remove_cover(self.hass, rts_id)
        return True

    async def rename_cover(self, rts_id: int, name: str):
        covers = []
        for cover in self.covers:
            if cover.id == rts_id:
                cover.name = name
            covers.append(cover)
        self.covers = covers
        await self._save()
        await rename_cover(self.hass, rts_id, name)
        return True

    async def change_type_cover(self, rts_id: int, cover_type: CoverType):
        covers = []
        for cover in self.covers:
            if cover.id == rts_id:
                cover.cover_type = cover_type
                await change_type_cover(self.hass, cover)
            covers.append(cover)
        self.covers = covers
        await self._save()
        return True

    def get_all_covers(self):
        return self.covers
