from homeassistant import exceptions
from homeassistant.components.button import ButtonEntity
from homeassistant.core import HomeAssistant
import logging

from custom_components.rts_link.const import DOMAIN, RTS_API
from custom_components.rts_link.command import Command
from custom_components.rts_link.const import ENTITIES
from custom_components.rts_link.enum import CoverType

_LOGGER = logging.getLogger(__name__)


async def async_setup_entry(hass, config, async_add_entities):
    """Initialize and register sensors"""
    rts_api = hass.data[DOMAIN][RTS_API]
    hass.data[DOMAIN]['add_button_entities'] = async_add_entities

    entities = []
    for cover in rts_api.get_all_covers():
        if cover.cover_type == CoverType.BUTTON:
            entity = BpEntity(cover.name, cover.id, hass)
            entities.append(entity)
    # register buttons
    async_add_entities(entities)
    hass.data[DOMAIN][ENTITIES] = entities + hass.data[DOMAIN][ENTITIES]
    return True


class BpEntity(ButtonEntity):
    def __init__(self, name: str, rts_id: int, hass: HomeAssistant):
        """button entity"""
        super().__init__()
        self.entity_id = f'button.rts_link_{rts_id}'
        self._attr_icon = 'mdi:garage-open'
        self._attr_unique_id = f'rts_link_{rts_id}'
        self._attr_name = name
        self.id = rts_id
        self.hass = hass

    async def async_press(self) -> None:
        """Handle the button press"""
        await self.move_cover(Command.STOP)

    async def move_cover(self, command: Command):
        rts_api = self.hass.data[DOMAIN][RTS_API]
        if not await rts_api.send_command(self.id, command):
            raise ButtonError()

    def get_id(self):
        return self.id


class ButtonError(exceptions.HomeAssistantError):
    """Error indicating that the cover cannot be moved."""

    def __init__(self):
        super().__init__("The cover cannot be moved.")
