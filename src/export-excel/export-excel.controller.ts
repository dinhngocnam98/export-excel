import {
  Body,
  Controller,
  Post,
  Query,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { ExportExcelService } from './export-excel.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BodyApiDto } from './dto/body-api.dto';
import { Response } from 'express';
import { createReadStream, unlink } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

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
  @ApiOperation({ summary: 'Download Excel file' })
  @ApiResponse({ status: 200, description: 'Excel file downloaded.' })
  async getExcelFile(
    @Query('authentication') auth: string,
    @Body() bodyApi: BodyApiDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const fileName = uuidv4();
    await this.excelService.exportExcel(auth, bodyApi, fileName);
    const filePath = join(process.cwd(), 'garbage', `${fileName}.xlsx`);
    const file = createReadStream(filePath);
    res.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="Data.xlsx"',
    });

    res.on('finish', () => {
      unlink(filePath, (err) => {
        if (err) console.error('Error deleting file:', err);
        else console.log('File deleted successfully');
      });
    });

    return new StreamableFile(file);
  }
}
