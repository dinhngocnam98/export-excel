import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExportExcelModule } from './export-excel/export-excel.module';
import { ConfigModule } from '@nestjs/config';
import Config from './common/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [Config],
    }),
    ExportExcelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
