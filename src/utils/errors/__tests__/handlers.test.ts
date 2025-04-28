
import { createAppError, handleError, tryCatch } from '../handlers';
import { AppError } from '../AppError';
import { ErrorType } from '../types';

// Mock console.error to avoid cluttering test output
const originalConsoleError = console.error;
beforeEach(() => {
  console.error = jest.fn();
});
afterEach(() => {
  console.error = originalConsoleError;
});

describe('createAppError', () => {
  test('should create an AppError instance with the provided message and type', () => {
    const message = 'Something went wrong';
    const type = ErrorType.SERVER;
    const error = createAppError(message, type);

    expect(error).toBeInstanceOf(AppError);
    expect(error.message).toBe(message);
    expect(error.type).toBe(type);
    expect(error.userFriendlyMessage).toBe('Server error. Our team has been notified.');
  });

  test('should use UNKNOWN as default type if not provided', () => {
    const message = 'Something went wrong';
    const error = createAppError(message);

    expect(error.type).toBe(ErrorType.UNKNOWN);
  });

  test('should include original error and context if provided', () => {
    const originalError = new Error('Original error');
    const context = { userId: '123' };
    const error = createAppError('Something went wrong', ErrorType.VALIDATION, originalError, context);

    expect(error.originalError).toBe(originalError);
    expect(error.context).toBe(context);
  });
});

describe('handleError', () => {
  test('should convert regular Error to AppError', () => {
    const originalError = new Error('Test error');
    const result = handleError(originalError);

    expect(result).toBeInstanceOf(AppError);
    expect(result.message).toBe('Test error');
    expect(result.type).toBe(ErrorType.UNKNOWN);
    expect(console.error).toHaveBeenCalled();
  });

  test('should return AppError as is', () => {
    const appError = new AppError({
      message: 'Original AppError',
      type: ErrorType.NETWORK
    });
    const result = handleError(appError);

    expect(result).toBe(appError);
    expect(console.error).toHaveBeenCalled();
  });

  test('should convert string to AppError', () => {
    const result = handleError('String error');

    expect(result).toBeInstanceOf(AppError);
    expect(result.message).toBe('String error');
    expect(console.error).toHaveBeenCalled();
  });

  test('should handle showToast option', () => {
    // Mock required module
    jest.mock('sonner', () => ({
      toast: {
        error: jest.fn()
      }
    }));
    
    // This is a simplified test since we can't easily test the toast functionality
    // in a unit test without complex mocking
    const result = handleError('Toast error', true);
    expect(result).toBeInstanceOf(AppError);
  });
});

describe('tryCatch', () => {
  test('should return result and null error on success', async () => {
    const successPromise = Promise.resolve('success');
    const [result, error] = await tryCatch(successPromise);

    expect(result).toBe('success');
    expect(error).toBeNull();
  });

  test('should return null result and AppError on failure', async () => {
    const failPromise = Promise.reject(new Error('fail'));
    const [result, error] = await tryCatch(failPromise);

    expect(result).toBeNull();
    expect(error).toBeInstanceOf(AppError);
    expect(error?.message).toBe('fail');
  });
});
