import dotenv from 'dotenv';
dotenv.config();

export const ENV = process.env.NODE_ENV;
export const APP_PORT = process.env.PORT;
export const APP_HOST = process.env.APP_HOST;
export const FILE_FOLDER = process.env.FILE_FOLDER_PATH;
export const BASE_URL = '/distributed_systems/v1/files';
export const IMMEDIATE_LOG_FORMAT = '[Start Request] :method :url';
export const LOG_FORMAT = '[End Request] :method :url :status :res[content-length] - :response-time ms';


