import logger from './utils/logger.js';

export default async function initializer() {
  logger.info('Initialization start');
  try {
    logger.info('Initialization complete');
  } catch (error) {
    logger.error('Initialization error');
    throw error;
  }
}
