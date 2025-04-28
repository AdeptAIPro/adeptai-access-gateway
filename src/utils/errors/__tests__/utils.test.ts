
import { getDefaultUserFriendlyMessage, determineErrorType } from '../utils';
import { ErrorType } from '../types';

describe('getDefaultUserFriendlyMessage', () => {
  test('should return appropriate message for network errors', () => {
    const message = getDefaultUserFriendlyMessage(ErrorType.NETWORK, 'Connection failed');
    expect(message).toBe('Network error. Please check your connection and try again.');
  });

  test('should return appropriate message for authentication errors', () => {
    const message = getDefaultUserFriendlyMessage(ErrorType.AUTHENTICATION, 'Token expired');
    expect(message).toBe('Authentication error. Please log in again.');
  });

  test('should return appropriate message for validation errors', () => {
    const message = getDefaultUserFriendlyMessage(ErrorType.VALIDATION, 'Invalid email');
    expect(message).toBe('Please check your input and try again.');
  });

  test('should return the original message if relatively short and non-technical', () => {
    const originalMessage = 'Your subscription has expired';
    const message = getDefaultUserFriendlyMessage(ErrorType.UNKNOWN, originalMessage);
    expect(message).toBe(originalMessage);
  });

  test('should return a generic message for long or technical errors', () => {
    const longError = 'TypeError: Cannot read property \'x\' of undefined at Object.process (/path/to/file.js:123:45)';
    const message = getDefaultUserFriendlyMessage(ErrorType.UNKNOWN, longError);
    expect(message).toBe('An unexpected error occurred. Please try again.');
  });
});

describe('determineErrorType', () => {
  test('should use existing type if valid', () => {
    const errorObj = { type: ErrorType.NETWORK, message: 'Network error' };
    const type = determineErrorType(errorObj);
    expect(type).toBe(ErrorType.NETWORK);
  });

  test('should determine network errors from message', () => {
    const errorObj = { message: 'network connection failed' };
    const type = determineErrorType(errorObj);
    expect(type).toBe(ErrorType.NETWORK);
    
    const offlineObj = { message: 'device is offline' };
    const offlineType = determineErrorType(offlineObj);
    expect(offlineType).toBe(ErrorType.NETWORK);
  });

  test('should determine authentication errors from message', () => {
    const errorObj = { message: 'unauthorized access' };
    const type = determineErrorType(errorObj);
    expect(type).toBe(ErrorType.AUTHENTICATION);
    
    const authObj = { message: 'user not authenticated' };
    const authType = determineErrorType(authObj);
    expect(authType).toBe(ErrorType.AUTHENTICATION);
  });

  test('should determine not found errors from message', () => {
    const errorObj = { message: 'resource not found' };
    const type = determineErrorType(errorObj);
    expect(type).toBe(ErrorType.NOT_FOUND);
    
    const notFoundObj = { message: 'error 404 page not found' };
    const notFoundType = determineErrorType(notFoundObj);
    expect(notFoundType).toBe(ErrorType.NOT_FOUND);
  });

  test('should default to UNKNOWN for indeterminate messages', () => {
    const errorObj = { message: 'something went wrong' };
    const type = determineErrorType(errorObj);
    expect(type).toBe(ErrorType.UNKNOWN);
  });
});
