import { promises as fs } from 'fs'
import { dirname } from 'path'

/**
 * OAuth token set persisted on disk.
 */
export interface OAuthTokens {
  /** Access token for API calls. */
  accessToken: string
  /** API server base URL. */
  apiServer: string
  /** Refresh token for renewal. */
  refreshToken: string
  /** Expiration timestamp in ms. */
  expiresAt: number
}

const ensureDir = async (path: string): Promise<void> => {
  await fs.mkdir(dirname(path), { recursive: true })
}

/**
 * Load tokens from a JSON file.
 */
export const load = async (file: string): Promise<OAuthTokens | null> => {
  try {
    const data = await fs.readFile(file, 'utf8')
    return JSON.parse(data) as OAuthTokens
  } catch {
    return null
  }
}

/**
 * Save tokens to a JSON file with 600 permissions.
 */
export const save = async (file: string, tokens: OAuthTokens): Promise<void> => {
  await ensureDir(file)
  await fs.writeFile(file, JSON.stringify(tokens, null, 2), 'utf8')
  await fs.chmod(file, 0o600)
}

/**
 * Remove a token file if it exists.
 */
export const clear = async (file: string): Promise<void> => {
  await fs.rm(file, { force: true })
}
