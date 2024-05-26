import { Router } from 'express';
import multer from 'multer';
import * as fileController from '../controllers/fileController.js';

const upload = multer();
const fileRoutes = Router();

fileRoutes.get('/:user/:category', fileController.getFilesInDirectory);
fileRoutes.post('/:user/:category', upload.single('file'), fileController.addFile);
fileRoutes.get('/:user/:category/:fileName', fileController.downloadFile);
fileRoutes.delete('/:user/:category/:fileName', fileController.deleteFile);


export default fileRoutes;
