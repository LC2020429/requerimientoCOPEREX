import Enterprise from "./enterprise.model.js";
// Para mandar parametros en la url se usa find.()
// recomiendan usar .find({los parametros de busqueda})
// Usado para buscar empresas por nombre, listar por orden y buscar por años de trayectoria

export const createEnterprise = async (req, res) => {
  try {
    let rtuEmpresa = req.file ? req.file.path : null;
    const data = req.body;
    const empresa = new Enterprise(data);
    empresa.rtuEmpresa = rtuEmpresa;
    await empresa.save();
    return res.status(201).json({ success: true, empresa });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al crear la empresa",
      error: err.message,
    });
  }
};

export const findByName = async (req, res) => {
  try {
    const { nombreEmpresa } = req.params;
    // {nombreEmpresa: new RegExp(nombreEmpresa, "i"),} son los parametros de busqueda
    // RegExp es una expresion regular que busca el nombre de la empresa sin importar si es mayuscula o minuscula
    const empresas = await Enterprise.find({
      nombreEmpresa: new RegExp(nombreEmpresa, "i"),
    });

    if (!empresas.length) {
      return res.status(404).json({
        success: false,
        message: "No se encontraron empresas con ese nombre.",
      });
    }

    return res.status(200).json({ success: true, empresas });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al buscar empresas",
      error: err.message,
    });
  }
};

export const findById = async (req, res) => {
  try {
    const { eid } = req.params;
    const empresa = await Enterprise.findById(eid);

    if (!empresa) {
      return res
        .status(404)
        .json({ success: false, message: "Empresa no encontrada." });
    }

    return res.status(200).json({ success: true, empresa });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al obtener la empresa",
      error: err.message,
    });
  }
};

export const deleteEnterprise = async (req, res) => {
  try {
    const { eid } = req.params;
    const empresa = await Enterprise.findByIdAndUpdate(
      eid,
      { estado: false },
      { new: true }
    );

    if (!empresa) {
      return res
        .status(404)
        .json({ success: false, message: "Empresa no encontrada." });
    }

    return res
      .status(200)
      .json({ success: true, message: "Empresa eliminada", empresa });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al eliminar la empresa",
      error: err.message,
    });
  }
};
// Chat
// Listar empresas por años de trayectoria
export const listByYears = async (req, res) => {
  try {
    const { years } = req.params;
    const empresas = await Enterprise.find();
    const filteredEmpresas = empresas.filter(
      (empresa) =>
        new Date().getFullYear() - empresa.anoFundacion === Number(years)
    );
    if (filteredEmpresas.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No se encontraron empresas con ${years} años de trayectoria.`,
      });
    }
    return res.status(200).json({ success: true, empresas: filteredEmpresas });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al listar empresas",
      error: err.message,
    });
  }
};

// Chat
// Listar de A-Z
export const listAZ = async (req, res) => {
  try {
    const empresas = await Enterprise.find().sort({ nombreEmpresa: 1 });
    return res.status(200).json({ success: true, empresas });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al listar empresas",
      error: err.message,
    });
  }
};

export const listZA = async (req, res) => {
  try {
    const empresas = await Enterprise.find().sort({ nombreEmpresa: -1 });
    return res.status(200).json({ success: true, empresas });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al listar empresas",
      error: err.message,
    });
  }
};

export const updateEnterprise = async (req, res) => {
  try {
    const { eid } = req.params;
    const data = req.body;
    const updatedEmpresa = await Enterprise.findByIdAndUpdate(eid, data, {
      new: true,
    });

    if (!updatedEmpresa) {
      return res
        .status(404)
        .json({ success: false, message: "Empresa no encontrada." });
    }

    return res.status(200).json({
      success: true,
      message: "Empresa actualizada",
      empresa: updatedEmpresa,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al actualizar la empresa",
      error: err.message,
    });
  }
};

export const listParamsEnterprise = async (req, res) => {
  try {
    const { nombreEmpresa, nit, minAnoFundacion, maxAnoFundacion, minAnoRegistro, maxAnoRegistro, order } = req.query;
    
    let filter = {};
    if (nombreEmpresa) {
      filter.nombreEmpresa = new RegExp(nombreEmpresa, "i");
    }
    if (nit) {
      filter.nit = nit;
    }
    // debe de ser años de trayectoria y no lista por los años 
    if (minAnoFundacion || maxAnoFundacion) {
      filter.anoFundacion = {};
      if (minAnoFundacion) filter.anoFundacion.$gte = Number(minAnoFundacion);
      if (maxAnoFundacion) filter.anoFundacion.$lte = Number(maxAnoFundacion);
    }
    // no esta en la DB
    if (minAnoRegistro || maxAnoRegistro) {
      filter.anoRegistroInterFer = {};
      if (minAnoRegistro) filter.anoRegistroInterFer.$gte = Number(minAnoRegistro);
      if (maxAnoRegistro) filter.anoRegistroInterFer.$lte = Number(maxAnoRegistro);
    }

    let query = Enterprise.find(filter);
    if (order) {
      if (order === "AZ") query = query.sort({ nombreEmpresa: 1 });
      else if (order === "ZA") query = query.sort({ nombreEmpresa: -1 });
    }

    const empresas = await query;
    return res.status(200).json({ success: true, empresas });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al listar empresas",
      error: err.message,
    });
  }
};
