import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as excelJs from 'exceljs';
import * as fs from 'fs';
import * as path from 'path';
import * as lodash from 'lodash';
import { apiInfos } from '../common/data';
import * as archiver from 'archiver';

@Injectable()
export class ExportExcelService {
  async exportExcel(auth: string): Promise<any> {
    console.log('API: ', apiInfos);

    console.log('Tổng số API: ', apiInfos.length);
    const listFiles = [];
    for (const apiInfo of apiInfos) {
      const exportPath = path.resolve(
        process.cwd(),
        'garbage',
        `${apiInfo.name}.xlsx`,
      );
      if (!fs.existsSync(exportPath)) {
        fs.mkdirSync(path.dirname(exportPath), { recursive: true });
        fs.writeFileSync(exportPath, '', 'utf8');
      }
      const streamFile = fs.createWriteStream(exportPath);

      const workbook = new excelJs.stream.xlsx.WorkbookWriter({
        stream: streamFile,
        useStyles: true,
      });
      const worksheet = workbook.addWorksheet('Data');
      const data = await this.getData(auth, apiInfo);
      if (data != null) {
        console.log(`Số lượng data: `, data.length);
        await this.parseDataToExcel(data, worksheet);
        await workbook.commit();
        listFiles.push(exportPath);
        console.log(`API ${apiInfo.name} hoàn thành`);
      } else {
        console.log(`API ${apiInfo.name} không có dữ liệu`);
      }
    }
    // return excelDir;
    return listFiles;
  }

  private async getData(auth: string, apiInfo: any) {
    const url = !apiInfo.size
      ? apiInfo.url
      : apiInfo.url + `?size=${apiInfo.size}&current=${apiInfo.current}`;
    console.log(url);
    const options = {
      method: 'POST',
      url: url,
      headers: {
        Authtoken: auth,
      },
      data: apiInfo.body,
    };
    try {
      let result = [];
      const response = await axios(options);
      const data = response.data.data;
      if (!data || data === 'false' || data === null) {
        return null;
      }
      result = result.concat(data.records);
      const pages: number = data.pages;
      if (pages > 1) {
        for (let i = 1; i < pages; i++) {
          if (!apiInfo.size) {
            options.data.current = i + 1;
          } else {
            options.url =
              apiInfo.url + `?size=${apiInfo.size}&current=${i + 1}`;
          }
          const newResponse = await axios(options);
          const newData = newResponse.data.data;
          result = result.concat(newData.records);
        }
      }
      return result;
    } catch (error) {
      console.error('Error to get data:', error);
    }
  }

  private async parseDataToExcel(
    data: any,
    worksheet: excelJs.Worksheet,
  ): Promise<void> {
    if (data && data.length != 0) {
      const keys = Object.keys(data[0]);
      worksheet.addRow(keys);
      data.forEach((item) => {
        const row = [];
        keys.forEach((key) => {
          const value = item[key];
          row.push(this._formatValue(value));
        });
        worksheet.addRow(row);
      });
    }
    worksheet.commit();
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

  async zipDirectory(sourceDir: string, outPath: string) {
    const output = fs.createWriteStream(outPath);
    const archive = archiver('zip', { zlib: { level: 9 } }); // Mức độ nén

    return new Promise((resolve, reject) => {
      output.on('close', () => resolve({ size: archive.pointer() }));
      archive.on('error', (err) => reject(err));

      archive.pipe(output);
      archive.directory(sourceDir, false); // Thêm toàn bộ thư mục vào tệp ZIP
      archive.finalize();
    });
  }
}
