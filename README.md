# RTS Link for Home Assistant

Control Somfy RTS shutters, awnings and gates from Home Assistant, through a small USB transmitter ([RTS Link hardware](https://github.com/kevin-briand/rts_link_hardware)).

Each RTS Link remote is a virtual Somfy remote: you pair it with one or more covers exactly like an extra original remote, then drive it from Home Assistant.

## Features

- **Covers** (`cover.rts_link_<id>`): open, close and stop / "My" (favourite position).
- **Buttons** (`button.rts_link_<id>`): a single "My" press, for gates or garage doors.
- **Management panel** in the sidebar (admins only):
  - create a remote and pair it with a cover,
  - pair one more cover with an existing remote (grouped control),
  - rename, change the type (cover / button), delete,
  - test buttons (▲ / ☆ / ▼) on every remote.
- Automatic reconnection when the USB transmitter is unplugged or restarted.

## Requirements

- Home Assistant 2024.7 or newer.
- An [RTS Link transmitter](https://github.com/kevin-briand/rts_link_hardware) (Arduino Nano + RFM69HW) plugged into the Home Assistant host, with **firmware 2.0 or newer** recommended (the integration also works with the previous firmware).
- If Home Assistant runs in Docker, pass the USB device to the container (e.g. `devices: ["/dev/ttyUSB0:/dev/ttyUSB0"]`).

## Installation

### With HACS
1. Open HACS, click the 3 dots in the top right corner > **Custom repositories**.
2. Add `https://github.com/kevin-briand/rts_link` with the **Integration** category.
3. Find **RTS Link** in the list and download it, then restart Home Assistant.
4. Go to **Settings > Devices & services > Add integration** and select **RTS Link**.
5. Choose the USB port of the transmitter.

### Manual
1. Copy `custom_components/rts_link` into the `custom_components` folder of your Home Assistant configuration.
2. Restart Home Assistant, then follow steps 4 and 5 above.

## Usage

### Add a cover
1. Open the **RTS Link** panel in the sidebar.
2. Enter a name, choose the type (*Shutter* or *Button*) and click **Create**.
3. On the **original remote** of the cover, press the **PROG** button for about 3 seconds: the cover makes a short movement.
4. Confirm the dialog in the panel: the cover moves again, the pairing is done.

The new entity is created immediately.

### Control several covers with one remote
Use the "pair one more cover" action (link icon) on an existing remote and follow the same PROG procedure with the other cover. Both covers then react to the same entity.

### Position and state
RTS is one-way: Home Assistant cannot know the real position of a cover, especially when the original remote is used. The entities are therefore declared with an *assumed state*: open, close and stop always stay available.

The displayed position is an estimate: 100 % after *open*, 0 % after *close*, 50 % after *stop / My* (`MY_POSITION` in `cover.py`).

> Note: on a Somfy motor, *stop* sent while the cover is idle moves it to its "My" position; sent while the cover is moving, it stops it where it is.

## Troubleshooting

| Symptom | Cause / fix |
|---|---|
| `Device on /dev/ttyUSB0 is not a RTS Link` | The transmitter did not send its banner. Close any other program using the port (Arduino serial monitor…) and check the firmware. |
| The integration keeps retrying at startup | The transmitter is not plugged in or not found: Home Assistant retries automatically. |
| Commands answer `OK` but covers do not move | Radio side: check the firmware (`setHighPower(true)` for the RFM69HW, `DRY_RUN` disabled) and the antenna. See the hardware README. |
| A cover answers an error | Its remote ID is unknown to the transmitter (e.g. after a firmware `RESET`): delete it and pair it again. |

To get more details, enable debug logging for the integration (**Settings > Devices & services > RTS Link > ⋮ > Enable debug logging**).

## Development

The panel is written in TypeScript with [Lit](https://lit.dev):

```bash
cd custom_components/rts_link/frontend
yarn install
yarn build    # compiles to dist/rts-link-panel.js
yarn lint
yarn format
```

See [CHANGELOG.md](CHANGELOG.md) for the release history.
