import fs from 'fs';
import * as fileService from '../services/fileService.js';

export const getFilesInDirectory = async (req, res, next) => {
    const { category, user } = req.params;
    if(!category) {
        return res.status(400).json({ error: 'Category must be provided' });
    }

    if(!user) {
        return res.status(400).json({ error: 'Category must be provided' });
    }

    try {
        const files = await fileService.getFilesInDirectory(category, user);
        res.json(files);
    } catch (error) {
        if (error.message.includes('not found')) {
            res.status(404).json({ error: error.message });
        } else {
            console.error('Error reading files:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export const addFile = async (req, res, next) => {
    const { category, user } = req.params;
    if(!category) {
        return res.status(400).json({ error: 'Category must be provided' });
    }

    if(!user) {
        return res.status(400).json({ error: 'User must be provided' });
    }

    if (!req.file) {
        return res.status(400).json({ error: 'File must be provided' });
    }
    try {
        await fileService.addFile(category, user, req.file);
        res.json({ message: 'File uploaded successfully' });
    } catch (error) {
        if (error.message.includes('not found')) {
            res.status(404).json({ error: error.message });
        } else {
            console.error('Error uploading file:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export const downloadFile = async (req, res, next) => {
    const { category, fileName, user } = req.params;
    if(!(category && fileName)) {
        return res.status(400).json({ error: 'Category and file name must be provided' });
    }
    try {
        const filePath = await fileService.downloadFile(category, fileName, user);
        
        res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
        res.setHeader('Content-Type', 'application/octet-stream');

        const readStream = fs.createReadStream(filePath);
        readStream.pipe(res);

        readStream.on('error', (err) => {
            console.error('Error reading file:', err);
            res.status(500).json({ error: 'Internal server error' });
        });
    } catch (error) {
        if (error.message.includes('not found')) {
            res.status(404).json({ error: error.message });
        } else {
            console.error('Error fetching file:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

export const deleteFile = async (req, res, next) => {
    const { category, fileName, user } = req.params;
    if(!(category && fileName)) {
        return res.status(400).json({ error: 'Category and file name must be provided' });
    }
    try {
        await fileService.deleteFile(category, fileName, user);
        res.json({ message: `File ${fileName} deleted successfully from category ${category}` });
    } catch (error) {
        if (error.message.includes('not found')) {
            res.status(404).json({ error: error.message });
        } else {
            console.error('Error deleting file:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};