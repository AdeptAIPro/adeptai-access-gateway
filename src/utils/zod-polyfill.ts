
// Simple zod-like validation library

// Types
type ZodType<T> = {
  _type: T;
  safeParse: (data: unknown) => { success: boolean; data?: T; error?: ZodError };
  parse: (data: unknown) => T;
  optional: () => ZodOptional<T>;
  default: (defaultValue: T) => ZodDefault<T>;
  nullable: () => ZodNullable<T>;
};

type ZodError = {
  issues: { path: string[]; message: string }[];
};

type ZodOptional<T> = ZodType<T | undefined>;
type ZodNullable<T> = ZodType<T | null>;
type ZodDefault<T> = ZodType<T> & { _default: T };

class ZodImpl<T> implements ZodType<T> {
  _type!: T;
  _check: (data: unknown) => { valid: boolean; error?: string };

  constructor(check: (data: unknown) => { valid: boolean; error?: string }) {
    this._check = check;
  }

  safeParse(data: unknown) {
    const result = this._check(data);
    if (result.valid) {
      return { success: true, data: data as T };
    }
    return { 
      success: false, 
      error: { 
        issues: [{ path: [], message: result.error || "Invalid input" }] 
      }
    };
  }

  parse(data: unknown): T {
    const result = this.safeParse(data);
    if (!result.success) {
      throw new Error(result.error?.issues[0].message);
    }
    return result.data as T;
  }

  optional(): ZodOptional<T> {
    const original = this._check;
    return new ZodImpl((data) => {
      if (data === undefined) return { valid: true };
      return original(data);
    }) as ZodOptional<T>;
  }

  default(defaultValue: T): ZodDefault<T> {
    const self = this as ZodType<T>;
    const wrapped = {
      ...self,
      _default: defaultValue,
      safeParse: (data: unknown) => {
        if (data === undefined) {
          return { success: true, data: defaultValue };
        }
        return self.safeParse(data);
      },
      parse: (data: unknown) => {
        if (data === undefined) {
          return defaultValue;
        }
        return self.parse(data);
      }
    };
    return wrapped as ZodDefault<T>;
  }

  nullable(): ZodNullable<T> {
    const original = this._check;
    return new ZodImpl((data) => {
      if (data === null) return { valid: true };
      return original(data);
    }) as ZodNullable<T>;
  }
}

// String schema
const createStringSchema = (options?: { required_error?: string; min?: number; max?: number; email?: boolean }) => {
  return new ZodImpl((data): { valid: boolean; error?: string } => {
    if (typeof data !== "string") {
      return { valid: false, error: options?.required_error || "Expected string" };
    }
    
    if (options?.min !== undefined && data.length < options.min) {
      return { valid: false, error: `String must be at least ${options.min} character(s)` };
    }
    
    if (options?.max !== undefined && data.length > options.max) {
      return { valid: false, error: `String must be at most ${options.max} character(s)` };
    }
    
    if (options?.email && !data.includes('@')) {
      return { valid: false, error: "Invalid email" };
    }
    
    return { valid: true };
  }) as ZodType<string>;
};

// Number schema
const createNumberSchema = (options?: { required_error?: string; min?: number; max?: number }) => {
  return new ZodImpl((data): { valid: boolean; error?: string } => {
    if (typeof data !== "number" || isNaN(data)) {
      return { valid: false, error: options?.required_error || "Expected number" };
    }
    
    if (options?.min !== undefined && data < options.min) {
      return { valid: false, error: `Number must be greater than or equal to ${options.min}` };
    }
    
    if (options?.max !== undefined && data > options.max) {
      return { valid: false, error: `Number must be less than or equal to ${options.max}` };
    }
    
    return { valid: true };
  }) as ZodType<number>;
};

// Boolean schema
const createBooleanSchema = (options?: { required_error?: string }) => {
  return new ZodImpl((data): { valid: boolean; error?: string } => {
    if (typeof data !== "boolean") {
      return { valid: false, error: options?.required_error || "Expected boolean" };
    }
    return { valid: true };
  }) as ZodType<boolean>;
};

// Object schema
type Shape = { [key: string]: ZodType<any> };
type ObjectType<T extends Shape> = { [K in keyof T]: T[K] extends ZodType<infer U> ? U : never };

function createObjectSchema<T extends Shape>(shape: T) {
  return new ZodImpl((data): { valid: boolean; error?: string } => {
    if (typeof data !== "object" || data === null) {
      return { valid: false, error: "Expected object" };
    }
    
    for (const key in shape) {
      if (Object.prototype.hasOwnProperty.call(shape, key)) {
        const fieldSchema = shape[key];
        const fieldValue = (data as any)[key];
        const result = fieldSchema.safeParse(fieldValue);
        
        if (!result.success) {
          return { valid: false, error: `${key}: ${result.error?.issues[0].message}` };
        }
      }
    }
    
    return { valid: true };
  }) as ZodType<ObjectType<T>>;
}

// Enum schema
function createEnumSchema<T extends [string, ...string[]]>(values: T) {
  return new ZodImpl((data): { valid: boolean; error?: string } => {
    if (!values.includes(data as any)) {
      return { valid: false, error: `Expected one of: ${values.join(", ")}` };
    }
    return { valid: true };
  }) as ZodType<T[number]>;
}

// Public API
export const z = {
  string: (options?: { required_error?: string }) => createStringSchema(options),
  number: (options?: { required_error?: string }) => createNumberSchema(options),
  boolean: (options?: { required_error?: string }) => createBooleanSchema(options),
  object: <T extends Shape>(shape: T) => createObjectSchema(shape),
  enum: <T extends [string, ...string[]]>(values: T) => createEnumSchema(values),
  infer: <T>(schema: ZodType<T>) => ({} as T),
};

// Type helper
export type infer<T extends ZodType<any>> = T extends ZodType<infer U> ? U : never;
