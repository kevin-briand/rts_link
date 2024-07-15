"""WS endpoints register"""
import voluptuous as vol
from homeassistant.components.websocket_api import decorators, async_register_command
from homeassistant.core import callback, HomeAssistant

from custom_components.rts_link import RTSLinkApi, DOMAIN, RTS_API


@callback
@decorators.websocket_command({
    vol.Required("type"): "rts_link_get_all_covers",
})
@decorators.async_response
async def handle_get_all_covers(hass: HomeAssistant, connection, data):
    """Handle subscribe updates."""
    rts_api: RTSLinkApi = hass.data[DOMAIN][RTS_API]
    connection.send_result(data["id"], rts_api.get_all_covers())


async def async_register_ws(hass):
    async_register_command(
        hass,
        handle_get_all_covers
    )
