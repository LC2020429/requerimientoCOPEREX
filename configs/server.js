"use strict";
import express from "express";
import cors from "cors";
import authRoutes from "../src/auth/auth.routes.js";
import userRoutes from "../src/user/user.routes.js";
import categoryRoutes from "../src/categoryEnterprise/category.routes.js";
import { hash } from "argon2";
import User from "../src/user/user.model.js";
import Category from "../src/categoryEnterprise/category.model.js";
import helmet from "helmet";
import morgan from "morgan";
import { dbConnection } from "./mongo.js";
import apiLimiter from "../src/middlewares/rate-limit-validator.js";
import { swaggerDocs, swaggerUi } from "./swagger.js";

const middlewares = (app) => {
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cors());
  app.use(helmet());
  app.use(morgan("dev"));
  app.use(apiLimiter);
};

/*
notas de errores :
cuando postman indica 
{
    "message": "User registration failed",
    "error": "The first argument must be of type string or an instance of Buffer, ArrayBuffer, or Array or an Array-like Object. Received undefined"
}
    es porque se espera una contraseña para cifrar con argon2  y no se envia en el body
*/
const crearAdministrador = async () => {
  try {
    const adminExist = await User.findOne({ userName: "AdminOpinionGestor" });

    if (!adminExist) {      
      const encryptedPassword = await hash("Key40RAdm!nSuper");
      const admin = new User({
        apellidos: "Admin",
        userName: "AdminOpinionGestor",
        email: "AdminOpinionGestor@gmail.com",
        password: encryptedPassword,
        phone: 11110000,
      });
      await admin.save();
    }
  } catch (err) {
    console.log(`Error al crear el administrador: ${err}`);
  }
};


const crearCategoria = async () => {
  try {
    const categoriaExist = await Category.findOne({ categoriaEmpresarial: "Default" });

    if (!categoriaExist) {
      const defaultCategory = new Category({
        categoriaEmpresarial: "Default",
        status: true,
      });
      await defaultCategory.save();
    }
  } catch (err) {
    console.log(`Error al crear la categoría por defecto: ${err}`);
  }
};

const routes = (app) => {
  app.use("/coperexInterFer/v1/auth", authRoutes);
  app.use("/coperexInterFer/v1/user", userRoutes);
  app.use("/coperexInterFer/v1/categoria", categoryRoutes);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
const conectarDB = async () => {
  try {
    await dbConnection();
  } catch (err) {
    console.log(`Database connection failed: ${err}`);
    process.exit(1);
  }
};

export const initServer = () => {
  const app = express();
  try {
    middlewares(app);
    conectarDB();
    routes(app);
    crearAdministrador();
    crearCategoria();
    const port = process.env.PORT || 3002;
    app.listen(port, () => {
      console.log(`Server running on port ${port} `);
    });
  } catch (err) {
    console.log(`Server init failed: ${err}`);
  }
};
