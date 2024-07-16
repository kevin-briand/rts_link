from homeassistant.components import frontend
from homeassistant.components import panel_custom
from homeassistant.core import HomeAssistant
from homeassistant.components.http import StaticPathConfig

from custom_components.rts_link.const import DOMAIN


async def async_register_panel(hass: HomeAssistant):
    url = F'custom_components/{DOMAIN}/frontend/dist/rts-link-panel.js'

    await hass.http.async_register_static_paths(
        [
            StaticPathConfig('/api/panel_custom/rts-link', url, False)
        ]
    )

    await panel_custom.async_register_panel(
        hass,
        webcomponent_name='rts-link-panel',
        frontend_url_path=DOMAIN,
        module_url='/api/panel_custom/rts-link',
        sidebar_title='RTS Link',
        sidebar_icon='mdi:antenna',
        require_admin=True,
        config={},
        config_panel_domain=DOMAIN,
    )


def async_unregister_panel(hass):
    frontend.async_remove_panel(hass, DOMAIN)
