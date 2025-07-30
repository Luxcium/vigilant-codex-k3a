import pino from 'pino';
import { APP } from './config';

export const log = pino({ level: APP.logLevel });
