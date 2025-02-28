import {Router} from 'express';
import {generateExcel} from './excel.controller.js';

const router = Router();

/**
 * @swagger
 * /descargarExcel:
 *   post:
 *     summary: Generate and download Excel file
 *     responses:
 *       200:
 *         description: Excel file generated
 */
router.post('/descargarExcel', generateExcel);

export default router;