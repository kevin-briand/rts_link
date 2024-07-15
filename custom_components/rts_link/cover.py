"""cover class"""
import logging

from homeassistant import exceptions
from homeassistant.components.cover import CoverDeviceClass, CoverEntity, CoverEntityFeature
from homeassistant.core import HomeAssistant

from custom_components.rts_link.command import Command
from custom_components.rts_link.const import DOMAIN, RTS_API, COVER

_LOGGER = logging.getLogger(__name__)


async def async_setup_entry(hass, config, async_add_entities):
    """Initialize and register sensors"""
    rts_api = hass.data[DOMAIN][RTS_API]
    hass.data[DOMAIN]['add_entities'] = async_add_entities

    shutter_entities = []
    for cover in rts_api.get_all_covers():
        shutter_entities.append(ShutterEntity(cover.name, cover.id, hass))
    # register covers
    async_add_entities(shutter_entities)
    hass.data[DOMAIN][COVER] = shutter_entities
    return True


async def add_cover(hass: HomeAssistant, name: str, rts_id: int):
    if DOMAIN not in hass.data or "add_entities" not in hass.data[DOMAIN]:
        _LOGGER.error("Cannot add cover, platform not set up")
        return
    async_add_entities = hass.data[DOMAIN]['add_entities']
    cover = ShutterEntity(name, rts_id, hass)
    async_add_entities([cover])
    covers = hass.data[DOMAIN][COVER]
    covers.append(cover)


async def remove_cover(hass: HomeAssistant, rts_id: int):
    covers: [ShutterEntity] = hass.data[DOMAIN][COVER]
    updated_list = []
    for cover in covers:
        if cover.get_id() != rts_id:
            updated_list.append(cover)
        else:
            await cover.async_remove()
    hass.data[DOMAIN][COVER] = updated_list


async def rename_cover(hass: HomeAssistant, rts_id: int, name: str):
    covers: [ShutterEntity] = hass.data[DOMAIN][COVER]
    for cover in covers:
        if cover.get_id() == rts_id:
            cover._attr_name = name


class ShutterEntity(CoverEntity):
    def __init__(self, name: str, rts_id: int, hass: HomeAssistant):
        """Node sensor"""
        super().__init__()
        self.entity_id = f'cover.rts_link_{rts_id}'
        self._attr_unique_id = f'rts_link_{rts_id}'
        self._attr_name = name
        self.id = rts_id
        self._attr_device_class = CoverDeviceClass.SHUTTER
        self._attr_is_closed = True
        self._attr_supported_features = CoverEntityFeature.OPEN | CoverEntityFeature.CLOSE | CoverEntityFeature.STOP
        self.hass = hass

    async def async_open_cover(self, **kwargs):
        """Open the cover."""
        self.move_cover(Command.UP)
        self._attr_is_closed = False

    async def async_close_cover(self, **kwargs):
        """Close cover."""
        self.move_cover(Command.DOWN)
        self._attr_is_closed = True

    async def async_stop_cover(self, **kwargs):
        """Stop the cover."""
        self.move_cover(Command.STOP)
        self._attr_is_closed = False

    def move_cover(self, command: Command):
        rts_api = self.hass.data[DOMAIN][RTS_API]
        if not rts_api.send_command(self.id, command):
            raise ShutterError()

    def get_id(self):
        return self.id


class ShutterError(exceptions.HomeAssistantError):
    """Error indicating that the cover cannot be moved."""
