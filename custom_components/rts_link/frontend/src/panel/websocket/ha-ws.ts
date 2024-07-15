import { type HomeAssistant } from 'custom-card-helpers'
import {CoverDto} from "./dto/coverDto";

export const rtsLinkGetAllCovers = async (hass: HomeAssistant): Promise<CoverDto[]> => {
  return await hass.callWS<CoverDto[]>({ type: 'rts_link_get_all_covers' })
}
