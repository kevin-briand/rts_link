import { CoverDeviceEnum } from '../../api/enum/cover-device-enum';

export interface CoverDto {
  name: string,
  id: number
  cover_type?: CoverDeviceEnum
}
