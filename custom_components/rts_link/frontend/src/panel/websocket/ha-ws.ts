import { type HomeAssistant } from '../../types/hass'
import { type CoverDto } from './dto/coverDto'

export type CoverCommand = 'up' | 'down' | 'stop' | 'press'

export const rtsLinkGetAllCovers = async (hass: HomeAssistant): Promise<CoverDto[]> => {
  return await hass.callWS<CoverDto[]>({ type: 'rts_link_get_all_covers' })
}

export const rtsLinkSendCommand = async (hass: HomeAssistant, rtsId: number, command: CoverCommand): Promise<void> => {
  await hass.callWS({ type: 'rts_link_send_command', rts_id: rtsId, command })
}
