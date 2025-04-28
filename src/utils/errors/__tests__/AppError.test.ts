
import { AppError } from '../AppError';
import { ErrorType } from '../types';

describe('AppError', () => {
  test('should create an instance with basic properties', () => {
    const error = new AppError({
      message: 'Test error message',
      type: ErrorType.VALIDATION,
      userFriendlyMessage: 'Please check your input',
    });

    expect(error).toBeInstanceOf(AppError);
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('Test error message');
    expect(error.type).toBe(ErrorType.VALIDATION);
    expect(error.userFriendlyMessage).toBe('Please check your input');
  });

  test('should use message as userFriendlyMessage if not provided', () => {
    const error = new AppError({
      message: 'Test error message',
      type: ErrorType.UNKNOWN,
    });

    expect(error.userFriendlyMessage).toBe('Test error message');
  });

  test('should store additional properties', () => {
    const originalError = new Error('Original error');
    const context = { userId: '123', action: 'update' };
    const code = 'ERR_VALIDATION_FAILED';
    const data = { field: 'email', value: 'invalid' };

    const error = new AppError({
      message: 'Validation failed',
      type: ErrorType.VALIDATION,
      code,
      data,
      originalError,
      context,
    });

    expect(error.code).toBe(code);
    expect(error.data).toEqual(data);
    expect(error.originalError).toBe(originalError);
    expect(error.context).toEqual(context);
  });

  test('should support instanceof checks', () => {
    const error = new AppError({
      message: 'Test error',
      type: ErrorType.NETWORK,
    });

    expect(error instanceof AppError).toBe(true);
    expect(error instanceof Error).toBe(true);
  });
});
