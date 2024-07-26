import { type HomeAssistant } from 'custom-card-helpers'
import { CoverDeviceEnum } from './enum/cover-device-enum';

interface ApiResponse {
  success: boolean
}

export const rtsLinkNewCover = async (hass: HomeAssistant, name: string, type: CoverDeviceEnum): Promise<ApiResponse> => {
  return await hass.callApi<ApiResponse>('POST', 'rts_link/cover/new', { name: name, type: type })
}

export const rtsLinkAddShutter = async (hass: HomeAssistant, rtsId: number): Promise<ApiResponse> => {
  return await hass.callApi<ApiResponse>('POST', 'rts_link/cover/add', { id: rtsId })
}

export const rtsLinkRemoveCover = async (hass: HomeAssistant, rtsId: number): Promise<ApiResponse> => {
  return await hass.callApi<ApiResponse>('POST', 'rts_link/cover/remove', { id: rtsId })
}

export const rtsLinkRenameCover = async (hass: HomeAssistant, rtsId: number, name: string): Promise<ApiResponse> => {
  return await hass.callApi<ApiResponse>('POST', 'rts_link/cover/rename', { id: rtsId, name: name })
}

export const rtsLinkChangeTypeCover = async (hass: HomeAssistant, rtsId: number, type: CoverDeviceEnum): Promise<ApiResponse> => {
  return await hass.callApi<ApiResponse>('POST', 'rts_link/cover/type', { id: rtsId, type: type })
}
