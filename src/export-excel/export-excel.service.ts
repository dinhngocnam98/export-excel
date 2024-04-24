import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ExportExcelService {

    export(): string {
        let text = 'Đây là demo';

        const ExcelJS = require('exceljs');
        const workbook = new ExcelJS.Workbook();

        const worksheet = workbook.addWorksheet('Sheet1');
        worksheet.addRow(['Text']);
        worksheet.addRow(['Đây là một ví dụ về đoạn văn bản']);

        workbook.xlsx.writeFile('example.xlsx')
            .then(() => {
                console.log('Excel file saved.');
            })
            .catch((error) => {
                console.error('Error saving Excel file:', error);
            });

        return text;
    }

    // async fetchData(): Promise<string> {
    //   try {
    //     const response = await axios.get('https://api.example.com/data');
    //     // return response.data;
    //     return 'Đây là demo';
    //   } catch (error) {
    //     throw new Error('Failed to fetch data');
    //   }
    // }
}
