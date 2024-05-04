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
  @ApiResponse({
    status: 200,
    description: 'Excel file downloaded.',
    content: {
      'application/zip': {
        schema: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async getExcelFile(
    @Query('authentication') auth: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const listFiles = await this.excelService.exportExcel(auth);
    const filePath = join(process.cwd(), 'garbage');
    const outputFile = join(process.cwd(), 'zipFolder', 'data.zip');
    await this.excelService.zipDirectory(filePath, outputFile);
    res.set({
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="data.zip"`,
    });
    const file = createReadStream(outputFile);
    res.on('finish', () => {
      listFiles.forEach((listFile) => {
        unlink(listFile, (err) => {
          if (err) console.error('Error deleting file:', err);
          else console.log('File deleted successfully');
        });
      });
      unlink(outputFile, (err) => {
        if (err) console.error('Error deleting file:', err);
        else console.log('File zip deleted successfully');
      });
    });
    return new StreamableFile(file);
  }
}
