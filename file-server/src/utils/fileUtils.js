import fs from 'fs';


export const directoryExists = async (folderPath) => {
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