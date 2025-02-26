import ExcelJS from 'exceljs';
import fs from 'fs';

const generateExcel = async () => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Empresas');

  // Agregar encabezados
  worksheet.columns = [
    { header: 'ID', key: 'id', width: 10 },
    { header: 'Nombre Empresa', key: 'nombreEmpresa', width: 30 },
    { header: 'Año de Fundación', key: 'anoFundacion', width: 15 }
  ];

  // Agregar datos de ejemplo
  const empresas = [
    { id: 1, nombreEmpresa: 'Empresa A', anoFundacion: 2000 },
    { id: 2, nombreEmpresa: 'Empresa B', anoFundacion: 2010 },
    { id: 3, nombreEmpresa: 'Empresa C', anoFundacion: 2020 }
  ];

  empresas.forEach((empresa) => {
    worksheet.addRow(empresa);
  });

  // Guardar el archivo
  const filePath = './empresas.xlsx';
  await workbook.xlsx.writeFile(filePath);
  console.log(`Archivo guardado en ${filePath}`);
};

generateExcel();
