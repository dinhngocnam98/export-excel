import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as excelJs from 'exceljs';
import { BodyApiDto } from './dto/body-api.dto';
import * as fs from 'fs';
import * as path from 'path';
import * as lodash from 'lodash';

@Injectable()
export class ExportExcelService {
  async exportExcel(
    auth: string,
    bodyApi: BodyApiDto,
    fileName: string,
  ): Promise<any> {
    const data = await this.getData(auth, bodyApi);

    await this.parseDataToExcel(data, fileName);

    // return excelDir;
    return 'example.xlsx';
  }

  private async getData(auth: string, bodyApi: BodyApiDto) {
    const url: string =
      'https://jmsgw.jtexpress.vn/businessindicator/bigdataReport/detail/day_dispatch_monitor_detail';
    const options = {
      method: 'POST',
      url: url,
      headers: {
        Authtoken: auth,
      },
      data: bodyApi,
    };
    try {
      let result = [];
      const response = await axios(options);
      const data = response.data.data;
      result = result.concat(data.records);
      // const pages: number = data.pages;
      // if (pages > 1) {
      //   for (let i = 2; i <= pages; i++) {
      //     options.data.current = i;
      //     const newResponse = await axios(options);
      //     const newData = newResponse.data.data;
      //     result = result.concat(newData.records);
      //   }
      // }
      return result;
    } catch (error) {
      console.error('Error to get data:', error);
    }
  }

  private async parseDataToExcel(data: any, fileName: string): Promise<void> {
    const exportPath = path.resolve(
      process.cwd(),
      'garbage',
      `${fileName}.xlsx`,
    );
    const streamFile = fs.createWriteStream(exportPath);
    const keys = Object.keys(data[0]);

    const workbook = new excelJs.stream.xlsx.WorkbookWriter({
      stream: streamFile,
      useStyles: true,
    });
    const worksheet = workbook.addWorksheet('Data');
    worksheet.addRow(keys);
    data.forEach((item) => {
      const row = [];
      keys.forEach((key) => {
        const value = item[key];
        row.push(this._formatValue(value));
      });
      worksheet.addRow(row);
    });

    await workbook.commit();
  }

  private _formatValue(value: any) {
    if (typeof value === 'number') {
      if (Math.floor(value) === value) {
        return +value;
      }
      return +lodash.round(value, 2);
    }
    if (value === 0) {
      return 0;
    }
    if (!value) {
      return ' ';
    }
    return value;
  }
}
