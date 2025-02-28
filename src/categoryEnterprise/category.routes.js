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

/**
 * @swagger
 * /agregarCategoria:
 *   post:
 *     summary: Add a new category
 *     responses:
 *       200:
 *         description: Category added
 */
router.post("/agregarCategoria", createCategoryValidator, saveCategory);

/**
 * @swagger
 * /buscarCategoria/{cid}:
 *   get:
 *     summary: Get category by ID
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category found
 */
router.get("/buscarCategoria/:cid", getByIdCategoryValidator, findCategory);

/**
 * @swagger
 * /:
 *   get:
 *     summary: List all categories
 *     responses:
 *       200:
 *         description: List of categories
 */
router.get("/", listCategories);

/**
 * @swagger
 * /actualizarCategoria/{cid}:
 *   patch:
 *     summary: Update category information
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category updated
 */
router.patch("/actualizarCategoria/:cid", updateCategoryValidator, updateCategory);

/**
 * @swagger
 * /eliminarCategoria/{cid}:
 *   delete:
 *     summary: Delete category by ID
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category deleted
 */
router.delete("/eliminarCategoria/:cid", deleteCategoryValidator, deleteCategory);

export default router;
