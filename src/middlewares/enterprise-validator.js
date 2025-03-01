import { body, param } from "express-validator";
import { enterpriseExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-admin.js";
import { deleteFileOnError } from "./delete-file-on-error.js";
import { nombreEmpresaExists, nitExists } from "../helpers/db-validators.js";

export const createEnterpriseValidator = [
  validateJWT,
  hasRoles("ADMIN"),
  body("nombreEmpresa")
    .notEmpty()
    .withMessage("El nombre de la empresa es requerido")
    .custom(nombreEmpresaExists),
  body("anoFundacion")
    .notEmpty()
    .withMessage("La fecha de años de trayectoria es requerida")
    .isISO8601()
    .withMessage("Debe de ingresar solamente el año"),
  body("nit")
    .notEmpty()
    .withMessage("El NIT de la empresa es requerido")
    .isLength({ min: 8, max: 8 })
    .withMessage("El NIT debe tener 8 caracteres")
    .custom(nitExists),
  body("rtuEmpresa").custom((value, { req }) => {
    if (!req.file) {
      throw new Error("El RTU de la empresa es obligatorio");
    }
    return true; 
  }),
  validarCampos,
  deleteFileOnError,
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

export const listValidators = [validateJWT, hasRoles("ADMIN")];

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
