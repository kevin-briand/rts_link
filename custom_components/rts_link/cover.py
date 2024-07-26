"""cover class"""
import logging

from homeassistant import exceptions
from homeassistant.components.cover import CoverEntity, CoverEntityFeature, CoverDeviceClass
from homeassistant.core import HomeAssistant

from custom_components.rts_link.command import Command
from custom_components.rts_link.const import DOMAIN, RTS_API, ENTITIES
from custom_components.rts_link.enum import CoverType

_LOGGER = logging.getLogger(__name__)


async def async_setup_entry(hass, config, async_add_entities):
    """Initialize and register sensors"""
    rts_api = hass.data[DOMAIN][RTS_API]
    hass.data[DOMAIN]['add_cover_entities'] = async_add_entities

    entities = []
    for cover in rts_api.get_all_covers():
        if cover.cover_type == CoverType.SHUTTER:
            entity = ShutterEntity(cover.name, cover.id, hass)
            entities.append(entity)
    # register covers
    async_add_entities(entities)
    hass.data[DOMAIN][ENTITIES] = entities + hass.data[DOMAIN][ENTITIES]
    return True


class ShutterEntity(CoverEntity):
    def __init__(self, name: str, rts_id: int, hass: HomeAssistant):
        """Shutter entity"""
        super().__init__()
        self._attr_unique_id = f'rts_link_{rts_id}'
        self._attr_name = name
        self.id = rts_id
        self.hass = hass
        self.entity_id = f'cover.rts_link_{rts_id}'
        self._attr_device_class = CoverDeviceClass.SHUTTER
        self._attr_is_closed = None
        self._attr_current_cover_position = 0
        self._attr_supported_features = CoverEntityFeature.OPEN | CoverEntityFeature.STOP | CoverEntityFeature.CLOSE

    async def async_open_cover(self, **kwargs):
        """Open the cover."""
        await self.move_cover(Command.UP)
        self._attr_current_cover_position = 100
        self._attr_is_closed = False
        self.async_write_ha_state()

    async def async_close_cover(self, **kwargs):
        """Close cover."""
        await self.move_cover(Command.DOWN)
        self._attr_current_cover_position = 0
        self._attr_is_closed = True
        self.async_write_ha_state()

    async def async_stop_cover(self, **kwargs):
        """Stop the cover."""
        await self.move_cover(Command.STOP)
        self._attr_current_cover_position = 50
        self._attr_is_closed = False
        self.async_write_ha_state()

    async def move_cover(self, command: Command):
        rts_api = self.hass.data[DOMAIN][RTS_API]
        if not await rts_api.send_command(self.id, command):
            raise ShutterError()

    def get_id(self):
        return self.id


class ShutterError(exceptions.HomeAssistantError):
    """Error indicating that the cover cannot be moved."""
    def __init__(self):
        super().__init__("The cover cannot be moved.")
