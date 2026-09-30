"""Config flow for rts link integration."""
from __future__ import annotations

import logging
from typing import Any

import voluptuous as vol
import serial.tools.list_ports
import asyncio

from homeassistant import config_entries, exceptions
from homeassistant.core import HomeAssistant

from .const import DOMAIN
from .rts_serial import RTSSerial

_LOGGER = logging.getLogger(__name__)


async def validate_input(hass: HomeAssistant, data: dict) -> dict[str, Any]:
    """Validate the user input allows us to connect.

    Data has the keys from DATA_SCHEMA with values provided by the user.
    """

    ser = RTSSerial(data['USB'])
    try:
        if not await ser.start_serial():
            raise CannotConnect()
    finally:
        # Release the port, async_setup_entry will open it again
        ser.stop()

    devices = await asyncio.get_running_loop().run_in_executor(None, serial.tools.list_ports.comports)
    for device in devices:
        if device.device == data['USB']:
            data['vid'] = device.vid
            data['pid'] = device.pid

    if data.get('vid') is None or data.get('pid') is None:
        raise CannotConnect()

    return {
        'vid': data['vid'],
        'pid': data['pid']
    }


class ConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Handle a config flow"""

    VERSION = 1

    async def async_step_user(self, user_input=None):
        """Handle the initial step."""

        # Only a single instance of the integration
        if self._async_current_entries():
            return self.async_abort(reason="single_instance_allowed")

        devices = await asyncio.get_running_loop().run_in_executor(None, serial.tools.list_ports.comports)
        usb_found = []
        for device in devices:
            usb_found.append(device.device)

        if len(usb_found) == 0:
            return self.async_abort(reason="no_devices_found")

        errors = {}
        if user_input is not None:
            try:
                await validate_input(self.hass, user_input)
                return self.async_create_entry(title="RTS Link", data=user_input)
            except CannotConnect:
                errors["base"] = "cannot_connect"
            except Exception:  # pylint: disable=broad-except
                _LOGGER.exception("Unexpected exception")
                errors["base"] = "unknown"

        return self.async_show_form(
            step_id="user",
            data_schema=vol.Schema({vol.Required('USB', default=usb_found[0]): vol.In(usb_found)}),
            errors=errors,
        )


class CannotConnect(exceptions.HomeAssistantError):
    """Error to indicate we cannot connect."""
