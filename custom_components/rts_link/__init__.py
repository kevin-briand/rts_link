"""The RTS Link integration."""
from __future__ import annotations

import logging

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.exceptions import ConfigEntryNotReady

from .api.ha_api import async_register_api
from .const import DOMAIN, RTS_API, ENTITIES
from .panel import async_register_panel, async_unregister_panel
from .rts_link_api import RTSLinkApi
from .rts_serial import RTSSerial
from .websocket.ws_ha import async_register_ws

_LOGGER = logging.getLogger(__name__)

PLATFORMS = ['cover', 'button']
# HTTP views and websocket commands cannot be unregistered: register them once per HA run
HTTP_REGISTERED = 'http_registered'


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up rts_link from a config entry."""
    tty = await RTSSerial.get_device_tty(entry.data['vid'], entry.data['pid'])
    if not tty:
        # HA will retry the setup later (device unplugged, USB not ready yet...)
        raise ConfigEntryNotReady('RTS Link device not found')

    rts_api = RTSLinkApi(hass, tty)
    await rts_api.async_init()
    if not await rts_api.start():
        await rts_api.stop()
        raise ConfigEntryNotReady(f'RTS Link device on {tty} is not answering')

    domain_data = hass.data.setdefault(DOMAIN, {})
    domain_data[RTS_API] = rts_api
    domain_data[ENTITIES] = []

    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)

    await async_register_panel(hass)
    if not domain_data.get(HTTP_REGISTERED):
        await async_register_api(hass)
        await async_register_ws(hass)
        domain_data[HTTP_REGISTERED] = True
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload rts_link: entities, panel and serial port."""
    unload_ok = await hass.config_entries.async_unload_platforms(entry, PLATFORMS)
    if not unload_ok:
        return False

    async_unregister_panel(hass)

    domain_data = hass.data.get(DOMAIN, {})
    rts_api: RTSLinkApi | None = domain_data.pop(RTS_API, None)
    if rts_api:
        await rts_api.stop()
    domain_data.pop(ENTITIES, None)
    domain_data.pop('add_cover_entities', None)
    domain_data.pop('add_button_entities', None)
    return True
