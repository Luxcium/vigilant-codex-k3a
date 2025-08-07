import { describe, expect, it, vi } from 'vitest';
import { bootstrap } from '../infra/auth/manual';
import * as storage from '../infra/auth/storage';

vi.mock('../infra/auth/storage', async () => {
  const mod = await vi.importActual<typeof storage>('../infra/auth/storage');
  return {
    ...mod,
    save: vi.fn(mod.save),
  };
});

const globalFetch = global.fetch;

describe('bootstrap', () => {
  it('saves tokens to file', async () => {
    global.fetch = vi.fn(
      async () =>
        new Response(
          JSON.stringify({ access_token: 'a', api_server: 's', expires_in: 1 })
        )
    );
    await bootstrap('test', 'r');
    expect(storage.save).toHaveBeenCalled();
  });
});
