import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  constructor() {}

  genMinesExcelFile(mineslistofData: any[]) {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Mines Data');

    const headers = [
      'Serial No',
      'Mines ID',
      'Name',
      'Mobile Number',
      'Address',
      'Status',
      'Aadhar Number',
      'Brief of Representation',
    ];

    const headerRow = worksheet.addRow(headers);
    headerRow.font = { bold: true };
    headerRow.alignment = { horizontal: 'center' };

    mineslistofData.forEach((data, index) => {
      console.log('data' + JSON.stringify(data));
      worksheet.addRow([
        data.serialNo,
        data.minesId,
        data.name,
        data.mobileNumber,
        data.address,
        data.status,
        data.aadharNumber,
        data.breifOfRepresentation,
      ]);
    });

    worksheet.columns.forEach((column, index) => {
      column.width = 20;
    });

    workbook.xlsx.writeBuffer().then((buffer: any) => {
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      fs.saveAs(blob, 'MinesData.xlsx');
    });
  }
  generateConstituencyExcel(constlistofData: any[], fileName: string): void {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Constituency Data');

    const headers = [
      'Serial No',
      'Constituency ID',
      'Name',
      'Mobile Number',
      'Constituency',
      'Mandal',
      'Village',
      'Gender',
      'Status',
      'Aadhar Number',
    ];

    const headerRow = worksheet.addRow(headers);

    headerRow.font = { name: 'Arial', bold: true, color: { argb: 'FFFFFFFF' } };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'c7404c' },
    };
    headerRow.alignment = { horizontal: 'center', vertical: 'middle' };

    constlistofData.forEach((record, index) => {
      worksheet.addRow([
        record.serialNo,
        record.constituencyId,
        record.name,
        record.mobileNumber,
        record.constituency,
        record.mandal,
        record.village,
        record.gender,
        record.status,
        record.aadharNumber,
      ]);
    });

    worksheet.columns.forEach((column) => {
      column.width = 20;
    });

    workbook.xlsx.writeBuffer().then((buffer: any) => {
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      fs.saveAs(blob, `${fileName}.xlsx`);
    });
  }

  generateExciseExcel(data: any[], fileName: string): void {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Excise Data');

    const headers = [
      'Serial No',
      'Excise ID',
      'Name',
      'Mobile Number',
      'Address',
      'Status',
      'Aadhar Number',
      'Brief of Representation',
    ];

    const headerRow = worksheet.addRow(headers);

    headerRow.font = { name: 'Arial', bold: true, color: { argb: 'FFFFFFFF' } };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'c7404c' },
    };
    headerRow.alignment = { horizontal: 'center', vertical: 'middle' };

    data.forEach((record, index) => {
      worksheet.addRow([
        record.serialNo,
        record.exciseId,
        record.name,
        record.mobileNumber,
        record.address,
        record.status,
        record.aadharNumber,
        record.breifOfRepresentation,
      ]);
    });

    worksheet.columns.forEach((column) => {
      column.width = 20;
    });

    workbook.xlsx.writeBuffer().then((buffer: any) => {
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      fs.saveAs(blob, `${fileName}.xlsx`);
    });
  }
}
