
import { AppError, createAppError, handleError, tryCatch, ErrorType } from '../index';

describe('Error handling integration', () => {
  // Mock console.error to avoid cluttering test output
  const originalConsoleError = console.error;
  beforeEach(() => {
    console.error = jest.fn();
  });
  afterEach(() => {
    console.error = originalConsoleError;
  });

  test('should correctly integrate the error handling modules', async () => {
    // Create an error
    const appError = createAppError('API request failed', ErrorType.API);
    expect(appError).toBeInstanceOf(AppError);
    expect(appError.type).toBe(ErrorType.API);

    // Handle the error
    const handled = handleError(appError);
    expect(handled).toBe(appError);
    expect(console.error).toHaveBeenCalled();

    // Use tryCatch with a failing promise
    const failingPromise = Promise.reject(appError);
    const [result, error] = await tryCatch(failingPromise);
    
    expect(result).toBeNull();
    expect(error).toBe(appError);
  });

  test('should provide consistent user-friendly messages', () => {
    const validationError = createAppError('Invalid email format', ErrorType.VALIDATION);
    const networkError = createAppError('Failed to connect', ErrorType.NETWORK);
    const serverError = createAppError('Internal server error', ErrorType.SERVER);

    expect(validationError.userFriendlyMessage).toBe('Please check your input and try again.');
    expect(networkError.userFriendlyMessage).toBe('Network error. Please check your connection and try again.');
    expect(serverError.userFriendlyMessage).toBe('Server error. Our team has been notified.');
  });

  test('should properly wrap a third-party API error', () => {
    // Simulate a third-party API error
    const originalError = {
      name: 'AxiosError',
      message: 'Request failed with status code 500',
      response: {
        status: 500,
        data: {
          error: 'Internal Server Error'
        }
      }
    };

    const wrappedError = handleError(originalError);
    
    expect(wrappedError).toBeInstanceOf(AppError);
    expect(wrappedError.originalError).toBe(originalError);
    expect(wrappedError.userFriendlyMessage).toMatch(/unexpected error|server error/i);
  });
});
