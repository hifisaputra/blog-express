import { Logger } from 'winston'
import winston from 'winston'
const { combine, timestamp, simple } = winston.format;
/**
 * @description Initialize logger
 * @returns {Logger}
 */
export const logger: Logger = winston.createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        simple()
    ),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        // new winston.transports.Console({
        //     format: winston.format.simple(),
        // }),
    ],
  });