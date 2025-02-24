import { body, param } from "express-validator";
import {
  emailExists,
  usernameExists,
  userExists,
} from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { deleteFileOnError } from "./delete-file-on-error.js";
import { handleErrors } from "./handle-errors.js";

export const registerValidator = [
  body("apellidos")
    .notEmpty()
    .withMessage("El apellido es obligatorio")
    .isLength({ max: 50 })
    .withMessage("El apellido no puede tener más de 50 caracteres"),
  body("userName")
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio")
    .isLength({ max: 50 })
    .withMessage("El nombre de usuario no puede tener más de 50 caracteres"),
  body("email").isEmail().withMessage("El email no es válido"),
  body("email").custom(emailExists),
  body("userName").custom(usernameExists),
  body("phone")
    .notEmpty()
    .withMessage("El número de teléfono es obligatorio")
    .isLength({ min: 8, max: 8 })
    .withMessage("El número de teléfono debe tener exactamente 8 caracteres"),
  validarCampos,
  deleteFileOnError,
  handleErrors,
];

export const loginValidator = [
  body("email").optional().isEmail().withMessage("No es un email válido"),
  body("userName")
    .optional()
    .isString()
    .withMessage("Username es en formato erróneo"),
  validarCampos,
  handleErrors,
];

export const getUserByIdValidator = [
  param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
  param("uid").custom(userExists),
  validarCampos,
  handleErrors,
];

export const deleteUserValidator = [
  param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
  param("uid").custom(userExists),
  validarCampos,
  handleErrors,
];

export const updateUserValidator = [
  param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
  param("uid").custom(userExists),
  body("apellidos")
    .optional()
    .isLength({ max: 50 })
    .withMessage("El apellido no puede tener más de 50 caracteres"),
  body("userName")
    .optional()
    .isLength({ max: 50 })
    .withMessage("El nombre de usuario no puede tener más de 50 caracteres"),
  body("phone")
    .optional()
    .isLength({ min: 8, max: 8 })
    .withMessage("El número de teléfono debe tener exactamente 8 caracteres"),
  validarCampos,
  handleErrors,
];

export const updateProfilePictureValidator = [
  param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
  param("uid").custom(userExists),
  validarCampos,
  deleteFileOnError,
  handleErrors,
];

export const updatePasswordValidator = [
  param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
  param("uid").custom(userExists),
  body("newPassword").isLength({ min: 8 }).withMessage("El password debe contener al menos 8 caracteres"),
  validarCampos,
  handleErrors
];