from homeassistant.core import HomeAssistant
import logging

from homeassistant.helpers import entity_registry

from custom_components.rts_link.button import BpEntity
from custom_components.rts_link.const import ENTITIES, DOMAIN
from custom_components.rts_link.cover import ShutterEntity
from custom_components.rts_link.enum import CoverType

_LOGGER = logging.getLogger(__name__)


async def add_cover(hass: HomeAssistant, name: str, rts_id: int, cover_type: CoverType):
    if (DOMAIN not in hass.data or "add_button_entities" not in hass.data[DOMAIN]
            or "add_cover_entities" not in hass.data[DOMAIN]):
        _LOGGER.error("Cannot add cover, platform not set up")
        return
    if cover_type == CoverType.BUTTON:
        entity = BpEntity(name, rts_id, hass)
        hass.data[DOMAIN]['add_button_entities']([entity])
    else:
        entity = ShutterEntity(name, rts_id, hass)
        hass.data[DOMAIN]['add_cover_entities']([entity])

    covers = hass.data[DOMAIN][ENTITIES]
    covers.append(entity)


async def remove_cover(hass: HomeAssistant, rts_id: int):
    covers = hass.data[DOMAIN][ENTITIES]
    updated_list = []
    for cover in covers:
        if cover.get_id() != rts_id:
            updated_list.append(cover)
        else:
            await cover.async_remove()
            entity_entry = entity_registry.async_get(hass).async_get(cover.entity_id)
            if entity_entry:
                entity_registry.async_get(hass).async_remove(cover.entity_id)

    hass.data[DOMAIN][ENTITIES] = updated_list


async def rename_cover(hass: HomeAssistant, rts_id: int, name: str):
    covers: [ShutterEntity] = hass.data[DOMAIN][ENTITIES]
    for cover in covers:
        if cover.get_id() == rts_id:
            cover._attr_name = name


async def change_type_cover(hass: HomeAssistant, cover):
    await remove_cover(hass, cover.id)
    await add_cover(hass, cover.name, cover.id, cover.cover_type)
