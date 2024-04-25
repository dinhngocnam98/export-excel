import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as excelJs from 'exceljs';
import { BodyApiDto } from './dto/body-api.dto';
@Injectable()
export class ExportExcelService {
  async exportExcel(auth: string, bodyApi: BodyApiDto): Promise<any> {
    type Country = {
      name: string;
      countryCode: string;
      capital: string;
      phoneIndicator: number;
    };

    const data = await this.getData(auth, bodyApi);

    const excelDir: string = this.parseDataToExcel(data);

    const countries: Country[] = [
      {
        name: 'Cameroon',
        capital: 'Yaounde',
        countryCode: 'CM',
        phoneIndicator: 237,
      },
      {
        name: 'France',
        capital: 'Paris',
        countryCode: 'FR',
        phoneIndicator: 33,
      },
      {
        name: 'United States',
        capital: 'Washington, D.C.',
        countryCode: 'US',
        phoneIndicator: 1,
      },
      {
        name: 'India',
        capital: 'New Delhi',
        countryCode: 'IN',
        phoneIndicator: 91,
      },
      {
        name: 'Brazil',
        capital: 'Brasília',
        countryCode: 'BR',
        phoneIndicator: 55,
      },
      {
        name: 'Japan',
        capital: 'Tokyo',
        countryCode: 'JP',
        phoneIndicator: 81,
      },
      {
        name: 'Australia',
        capital: 'Canberra',
        countryCode: 'AUS',
        phoneIndicator: 61,
      },
      {
        name: 'Nigeria',
        capital: 'Abuja',
        countryCode: 'NG',
        phoneIndicator: 234,
      },
      {
        name: 'Germany',
        capital: 'Berlin',
        countryCode: 'DE',
        phoneIndicator: 49,
      },
    ];
    const workbook = new excelJs.Workbook();

    const worksheet = workbook.addWorksheet('Data');
    worksheet.columns = [
      { key: 'name', header: 'Name' },
      { key: 'countryCode', header: 'Country Code' },
      { key: 'capital', header: 'Capital' },
      { key: 'phoneIndicator', header: 'International Direct Dialling' },
    ];
    countries.forEach((item) => {
      worksheet.addRow(item);
    });

    workbook.xlsx
      .writeFile('example.xlsx')
      .then(() => {
        console.log('Excel file saved.');
      })
      .catch((error) => {
        console.error('Error saving Excel file:', error);
      });

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

  private parseDataToExcel(data: any) {
    const excelDir: string = 'example.xlsx';

    return excelDir;
  }
}
