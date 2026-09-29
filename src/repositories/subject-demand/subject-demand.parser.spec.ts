import * as ExcelJS from 'exceljs';

import { parseDemandFile } from './subject-demand.parser';

const file = (originalname: string, content: string | Buffer) => ({
  originalname,
  buffer: Buffer.isBuffer(content) ? content : Buffer.from(content),
});

describe('parseDemandFile', () => {
  it('lee TSV, normaliza cabeceras y códigos, y descarta filas inválidas', async () => {
    const tsv = [
      '\uFEFFDIRECCION\tDEPARTAMENTO\tCÓDIGO\tDESCRIPCION\tCANTIDAD\tNIVEL',
      'EICA\tIngeniería de Sistemas\t61822\tSexología Básica\t624\t1',
      'EICA\tIngeniería de Sistemas\t0715116\tTrabajo de Grado\t42\t10',
      'EICA\tIngeniería de Sistemas\t73023\tMetodología\tabc\t2',
    ].join('\n');

    const result = await parseDemandFile(file('demanda.tsv', tsv));

    expect(result.rows).toEqual([
      { code: '0061822', level: 1, quantity: 624 },
      { code: '0715116', level: 10, quantity: 42 },
    ]);
    expect(result.invalidRows).toEqual([4]);
  });

  it('lee CSV con comas dentro de comillas', async () => {
    const csv =
      'CODIGO,DESCRIPCION,CANTIDAD,NIVEL\n714153,"Prepar., Eval. y Cntrol",44,7';

    const result = await parseDemandFile(file('demanda.csv', csv));

    expect(result.rows).toEqual([{ code: '0714153', level: 7, quantity: 44 }]);
  });

  it('lee XLSX', async () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Hoja1');
    sheet.addRow(['CODIGO', 'CANTIDAD', 'NIVEL']);
    sheet.addRow([623313, 97, 3]);
    const buffer = Buffer.from(await workbook.xlsx.writeBuffer());

    const result = await parseDemandFile(file('demanda.xlsx', buffer));

    expect(result.rows).toEqual([{ code: '0623313', level: 3, quantity: 97 }]);
  });

  it('rechaza archivos sin columnas requeridas o con formato no soportado', async () => {
    await expect(
      parseDemandFile(file('demanda.csv', 'CODIGO,CANTIDAD\n1,2')),
    ).rejects.toThrow('Faltan columnas: NIVEL.');
    await expect(parseDemandFile(file('demanda.pdf', 'x'))).rejects.toThrow(
      'Formato no soportado',
    );
  });
});
