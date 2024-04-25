import { Controller, Get } from '@nestjs/common';
import { ExportExcelService } from './export-excel.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('export-excel')
@ApiTags('Excel')
export class ExportExcelController {
  constructor(private readonly excelService: ExportExcelService) {}

  @Get()
  getAudioData(): string {
    return this.excelService.export();
  }
}
