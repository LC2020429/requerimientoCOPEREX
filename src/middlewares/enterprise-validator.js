import { body, param } from "express-validator";
import { enterpriseExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-admin.js";

export const createEnterpriseValidator = [
  validateJWT,
  hasRoles("ADMIN"),
  body("nombreEmpresa")
    .notEmpty()
    .withMessage("El nombre de la empresa es requerido"),
  body("anoFundacion")
    .notEmpty()
    .withMessage("La fecha de años de trayectoria es requerida")
    .isISO8601()
    .withMessage(
      "Debe de ingresar solamente el año"
    ),
  validarCampos,
  handleErrors,
];

export const getByIdEnterpriseValidator = [
  validateJWT,
  hasRoles("ADMIN"),
  param("eid").isMongoId().withMessage("No es un ID válido de MongoDB"),
  param("eid").custom(enterpriseExists),
  validarCampos,
  handleErrors,
];

export const findByNameValidator = [
  validateJWT,
  hasRoles("ADMIN"),
  param("nombreEmpresa")
    .notEmpty()
    .withMessage("El nombre de la empresa es requerido"),
  validarCampos,
  handleErrors,
];

export const listValidators = [
  validateJWT,
  hasRoles("ADMIN"),
];

export const updateEnterpriseValidator = [
  validateJWT,
  hasRoles("ADMIN"),
  param("eid").isMongoId().withMessage("No es un ID válido de MongoDB"),
  param("eid").custom(enterpriseExists),
  body("nombreEmpresa")
    .optional()
    .notEmpty()
    .withMessage("El nombre de la empresa no puede estar vacío"),
  body("anosTrayectoria")
    .optional()
    .isISO8601()
    .withMessage(
      "La fecha de trayectoria debe estar en formato ISO 8601 (YYYY-MM-DD)"
    ),
  validarCampos,
  handleErrors,
];

export const deleteEnterpriseValidator = [
  validateJWT,
  hasRoles("ADMIN"),
  param("eid").isMongoId().withMessage("No es un ID válido de MongoDB"),
  param("eid").custom(enterpriseExists),
  validarCampos,
  handleErrors,
];
