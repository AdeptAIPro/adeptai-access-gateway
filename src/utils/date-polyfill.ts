// This file provides a centralized polyfill for date-fns

// Format function
export const format = (date: Date | number, formatStr: string): string => {
  if (!date) return '';
  
  const d = new Date(date);
  
  // Basic formatting implementation
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  
  // Handle common format strings
  switch (formatStr) {
    case 'yyyy-MM-dd':
      return `${year}-${month}-${day}`;
    case 'MM/dd/yyyy':
      return `${month}/${day}/${year}`;
    case 'dd/MM/yyyy':
      return `${day}/${month}/${year}`;
    default:
      // Simple fallback
      return `${year}-${month}-${day}`;
  }
};

// Add date comparison functions
export const isBefore = (date1: Date | number, date2: Date | number): boolean => {
  return new Date(date1).getTime() < new Date(date2).getTime();
};

export const isAfter = (date1: Date | number, date2: Date | number): boolean => {
  return new Date(date1).getTime() > new Date(date2).getTime();
};

export const isSameDay = (date1: Date | number, date2: Date | number): boolean => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return d1.getFullYear() === d2.getFullYear() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getDate() === d2.getDate();
};

// Add date manipulation functions
export const addDays = (date: Date | number, amount: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + amount);
  return result;
};

export const addMonths = (date: Date | number, amount: number): Date => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + amount);
  return result;
};

export const addYears = (date: Date | number, amount: number): Date => {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + amount);
  return result;
};

// Add more functions as needed
