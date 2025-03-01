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

/**
 * @swagger
 * /agregarEmpresa:
 *   post:
 *     summary: Add a new enterprise
 *     responses:
 *       200:
 *         description: Enterprise added
 */
router.post(
  "/agregarEmpresa",
  uploadRTU.single("rtuEmpresa"), 
  createEnterpriseValidator,
  createEnterprise
);

/**
 * @swagger
 * /buscarEmpresa/{eid}:
 *   get:
 *     summary: Get enterprise by ID
 *     parameters:
 *       - in: path
 *         name: eid
 *         required: true
 *         schema:
 *           type: string
 *         description: Enterprise ID
 *     responses:
 *       200:
 *         description: Enterprise found
 */
router.get("/buscarEmpresa/:eid", getByIdEnterpriseValidator, findById);

/**
 * @swagger
 * /buscarPorNombre/{nombreEmpresa}:
 *   get:
 *     summary: Get enterprise by name
 *     parameters:
 *       - in: path
 *         name: nombreEmpresa
 *         required: true
 *         schema:
 *           type: string
 *         description: Enterprise name
 *     responses:
 *       200:
 *         description: Enterprise found
 */
router.get("/buscarPorNombre/:nombreEmpresa", findByNameValidator, findByName);

/**
 * @swagger
 * /listarPorAnios/{years}:
 *   get:
 *     summary: List enterprises by years
 *     parameters:
 *       - in: path
 *         name: years
 *         required: true
 *         schema:
 *           type: string
 *         description: Years
 *     responses:
 *       200:
 *         description: List of enterprises
 */
router.get("/listarPorAnios/:years", listValidators, listByYears);

/**
 * @swagger
 * /listarOrdenAZ:
 *   get:
 *     summary: List enterprises in A-Z order
 *     responses:
 *       200:
 *         description: List of enterprises
 */
router.get("/listarOrdenAZ", listValidators, listAZ);

/**
 * @swagger
 * /listarOrdenZA:
 *   get:
 *     summary: List enterprises in Z-A order
 *     responses:
 *       200:
 *         description: List of enterprises
 */
router.get("/listarOrdenZA", listValidators, listZA);

/**
 * @swagger
 * /actualizarEmpresa/{eid}:
 *   patch:
 *     summary: Update enterprise information
 *     parameters:
 *       - in: path
 *         name: eid
 *         required: true
 *         schema:
 *           type: string
 *         description: Enterprise ID
 *     responses:
 *       200:
 *         description: Enterprise updated
 */
router.patch(
  "/actualizarEmpresa/:eid",
  updateEnterpriseValidator,
  updateEnterprise
);

/**
 * @swagger
 * /eliminarEmpresa/{eid}:
 *   delete:
 *     summary: Delete enterprise by ID
 *     parameters:
 *       - in: path
 *         name: eid
 *         required: true
 *         schema:
 *           type: string
 *         description: Enterprise ID
 *     responses:
 *       200:
 *         description: Enterprise deleted
 */
router.delete(
  "/eliminarEmpresa/:eid",
  deleteEnterpriseValidator,
  deleteEnterprise
);

/**
 * @swagger
 * /listParamsEnterprise:
 *   get:
 *     summary: List enterprises with variable parameters
 *     responses:
 *       200:
 *         description: List of enterprises
 */
router.get("/listParamsEnterprise", listValidators, listParamsEnterprise);

export default router;
