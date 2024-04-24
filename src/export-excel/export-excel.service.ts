import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ExportExcelService {
    export(): string {
        let text = 'Đây là demo';


        type Country = {
            name: string;
            countryCode: string;
            capital: string;
            phoneIndicator: number;
        };

        const countries: Country[] = [
            {name: 'Cameroon', capital: 'Yaounde', countryCode: 'CM', phoneIndicator: 237},
            {name: 'France', capital: 'Paris', countryCode: 'FR', phoneIndicator: 33},
            {name: 'United States', capital: 'Washington, D.C.', countryCode: 'US', phoneIndicator: 1},
            {name: 'India', capital: 'New Delhi', countryCode: 'IN', phoneIndicator: 91},
            {name: 'Brazil', capital: 'Brasília', countryCode: 'BR', phoneIndicator: 55},
            {name: 'Japan', capital: 'Tokyo', countryCode: 'JP', phoneIndicator: 81},
            {name: 'Australia', capital: 'Canberra', countryCode: 'AUS', phoneIndicator: 61},
            {name: 'Nigeria', capital: 'Abuja', countryCode: 'NG', phoneIndicator: 234},
            {name: 'Germany', capital: 'Berlin', countryCode: 'DE', phoneIndicator: 49},
        ];
        const ExcelJS = require('exceljs');
        const workbook = new ExcelJS.Workbook();

        const worksheet = workbook.addWorksheet('Sheet1');
        worksheet.columns = [
            {key: 'name', header: 'Name'},
            {key: 'countryCode', header: 'Country Code'},
            {key: 'capital', header: 'Capital'},
            {key: 'phoneIndicator', header: 'International Direct Dialling'},
        ];
        countries.forEach((item) => {
            worksheet.addRow(item);
        });

        workbook.xlsx.writeFile('example.xlsx')
            .then(() => {
                console.log('Excel file saved.');
            })
            .catch((error) => {
                console.error('Error saving Excel file:', error);
            });

        return text;
        // }

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
}
