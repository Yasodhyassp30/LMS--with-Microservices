import { Router } from 'express';
import fileRoutes from './routes/fileRoutes.js';

/**
 * Contains all API routes for the application.
 */
const router = Router();

router.use('/', fileRoutes);

export default router;
