"""WS endpoints register"""
import voluptuous as vol
from homeassistant.components.websocket_api import (
    decorators,
    async_register_command,
    ERR_NOT_FOUND,
    ERR_HOME_ASSISTANT_ERROR,
)
from homeassistant.core import HomeAssistant
from homeassistant.exceptions import HomeAssistantError

from custom_components.rts_link.const import DOMAIN, RTS_API, ENTITIES
from custom_components.rts_link.rts_link_api import RTSLinkApi

# Panel test buttons -> entity method, so the entity state stays consistent
ENTITY_ACTIONS = {
    'up': 'async_open_cover',
    'down': 'async_close_cover',
    'stop': 'async_stop_cover',
    'press': 'async_press',
}


@decorators.websocket_command({
    vol.Required("type"): "rts_link_get_all_covers",
})
@decorators.require_admin
@decorators.async_response
async def handle_get_all_covers(hass: HomeAssistant, connection, data):
    """Return every registered cover."""
    rts_api: RTSLinkApi | None = hass.data.get(DOMAIN, {}).get(RTS_API)
    if rts_api is None:
        connection.send_error(data["id"], ERR_NOT_FOUND, "RTS Link is not loaded")
        return
    connection.send_result(data["id"], [cover.as_dict() for cover in rts_api.get_all_covers()])


@decorators.websocket_command({
    vol.Required("type"): "rts_link_send_command",
    vol.Required("rts_id"): vol.Coerce(int),
    vol.Required("command"): vol.In(list(ENTITY_ACTIONS)),
})
@decorators.require_admin
@decorators.async_response
async def handle_send_command(hass: HomeAssistant, connection, data):
    """Send a command to a cover from the panel (test buttons)."""
    entities = hass.data.get(DOMAIN, {}).get(ENTITIES, [])
    entity = next((e for e in entities if e.get_id() == data["rts_id"]), None)
    method = getattr(entity, ENTITY_ACTIONS[data["command"]], None) if entity else None
    if method is None:
        connection.send_error(data["id"], ERR_NOT_FOUND, "Cover or command not found")
        return
    try:
        await method()
    except HomeAssistantError as err:
        connection.send_error(data["id"], ERR_HOME_ASSISTANT_ERROR, str(err))
        return
    connection.send_result(data["id"], {"success": True})


async def async_register_ws(hass):
    async_register_command(hass, handle_get_all_covers)
    async_register_command(hass, handle_send_command)
