import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { ExportExcelService } from './export-excel.service';
import { ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BodyApiDto } from './dto/body-api.dto';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('export-excel')
@ApiTags('Excel')
export class ExportExcelController {
  constructor(private readonly excelService: ExportExcelService) {}

  @Post()
  @ApiQuery({
    name: 'authentication',
    type: String,
    description: 'Authenticated with JWT',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'The excel file has been successfully generated.',
    content: {
      'application/octet-stream': {
        schema: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async getExcelFile(
    @Query('authentication') auth: string,
    @Body() bodyApi: BodyApiDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const fileName = await this.excelService.exportExcel(auth, bodyApi);
    res.header('Content-Disposition', 'attachment; filename="Data.xlsx"');
    res.header(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    const file = createReadStream(fileName);
    return new StreamableFile(file);
  }
}
