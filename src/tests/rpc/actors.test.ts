import path from 'node:path';
import { describe, expect, test } from 'vitest';
import {
  initializeActors,
  selectActor,
  dispatch,
} from '../../rpc/runtime/actors';

const methodsPath = path.resolve(__dirname, '../../rpc/commands/methods.ts');

describe('actors', () => {
  test('dispatch via random actor', async () => {
    const actors = initializeActors(methodsPath, 1, ['a', 'b']);
    const actor = selectActor(actors);
    const result = await dispatch(actor, 'helloworld', []);
    expect(result).toBe('hello world');
    await Promise.all(Object.values(actors).map((a) => a.destroy()));
  });
});
