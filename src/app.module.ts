import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExportExcelModule } from './export-excel/export-excel.module';

@Module({
  imports: [ExportExcelModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
