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
  listParamsEnterprise,
} from "./enterprise.controller.js";
import {uploadRTU} from "../middlewares/multer-uploads.js"
import {
  getByIdEnterpriseValidator,
  deleteEnterpriseValidator,
  updateEnterpriseValidator,
  createEnterpriseValidator,
  findByNameValidator,
  listValidators,
} from "../middlewares/enterprise-validator.js";

const router = Router();
router.post(
  "/agregarEmpresa",
  uploadRTU.single("rtuEmpresa"), 
  createEnterpriseValidator,
  createEnterprise
);

router.get("/buscarEmpresa/:eid", getByIdEnterpriseValidator, findById);

router.get("/buscarPorNombre/:nombreEmpresa", findByNameValidator, findByName);

// problema
router.get("/listarPorAnios/:years", listValidators, listByYears);

router.get("/listarOrdenAZ", listValidators, listAZ);

router.get("/listarOrdenZA", listValidators, listZA);

router.patch(
  "/actualizarEmpresa/:eid",
  updateEnterpriseValidator,
  updateEnterprise
);

router.delete(
  "/eliminarEmpresa/:eid",
  deleteEnterpriseValidator,
  deleteEnterprise
);

// ruta con los campos variables
router.get("/listParamsEnterprise", listValidators, listParamsEnterprise);

export default router;
