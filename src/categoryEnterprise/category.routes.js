import { Router } from "express";
import {
  findCategory,
  listCategories,
  deleteCategory,
  saveCategory,
  updateCategory,
} from "./category.controller.js";

import {
  createCategoryValidator,
  getByIdCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} from "../middlewares/category-validator.js";

const router = Router();

router.post("/agregarCategoria", createCategoryValidator, saveCategory);

router.get("/buscarCategoria/:cid", getByIdCategoryValidator, findCategory);

router.get("/", listCategories);

router.patch("/actualizarCategoria/:cid", updateCategoryValidator, updateCategory);

router.delete("/eliminarCategoria/:cid", deleteCategoryValidator, deleteCategory);

export default router;
