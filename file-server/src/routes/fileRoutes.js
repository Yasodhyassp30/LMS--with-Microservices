import { Router } from 'express';
import multer from 'multer';
import * as fileController from '../controllers/fileController.js';

const upload = multer();
const fileRoutes = Router();

fileRoutes.get('/:category/:fileName', fileController.downloadFile);
fileRoutes.get('/:category', fileController.getFilesInDirectory);
fileRoutes.post('/:category', upload.single('file'), fileController.addFile);
fileRoutes.delete('/:category/:fileName', fileController.deleteFile);

export default fileRoutes;
