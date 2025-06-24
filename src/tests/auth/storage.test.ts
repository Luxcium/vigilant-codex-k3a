import type { OAuthTokens } from '@/auth/storage';
import { clear, load, save } from '@/auth/storage';
import { promises as fs } from 'fs';
import { dirname } from 'path';
import { beforeEach, describe, expect, it, vi, type MockedFunction } from 'vitest';

// Mock fs and path modules
vi.mock('fs', () => ({
  promises: {
    readFile: vi.fn(),
    writeFile: vi.fn(),
    chmod: vi.fn(),
    mkdir: vi.fn(),
    rm: vi.fn(),
  },
}));

vi.mock('path', () => ({
  dirname: vi.fn(),
}));

describe('auth/storage', () => {
  const mockTokens: OAuthTokens = {
    accessToken: 'test-access-token',
    apiServer: 'https://api.example.com',
    refreshToken: 'test-refresh-token',
    expiresAt: Date.now() + 3600000,
  };

  const testFilePath = '/test/path/tokens.json';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('load', () => {
    it('should load tokens from existing file', async () => {
      const mockFileContent = JSON.stringify(mockTokens);
      (fs.readFile as MockedFunction<typeof fs.readFile>).mockResolvedValue(mockFileContent);

      const result = await load(testFilePath);

      expect(fs.readFile).toHaveBeenCalledWith(testFilePath, 'utf8');
      expect(result).toEqual(mockTokens);
    });

    it('should return null when file does not exist', async () => {
      (fs.readFile as MockedFunction<typeof fs.readFile>).mockRejectedValue(
        new Error('ENOENT: no such file or directory')
      );

      const result = await load(testFilePath);

      expect(fs.readFile).toHaveBeenCalledWith(testFilePath, 'utf8');
      expect(result).toBeNull();
    });

    it('should return null when file contains invalid JSON', async () => {
      (fs.readFile as MockedFunction<typeof fs.readFile>).mockResolvedValue('invalid json');

      const result = await load(testFilePath);

      expect(fs.readFile).toHaveBeenCalledWith(testFilePath, 'utf8');
      expect(result).toBeNull();
    });

    it('should return null on any file system error', async () => {
      (fs.readFile as MockedFunction<typeof fs.readFile>).mockRejectedValue(
        new Error('Permission denied')
      );

      const result = await load(testFilePath);

      expect(result).toBeNull();
    });
  });

  describe('save', () => {
    const mockDirname = '/test/path';

    beforeEach(() => {
      (dirname as MockedFunction<typeof dirname>).mockReturnValue(mockDirname);
      (fs.mkdir as MockedFunction<typeof fs.mkdir>).mockResolvedValue(undefined);
      (fs.writeFile as MockedFunction<typeof fs.writeFile>).mockResolvedValue();
      (fs.chmod as MockedFunction<typeof fs.chmod>).mockResolvedValue();
    });

    it('should save tokens to file with proper formatting and permissions', async () => {
      await save(testFilePath, mockTokens);

      // Verify directory creation
      expect(dirname).toHaveBeenCalledWith(testFilePath);
      expect(fs.mkdir).toHaveBeenCalledWith(mockDirname, { recursive: true });

      // Verify file write
      expect(fs.writeFile).toHaveBeenCalledWith(
        testFilePath,
        JSON.stringify(mockTokens, null, 2),
        'utf8'
      );

      // Verify permissions
      expect(fs.chmod).toHaveBeenCalledWith(testFilePath, 0o600);
    });

    it('should handle directory creation errors', async () => {
      (fs.mkdir as MockedFunction<typeof fs.mkdir>).mockRejectedValue(
        new Error('Permission denied')
      );

      await expect(save(testFilePath, mockTokens)).rejects.toThrow('Permission denied');
      expect(fs.writeFile).not.toHaveBeenCalled();
      expect(fs.chmod).not.toHaveBeenCalled();
    });

    it('should handle file write errors', async () => {
      (fs.writeFile as MockedFunction<typeof fs.writeFile>).mockRejectedValue(
        new Error('Disk full')
      );

      await expect(save(testFilePath, mockTokens)).rejects.toThrow('Disk full');
      expect(fs.chmod).not.toHaveBeenCalled();
    });

    it('should handle chmod errors', async () => {
      (fs.chmod as MockedFunction<typeof fs.chmod>).mockRejectedValue(
        new Error('Permission denied')
      );

      await expect(save(testFilePath, mockTokens)).rejects.toThrow('Permission denied');
      expect(fs.writeFile).toHaveBeenCalled();
    });

    it('should ensure proper JSON formatting', async () => {
      const complexTokens: OAuthTokens = {
        accessToken: 'test-access-token',
        apiServer: 'https://api.example.com',
        refreshToken: 'test-refresh-token',
        expiresAt: 1640995200000, // Fixed timestamp for testing
      };

      await save(testFilePath, complexTokens);

      const expectedJson = JSON.stringify(complexTokens, null, 2);
      expect(fs.writeFile).toHaveBeenCalledWith(testFilePath, expectedJson, 'utf8');
    });
  });

  describe('clear', () => {
    it('should remove file when it exists', async () => {
      (fs.rm as MockedFunction<typeof fs.rm>).mockResolvedValue();

      await clear(testFilePath);

      expect(fs.rm).toHaveBeenCalledWith(testFilePath, { force: true });
    });

    it('should not throw error when file does not exist', async () => {
      (fs.rm as MockedFunction<typeof fs.rm>).mockResolvedValue();

      await expect(clear(testFilePath)).resolves.not.toThrow();
      expect(fs.rm).toHaveBeenCalledWith(testFilePath, { force: true });
    });

    it('should handle file system errors gracefully', async () => {
      (fs.rm as MockedFunction<typeof fs.rm>).mockRejectedValue(
        new Error('Permission denied')
      );

      await expect(clear(testFilePath)).rejects.toThrow('Permission denied');
    });
  });

  describe('integration scenarios', () => {
    it('should handle save and load cycle', async () => {
      // Mock successful save
      (dirname as MockedFunction<typeof dirname>).mockReturnValue('/test/path');
      (fs.mkdir as MockedFunction<typeof fs.mkdir>).mockResolvedValue(undefined);
      (fs.writeFile as MockedFunction<typeof fs.writeFile>).mockResolvedValue();
      (fs.chmod as MockedFunction<typeof fs.chmod>).mockResolvedValue();

      // Save tokens
      await save(testFilePath, mockTokens);

      // Mock successful load
      const expectedJson = JSON.stringify(mockTokens, null, 2);
      (fs.readFile as MockedFunction<typeof fs.readFile>).mockResolvedValue(expectedJson);

      // Load tokens
      const result = await load(testFilePath);

      expect(result).toEqual(mockTokens);
    });

    it('should handle clear after save', async () => {
      // Mock successful save
      (dirname as MockedFunction<typeof dirname>).mockReturnValue('/test/path');
      (fs.mkdir as MockedFunction<typeof fs.mkdir>).mockResolvedValue(undefined);
      (fs.writeFile as MockedFunction<typeof fs.writeFile>).mockResolvedValue();
      (fs.chmod as MockedFunction<typeof fs.chmod>).mockResolvedValue();

      // Save tokens
      await save(testFilePath, mockTokens);

      // Mock successful clear
      (fs.rm as MockedFunction<typeof fs.rm>).mockResolvedValue();

      // Clear tokens
      await clear(testFilePath);

      // Mock file not found after clear
      (fs.readFile as MockedFunction<typeof fs.readFile>).mockRejectedValue(
        new Error('ENOENT: no such file or directory')
      );

      // Try to load after clear
      const result = await load(testFilePath);

      expect(result).toBeNull();
    });
  });
});
