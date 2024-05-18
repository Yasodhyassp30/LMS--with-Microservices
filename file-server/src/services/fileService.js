import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { FILE_FOLDER } from '../configs/configs.js';

export const getAllFiles = async (req, res) => {
    const __dirname = fileURLToPath(new URL(import.meta.url));
    const folderPath = path.join(__dirname, '..', '..', '..', FILE_FOLDER);

    try {
        // Check if the directory exists
        const folderExists = await directoryExists(folderPath);
        if (!folderExists) {
            return ({ error: `Directory ${folderPath} not found` });
        }

        // Read the contents of the folder
        const files = await fs.promises.readdir(folderPath);
        if (files.length === 0) {
            return ({ error: 'No files found' });
        }

        res.json(files);
    } catch (error) {
        console.error('Error reading files:', error);
        return ({ error: 'Internal server error' });
    }
};

async function directoryExists(folderPath) {
    try {
        const stats = await fs.promises.stat(folderPath);
        return stats.isDirectory();
    } catch (error) {
        if (error.code === 'ENOENT') {
            return false;
        }
        throw error;
    }
}
