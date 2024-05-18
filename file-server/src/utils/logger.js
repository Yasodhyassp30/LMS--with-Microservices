import winston from 'winston';
import { ENV } from '../configs/configs.js';

const logTemplate = (info) => {
  const { level, timestamp, stack, message, durationMs, ...rest } = info;
  const duration = durationMs ? ` | ${durationMs}ms` : '';
  if (stack) {
    const _rest = JSON.stringify(rest, (_, value) => (!value ? 'null' : value));
    const additionalInfo = Object.keys(_rest).length ? `\nAdditional Error Info: ${_rest}` : '';
    return `${level}|${timestamp}:${message}\n${stack}${additionalInfo}`;
  }
  return `${level}|${timestamp}:${message}${duration}`;
};

/**
 * Create a new winston logger.
 */
const level = ENV === 'dev' ? 'debug' : 'info';
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.align(),
        winston.format.printf(logTemplate)
      ),
      level
    })
  ]
});

export const logStream = {
  /**
   * A writable stream for winston logger.
   *
   * @param {any} message
   */
  write(message) {
    logger.info(message.toString());
  }
};

export default logger;
