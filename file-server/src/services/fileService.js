import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { FILE_FOLDER } from '../configs/configs.js';
import { directoryExists } from '../utils/fileUtils.js';

export const downloadFile = async (category, fileName, user) => {
    const __dirname = fileURLToPath(new URL(import.meta.url));
    const folderPath = path.join(__dirname, '..', '..', '..', FILE_FOLDER, user, category);

    try {
        const folderExists = await directoryExists(folderPath);
        if (!folderExists) {
            throw new Error(`Directory ${folderPath} not found`);
        }

        const filePath = path.join(folderPath, fileName);

        const fileExists = await fs.promises.access(filePath).then(() => true).catch(() => false);
        if (!fileExists) {
            throw new Error(`File ${fileName} not found in category ${category}`);
        }

        return filePath;
    } catch (error) {
        console.error('Error fetching file:', error);
        throw error;
    }
};

export const getFilesInDirectory = async (category, user) => {
    const __dirname = fileURLToPath(new URL(import.meta.url));
    const folderPath = path.join(__dirname, '..', '..', '..', FILE_FOLDER, user, category);
    try {
        const folderExists = await directoryExists(folderPath);
        if (!folderExists) {
            return []
        }

        const files = await fs.promises.readdir(folderPath);
        if (files.length === 0) {
            return []
        }

        return files;
    } catch (error) {
        console.error('Error reading files:', error);
        throw error;
    }
};

export const addFile = async (category, user, file) => {
    const __dirname = fileURLToPath(new URL(import.meta.url));
    const folderPath = path.join(__dirname, '..', '..', '..', FILE_FOLDER, user, category);
    
    try {
        const folderExists = await directoryExists(folderPath);
        if (!folderExists) {
            await fs.promises.mkdir(folderPath, { recursive: true });
        }

        const filePath = path.join(folderPath, file.originalname);
        await fs.promises.writeFile(filePath, file.buffer);

        return filePath;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
};

export const deleteFile = async (category, fileName, user) => {
    const __dirname = fileURLToPath(new URL(import.meta.url));
    const folderPath = path.join(__dirname, '..', '..', '..', FILE_FOLDER, user, category);

    try {
        const folderExists = await directoryExists(folderPath);
        if (!folderExists) {
            throw new Error(`Directory ${folderPath} not found`);
        }

        const filePath = path.join(folderPath, fileName);

        const fileExists = await fs.promises.access(filePath).then(() => true).catch(() => false);
        if (!fileExists) {
            throw new Error(`File ${fileName} not found in category ${category}`);
        }

        await fs.promises.unlink(filePath);

        return { message: `File ${fileName} deleted successfully from category ${category}` };
    } catch (error) {
        console.error('Error deleting file:', error);
        throw error;
    }
};

