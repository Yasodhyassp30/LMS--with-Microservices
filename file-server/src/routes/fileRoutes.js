import { Router } from 'express';
import * as fileController from '../controllers/fileController.js';

const fileRoutes = Router();

fileRoutes.get('/', fileController.getFiles);

export default fileRoutes;
