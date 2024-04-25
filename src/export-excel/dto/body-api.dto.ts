import { ApiProperty } from '@nestjs/swagger';
import * as moment from 'moment';

const yesterdayStart = moment().subtract(1, 'days').startOf('day');
const yesterdayEnd = moment().subtract(1, 'days').endOf('day');
const formattedStartTime = yesterdayStart.format('YYYY-MM-DD HH:mm:ss');
const formattedEndTime = yesterdayEnd.format('YYYY-MM-DD HH:mm:ss');

export class BodyApiDto {
  @ApiProperty({ default: 1 })
  current: number;

  @ApiProperty({ default: 5000 })
  size: number;

  @ApiProperty({ default: 1 })
  dimensionType: number;

  @ApiProperty({ default: '238001' })
  proxyAreaCode: string;

  @ApiProperty({ default: formattedStartTime })
  startTime: string;

  @ApiProperty({ default: formattedEndTime })
  endTime: string;

  @ApiProperty({ default: '1' })
  countryId: string;
}
