import { Controller, Get } from '@nestjs/common';
import { ExportExcelService } from './export-excel.service';

@Controller('export-excel')
export class ExportExcelController {
  constructor(private readonly excelService: ExportExcelService) {}

  @Get()
  getAudioData(): string {
    return this.excelService.export();
  }
}
