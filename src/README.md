
# Error Fixes Guide

This document explains the fixes made to resolve the TypeScript errors in the application.

## Common Error Types and Solutions

### 1. Missing @tanstack/react-table Package

**Error:**
```
src/components/crm/LeadTable.tsx(9,8): error TS2307: Cannot find module '@tanstack/react-table' or its corresponding type declarations.
```

**Solution:**
- Install the package: `npm install @tanstack/react-table`

### 2. Property doesn't exist on type 'IntrinsicAttributes'

**Error:**
```
Type '{ leads: Lead[]; loading: boolean; handleStatusChange: (id: string, status: string) => Promise<void>; }' is not assignable to type 'IntrinsicAttributes'.
```

**Solution:**
- Define proper prop interfaces for components
- Ensure components are correctly typed with React.FC<PropInterface>

### 3. Missing properties on types

**Error:**
```
Property 'totalAmount' does not exist on type 'PayrollRun'.
```

**Solution:**
- Update interface definitions to include all required properties
- Ensure consistency between type definitions and usage

### 4. Type 'unknown' is not assignable to type 'ReactNode'

**Error:**
```
Type 'unknown' is not assignable to type 'ReactNode'.
```

**Solution:**
- Use proper type assertions or type guards
- Ensure that unknown types are narrowed before using as ReactNode

### 5. Object literal may only specify known properties

**Error:**
```
Object literal may only specify known properties, and 'title' does not exist in type 'ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal'.
```

**Solution:**
- Use the toast-utils.ts helper functions for toast calls
- Properly format toast options objects before passing to toast function

## Additional Recommendations

1. Consistently use typed props for components
2. Use createToast utility for all toast notifications
3. Consider using more strict TypeScript settings to catch these issues earlier
4. Keep package.json dependencies up to date to avoid type inconsistencies
