
// Basic mock implementation of zod for development without the actual package
class ZodType {
  constructor() {}
  
  optional() {
    return this;
  }
  
  nullable() {
    return this;
  }

  array() {
    return this;
  }

  refine() {
    return this;
  }

  transform() {
    return this;
  }

  or() {
    return this;
  }
}

class ZodString extends ZodType {
  email() { return this; }
  url() { return this; }
  min() { return this; }
  max() { return this; }
}

class ZodObject extends ZodType {
  shape() { return this; }
  extend() { return this; }
  pick() { return this; }
  omit() { return this; }
}

export const z = {
  string: () => new ZodString(),
  number: () => new ZodType(),
  boolean: () => new ZodType(),
  date: () => new ZodType(),
  object: (shape: any) => new ZodObject(),
  array: (type: any) => new ZodType(),
  enum: (values: any[]) => new ZodType(),
  literal: (value: any) => new ZodType(),
  union: (types: any[]) => new ZodType(),
};

// Try to use the real zod if it's available
try {
  const realZod = require('zod');
  Object.assign(z, realZod);
} catch (e) {
  console.log('Using zod polyfill');
}

export default { z };
