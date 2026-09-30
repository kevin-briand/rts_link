from homeassistant.components import frontend
from homeassistant.components import panel_custom
from homeassistant.core import HomeAssistant, callback
from homeassistant.components.http import StaticPathConfig

from custom_components.rts_link.const import DOMAIN

PANEL_URL = '/api/panel_custom/rts-link'
STATIC_REGISTERED = 'static_registered'


async def async_register_panel(hass: HomeAssistant):
    domain_data = hass.data.setdefault(DOMAIN, {})
    # A static path cannot be registered twice (integration reload)
    if not domain_data.get(STATIC_REGISTERED):
        path = hass.config.path(f'custom_components/{DOMAIN}/frontend/dist/rts-link-panel.js')
        await hass.http.async_register_static_paths(
            [
                StaticPathConfig(PANEL_URL, path, False)
            ]
        )
        domain_data[STATIC_REGISTERED] = True

    await panel_custom.async_register_panel(
        hass,
        webcomponent_name='rts-link-panel',
        frontend_url_path=DOMAIN,
        module_url=PANEL_URL,
        sidebar_title='RTS Link',
        sidebar_icon='mdi:antenna',
        require_admin=True,
        config={},
        config_panel_domain=DOMAIN,
    )


@callback
def async_unregister_panel(hass):
    frontend.async_remove_panel(hass, DOMAIN)
