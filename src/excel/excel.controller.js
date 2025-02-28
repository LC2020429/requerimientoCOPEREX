import ExcelJS from "exceljs";
import Enterprise from "../enterprise/enterprise.model.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateExcel = async (req, res) => {
  try {
    const {
      order,
      trayectoriaMin,
      trayectoriaMax,
      transcurridosMin,
      transcurridosMax,
    } = req.body;

    let query = {};

    // Filtrar por rango de años de trayectoria
    if (trayectoriaMin !== undefined && trayectoriaMax !== undefined) {
      query.anoFundacion = {
        $gte: new Date().getFullYear() - trayectoriaMax,
        $lte: new Date().getFullYear() - trayectoriaMin,
      };
    }

    // Filtrar por rango de años transcurridos desde Registro InterFer
    if (transcurridosMin !== undefined && transcurridosMax !== undefined) {
      query.anoRegistroInterFer = {
        $gte: new Date().getFullYear() - transcurridosMax,
        $lte: new Date().getFullYear() - transcurridosMin,
      };
    }

    let enterprises = await Enterprise.find(query).populate("category", "name");

    // Ordenar por nombre de empresa
    if (order === "A-Z") {
      enterprises.sort((a, b) =>
        a.nombreEmpresa.localeCompare(b.nombreEmpresa)
      );
    } else if (order === "Z-A") {
      enterprises.sort((a, b) =>
        b.nombreEmpresa.localeCompare(a.nombreEmpresa)
      );
    }

    if (enterprises.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No hay empresas que cumplan con los filtros",
      });
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Empresas");

    worksheet.columns = [
      { header: "Nombre Empresa", key: "nombreEmpresa", width: 25 },
      { header: "Dirección", key: "direccion", width: 30 },
      { header: "RTU", key: "rtuEmpresa", width: 20 },
      { header: "NIT", key: "nit", width: 15 },
      { header: "Teléfono", key: "telefono", width: 15 },
      { header: "Nombre Contacto", key: "nombreContacto", width: 25 },
      { header: "Email", key: "email", width: 30 },
      { header: "Año Fundación", key: "anoFundacion", width: 15 },
      { header: "Años Trayectoria", key: "anosTrayectoria", width: 15 },
      {
        header: "Año Registro InterFer",
        key: "anoRegistroInterFer",
        width: 20,
      },
      {
        header: "Años Transcurridos",
        key: "anosTranscurridosInterFer",
        width: 20,
      },
      { header: "Categoría", key: "category", width: 20 },
      { header: "Estado", key: "estado", width: 10 },
    ];

    enterprises.forEach((company) => {
      worksheet.addRow({
        nombreEmpresa: company.nombreEmpresa,
        direccion: company.direccion,
        rtuEmpresa: company.rtuEmpresa,
        nit: company.nit,
        telefono: company.telefono,
        nombreContacto: company.nombreContacto,
        email: company.email,
        anoFundacion: company.anoFundacion,
        anosTrayectoria: new Date().getFullYear() - company.anoFundacion,
        anoRegistroInterFer: company.anoRegistroInterFer,
        anosTranscurridosInterFer:
          new Date().getFullYear() - company.anoRegistroInterFer,
        category: company.category?.name || "Sin categoría",
        estado: company.estado ? "Activo" : "Inactivo",
      });
    });

    // Guardar en la carpeta "excelReports" al mismo nivel que "src"
    const reportsDir = path.join(process.cwd(), "excelReports");
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }

    const fileName = `empresas_${Date.now()}.xlsx`;
    const filePath = path.join(reportsDir, fileName);
    await workbook.xlsx.writeFile(filePath);

    res.status(200).json({
      success: true,
      message: "Reporte Excel generado correctamente",
      fileUrl: `/excelReports/${fileName}`,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al generar el Excel",
      error: err.message,
    });
  }
};
