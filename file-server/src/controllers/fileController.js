import * as fileService from '../services/fileService.js';

export const getFiles = (req, res, next) => {
    fileService.getAllFiles()
    .then((data) => res.json(data))
    .catch((err) => next(err));
};
