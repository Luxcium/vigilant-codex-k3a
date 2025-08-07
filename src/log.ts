import pino from 'pino';
import { APP } from './infra/config';

export const log = pino({ level: APP.logLevel });
