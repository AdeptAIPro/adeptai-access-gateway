
// Basic implementations of date-fns functions
import { format as originalFormat } from 'date-fns';

// Format
export const format = (date: Date | number, formatStr: string): string => {
  try {
    if (typeof originalFormat === 'function') {
      return originalFormat(date, formatStr);
    }
    
    // Simple implementation for common formats
    const d = new Date(date);
    
    if (formatStr === 'yyyy-MM-dd') {
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    }
    
    if (formatStr === 'MM/dd/yyyy') {
      return `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}/${d.getFullYear()}`;
    }
    
    // Default ISO format
    return d.toISOString().split('T')[0];
  } catch (error) {
    console.error('Error formatting date:', error);
    return String(date);
  }
};

// Parse ISO date
export const parseISO = (dateStr: string): Date => {
  return new Date(dateStr);
};

// Check if date is valid
export const isValid = (date: any): boolean => {
  return date instanceof Date && !isNaN(date.getTime());
};

// Add days to date
export const addDays = (date: Date | number, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// Add months to date
export const addMonths = (date: Date | number, months: number): Date => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
};

// Format distance (e.g., "2 days ago")
export const formatDistance = (date: Date | number, baseDate: Date | number): string => {
  const dateTime = new Date(date).getTime();
  const baseDateTime = new Date(baseDate).getTime();
  
  const diffInSeconds = Math.abs(Math.floor((baseDateTime - dateTime) / 1000));
  
  if (diffInSeconds < 60) return `${diffInSeconds} seconds`;
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''}`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''}`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays} day${diffInDays !== 1 ? 's' : ''}`;
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths} month${diffInMonths !== 1 ? 's' : ''}`;
  
  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} year${diffInYears !== 1 ? 's' : ''}`;
};

// Format distance to now (e.g., "2 days ago")
export const formatDistanceToNow = (date: Date | number): string => {
  return formatDistance(date, new Date());
};

// Get difference in days
export const differenceInDays = (dateLeft: Date | number, dateRight: Date | number): number => {
  const diffInMs = new Date(dateLeft).getTime() - new Date(dateRight).getTime();
  return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
};
