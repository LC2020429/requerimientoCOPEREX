import {Router} from 'express';
import {generateExcel} from './excel.controller.js';

const router = Router();
router.get('/descargarExcel', generateExcel);

export default router;