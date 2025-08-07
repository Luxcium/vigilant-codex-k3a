/**
 * @packageDocumentation
 * @remarks
 * High-level SDK entry point exposing Questrade capabilities.
 */
import { QuestradeClient } from './infra/client/QuestradeClient';
import { KeyManager } from './infra/security/KeyManager';
import { AuthManager } from './infra/auth/manager';
import { RestClient } from './infra/http/restClient';
import { fetchCandles } from './infra/helpers/candles';

export const questrade = {
  QuestradeClient,
  KeyManager,
  AuthManager,
  RestClient,
  fetchCandles,
};

export default questrade;

export type { QuestradeClientOptions } from './infra/client/QuestradeClient';
export type { CandlesParams } from './infra/helpers/candles';
export * from './core/errors';
export * from './core/rateLimit';
export * from './core/types';
