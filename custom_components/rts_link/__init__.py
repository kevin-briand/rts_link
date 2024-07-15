"""The Detailed Hello World Push integration."""
from __future__ import annotations

import logging
import asyncio

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from .api.ha_api import async_register_api
from .const import DOMAIN, PORT, RTS_API
from .panel import async_register_panel, async_unregister_panel
from custom_components.rts_link.rts_link_api import RTSLinkApi
from .rts_serial import RTSSerial
from .websocket.ws_ha import async_register_ws

_LOGGER = logging.getLogger(__name__)


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up Hello World from a config entry."""
    tty = await RTSSerial.get_device_tty(entry.data['vid'], entry.data['pid'])
    if not tty:
        return False

    rts_api = RTSLinkApi(hass, tty)
    await rts_api.async_init()
    rts_api.start()
    hass.data.setdefault(DOMAIN, {})[RTS_API] = rts_api

    await hass.config_entries.async_forward_entry_setups(entry, ['cover'])

    await async_register_panel(hass)
    await async_register_api(hass)
    await async_register_ws(hass)
    return True


async def async_unload_entry(hass, entry):
    """Supprimer les entités lors de la désinstallation de l'intégration."""
    serial = hass.data[DOMAIN][RTS_API]
    serial.stop()
    await async_unregister_panel(hass)

    entities = hass.data[DOMAIN].pop("sensor", [])
    unload_tasks = [entity.async_remove() for entity in entities]
    await asyncio.gather(*unload_tasks)
    return True
