import { Router } from "express";
import {
  findByName,
  findById,
  deleteEnterprise,
  listByYears,
  listAZ,
  listZA,
  updateEnterprise,
  createEnterprise,
} from "./enterprise.controller.js";

import {
  getByIdEnterpriseValidator,
  deleteEnterpriseValidator,
  updateEnterpriseValidator,
  createEnterpriseValidator,
  findByNameValidator,
  listValidators,
} from "../middlewares/enterprise-validator.js";

const router = Router();

router.post("/agregarEmpresa", createEnterpriseValidator, createEnterprise);

router.get("/buscarEmpresa/:eid", getByIdEnterpriseValidator, findById);

router.get("/buscarPorNombre/:nombreEmpresa", findByNameValidator, findByName);

// problema
router.get("/listarPorAnios/:years", listValidators, listByYears);

router.get("/listarOrdenAZ", listValidators, listAZ);

router.get("/listarOrdenZA", listValidators, listZA);

router.patch("/actualizarEmpresa/:eid", updateEnterpriseValidator, updateEnterprise);

router.delete("/eliminarEmpresa/:eid", deleteEnterpriseValidator, deleteEnterprise);

export default router;
