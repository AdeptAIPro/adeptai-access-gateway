
import { useState, useCallback } from 'react';
import { useSafeState } from './use-safe-state';
import { handleError, ErrorType } from '@/utils/error-handler';

type StorageType = 'local' | 'session';

interface SecureStorageOptions {
  storageType?: StorageType;
  encryptionKey?: string;
}

/**
 * A hook for securely storing and retrieving data from browser storage
 * Uses simple encryption for added security layer
 */
export const useSecureStorage = (options: SecureStorageOptions = {}) => {
  const { storageType = 'local', encryptionKey = 'adept_secure_key' } = options;
  const storage = storageType === 'local' ? localStorage : sessionStorage;
  
  const [encryptionEnabled] = useSafeState<boolean>(() => {
    try {
      // Test if encryption works in the current browser
      const testData = encrypt("test", encryptionKey);
      const decrypted = decrypt(testData, encryptionKey);
      return decrypted === "test";
    } catch (e) {
      console.warn("Browser doesn't support encryption features. Falling back to regular storage.");
      return false;
    }
  });

  // Simple encryption function (for production, use a proper crypto library)
  const encrypt = useCallback((value: string, key: string): string => {
    try {
      if (!value) return '';
      
      // Simple XOR encryption - not for highly sensitive data
      const result = [];
      for (let i = 0; i < value.length; i++) {
        result.push(String.fromCharCode(value.charCodeAt(i) ^ key.charCodeAt(i % key.length)));
      }
      return btoa(result.join(''));
    } catch (error) {
      handleError({
        type: ErrorType.DATA_ENCRYPTION,
        message: "Failed to encrypt data",
        userFriendlyMessage: "Failed to securely store data",
        originalError: error
      }, false);
      return '';
    }
  }, []);

  // Simple decryption function (pair with the encryption above)
  const decrypt = useCallback((value: string, key: string): string => {
    try {
      if (!value) return '';
      
      const encryptedValue = atob(value);
      const result = [];
      for (let i = 0; i < encryptedValue.length; i++) {
        result.push(String.fromCharCode(encryptedValue.charCodeAt(i) ^ key.charCodeAt(i % key.length)));
      }
      return result.join('');
    } catch (error) {
      handleError({
        type: ErrorType.DATA_ENCRYPTION,
        message: "Failed to decrypt data",
        userFriendlyMessage: "Failed to retrieve securely stored data",
        originalError: error
      }, false);
      return '';
    }
  }, []);

  // Store a value securely
  const setItem = useCallback((key: string, value: any): void => {
    try {
      const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
      const storageValue = encryptionEnabled 
        ? encrypt(stringValue, encryptionKey)
        : stringValue;
      
      storage.setItem(key, storageValue);
    } catch (error) {
      handleError({
        type: ErrorType.DATA_ENCRYPTION,
        message: `Failed to store data for key: ${key}`,
        userFriendlyMessage: "Failed to securely store data",
        originalError: error,
        context: { key }
      }, true);
    }
  }, [storage, encrypt, encryptionEnabled, encryptionKey]);

  // Retrieve a stored value securely
  const getItem = useCallback((key: string, defaultValue?: any): any => {
    try {
      const storedValue = storage.getItem(key);
      
      if (!storedValue) return defaultValue ?? null;
      
      const decryptedValue = encryptionEnabled 
        ? decrypt(storedValue, encryptionKey)
        : storedValue;
      
      try {
        // Try to parse as JSON
        return JSON.parse(decryptedValue);
      } catch {
        // If not valid JSON, return as is
        return decryptedValue;
      }
    } catch (error) {
      handleError({
        type: ErrorType.DATA_ENCRYPTION,
        message: `Failed to retrieve data for key: ${key}`,
        userFriendlyMessage: "Failed to retrieve securely stored data",
        originalError: error,
        context: { key }
      }, true);
      return defaultValue ?? null;
    }
  }, [storage, decrypt, encryptionEnabled, encryptionKey]);

  // Remove a stored value
  const removeItem = useCallback((key: string): void => {
    try {
      storage.removeItem(key);
    } catch (error) {
      console.error(`Failed to remove item with key: ${key}`, error);
    }
  }, [storage]);

  // Clear all stored values
  const clear = useCallback((): void => {
    try {
      storage.clear();
    } catch (error) {
      console.error('Failed to clear storage', error);
    }
  }, [storage]);

  return { setItem, getItem, removeItem, clear, encryptionEnabled };
};
