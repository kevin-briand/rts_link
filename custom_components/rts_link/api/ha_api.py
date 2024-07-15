from homeassistant.components.http.data_validator import RequestDataValidator
from homeassistant.helpers.http import HomeAssistantView
from homeassistant.helpers import config_validation as cv
import voluptuous as vol

from custom_components.rts_link.rts_link_api import RTSLinkApi
from custom_components.rts_link.const import DOMAIN, RTS_API


class RTSLinkNewProgView(HomeAssistantView):
    """Endpoint to adding new cover."""

    url = "/api/rts_link/cover/new"
    name = "api:rts_link:cover:new"

    @RequestDataValidator(
        vol.Schema(
            {
                vol.Required('name'): cv.string,
            }
        )
    )
    async def post(self, request, data):
        hass = request.app["hass"]
        rts_api: RTSLinkApi = hass.data[DOMAIN][RTS_API]
        result = await rts_api.add_cover(data['name'])
        return self.json({"success": result})


class RTSLinkAddShutterView(HomeAssistantView):
    """Endpoint to adding new shutter."""

    url = "/api/rts_link/cover/add"
    name = "api:rts_link:cover:add"

    @RequestDataValidator(
        vol.Schema(
            {
                vol.Required('id'): cv.string,
            }
        )
    )
    async def post(self, request, data):
        hass = request.app["hass"]
        rts_api: RTSLinkApi = hass.data[DOMAIN][RTS_API]
        result = rts_api.add_shutter_to_existing_cover(int(data['id']))
        return self.json({"success": result})


class RTSLinkRemoveCoverView(HomeAssistantView):
    """Endpoint to remove a cover."""

    url = "/api/rts_link/cover/remove"
    name = "api:rts_link:cover:remove"

    @RequestDataValidator(
        vol.Schema(
            {
                vol.Required('id'): cv.string,
            }
        )
    )
    async def post(self, request, data):
        hass = request.app["hass"]
        rts_api: RTSLinkApi = hass.data[DOMAIN][RTS_API]
        result = await rts_api.remove_cover(int(data['id']))
        return self.json({"success": result})


class RTSLinkRenameCoverView(HomeAssistantView):
    """Endpoint to remove a cover."""

    url = "/api/rts_link/cover/rename"
    name = "api:rts_link:cover:rename"

    @RequestDataValidator(
        vol.Schema(
            {
                vol.Required('id'): cv.string,
                vol.Required('name'): cv.string,
            }
        )
    )
    async def post(self, request, data):
        hass = request.app["hass"]
        rts_api: RTSLinkApi = hass.data[DOMAIN][RTS_API]
        result = await rts_api.rename_cover(int(data['id']), data['name'])
        return self.json({"success": result})


async def async_register_api(hass):
    hass.http.register_view(RTSLinkNewProgView)
    hass.http.register_view(RTSLinkAddShutterView)
    hass.http.register_view(RTSLinkRemoveCoverView)
    hass.http.register_view(RTSLinkRenameCoverView)
