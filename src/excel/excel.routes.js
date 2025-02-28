import {Router} from 'express';
import {generateExcel} from './excel.controller.js';

const router = Router();
router.post('/descargarExcel', generateExcel);

export default router;