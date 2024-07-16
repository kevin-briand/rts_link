"""Coordinator class"""
import logging

from homeassistant.helpers.update_coordinator import DataUpdateCoordinator

from custom_components.rts_link.const import DOMAIN

_LOGGER = logging.getLogger(__name__)


class SwitchCoordinator(DataUpdateCoordinator):
    """Massa coordinator."""

    def __init__(self, hass):
        """Initialize coordinator."""
        super().__init__(
            hass,
            _LOGGER,
            name=DOMAIN,
        )
