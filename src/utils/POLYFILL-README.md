
# Polyfill System for Missing Dependencies

This directory contains polyfill implementations for missing dependencies in the project. These polyfills are temporary solutions to make the codebase buildable and functional while proper dependency installation is being set up.

## Available Polyfills

1. **icon-polyfill.tsx** - Provides icon components that mimic lucide-react
2. **lucide-polyfill.ts** - Provides a compatibility layer for lucide-react imports
3. **date-polyfill.ts** - Provides functions that mimic date-fns 
4. **module-polyfills.ts** - Re-exports all polyfills for easy importing
5. **toast-utils.ts** - Provides compatible toast functions

## How to Use

### For Lucide Icons
```tsx
// Instead of:
import { Search, User } from 'lucide-react';

// Use:
import { Search, User } from '@/utils/lucide-polyfill';
```

### For Date Functions
```tsx
// Instead of:
import { format, parseISO } from 'date-fns';

// Use:
import { format, parseISO } from '@/utils/date-polyfill';
```

### For Toast Functions
```tsx
// Instead of:
import { toast } from 'sonner';

// Use:
import { showError, showSuccess, showInfo } from '@/utils/toast-utils';
```
