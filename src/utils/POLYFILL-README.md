
# Polyfill System for Missing Dependencies

This directory contains polyfill implementations for missing dependencies in the project. These polyfills are temporary solutions to make the codebase buildable and functional while proper dependency installation is being set up.

## Available Polyfills

1. **icon-polyfill.tsx** - Provides icon components that mimic lucide-react
2. **lucide-polyfill.ts** - Provides a compatibility layer for lucide-react imports
3. **date-polyfill.ts** - Provides functions that mimic date-fns 
4. **router-polyfill.tsx** - Provides components that mimic react-router-dom
5. **recharts-polyfill.tsx** - Provides chart components that mimic recharts
6. **sonner-polyfill.tsx** - Provides toast functionality that mimics sonner
7. **zod-polyfill.ts** - Provides validation functionality that mimics zod
8. **module-polyfills.ts** - Re-exports all polyfills for easy importing
9. **toast-utils.ts** - Provides compatible toast functions

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

### For Router Components
```tsx
// Instead of:
import { Link, useNavigate } from 'react-router-dom';

// Use:
import { Link, useNavigate } from '@/utils/router-polyfill';
```

### For Chart Components
```tsx
// Instead of:
import { PieChart, Pie, Cell } from 'recharts';

// Use:
import { PieChart, Pie, Cell } from '@/utils/recharts-polyfill';
```

### For Toast Functionality
```tsx
// Instead of:
import { toast } from 'sonner';

// Use:
import { toast } from '@/utils/sonner-polyfill';
// Or:
import { showError, showSuccess, showInfo } from '@/utils/toast-utils';
```

### For Validation
```tsx
// Instead of:
import { z } from 'zod';

// Use:
import { z } from '@/utils/zod-polyfill';
```

### Using Module Exports
For convenience, you can also import everything from module-polyfills:

```tsx
import { dateFns, lucide, router, charts, toast, z } from '@/utils/module-polyfills';

// Then use as:
dateFns.format(new Date(), 'yyyy-MM-dd');
const UserIcon = lucide.User;
<router.Link to="/">Home</router.Link>
charts.PieChart;
toast.error("Error message");
const schema = z.object({ name: z.string() });
```
