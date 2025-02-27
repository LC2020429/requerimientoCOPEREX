import ExcelJS from "exceljs";
import Enterprise from "../enterprise/enterprise.model.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const generateExcel = async (req, res) => {
  try {
    const enterprises = await Enterprise.find();
    if (enterprises.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No hay empresas para exportar",
      });
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Empresas");

    worksheet.columns = [
      { header: "Nombre", key: "name", width: 20 },
      { header: "Razón Social", key: "corporateReason", width: 25 },
      { header: "NIT", key: "nit", width: 15 },
      { header: "Categoría", key: "category", width: 15 },
      { header: "Fecha de Fundación", key: "foundationDate", width: 20 },
      { header: "Años de Trayectoria", key: "yearsCareer", width: 20 },
      { header: "País", key: "country", width: 15 },
      { header: "Ciudad", key: "city", width: 20 },
      { header: "Teléfono", key: "phone", width: 15 },
      { header: "Email", key: "email", width: 30 },
      { header: "Sitio Web", key: "sitioWeb", width: 30 },
    ];

    enterprises.forEach((company) => {
      worksheet.addRow({
        name: company.name,
        corporateReason: company.corporateReason,
        nit: company.nit,
        category: company.category,
        foundationDate: company.foundationDate.toISOString().split("T")[0],
        yearsCareer: company.yearsCareer,
        country: company.country,
        city: company.city,
        phone: company.phone,
        email: company.email,
        sitioWeb: company.sitioWeb || "N/A",
      });
    });

    const filePath = path.join(__dirname, "..", "reports", "enterprises.xlsx");
    await workbook.xlsx.writeFile(filePath);

    res.status(200).json({
      success: true,
      message: "Reporte Excel generado correctamente",
      filePath: filePath,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al generar el excel",
      error: err.message,
    });
  }
};
