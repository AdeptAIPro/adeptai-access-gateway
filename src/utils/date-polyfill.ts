
// Re-export selected functions from date-fns
// This will be used as a centralized polyfill for date-fns functionality

export const formatDistanceToNow = (date: Date | number, options?: { addSuffix?: boolean }): string => {
  // Simple implementation for when date-fns is not available
  const now = new Date();
  const diff = now.getTime() - (date instanceof Date ? date.getTime() : date);
  
  // Convert to appropriate units
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  let result = '';
  
  if (days > 0) {
    result = `${days} day${days > 1 ? 's' : ''}`;
  } else if (hours > 0) {
    result = `${hours} hour${hours > 1 ? 's' : ''}`;
  } else if (minutes > 0) {
    result = `${minutes} minute${minutes > 1 ? 's' : ''}`;
  } else {
    result = 'just now';
  }
  
  if (options?.addSuffix && result !== 'just now') {
    result = `${result} ago`;
  }
  
  return result;
};

export const format = (date: Date | number, formatStr: string): string => {
  // Simple implementation for when date-fns is not available
  const d = date instanceof Date ? date : new Date(date);
  
  // Very basic implementation that replaces some common tokens
  return formatStr
    .replace('yyyy', d.getFullYear().toString())
    .replace('MM', (d.getMonth() + 1).toString().padStart(2, '0'))
    .replace('dd', d.getDate().toString().padStart(2, '0'))
    .replace('HH', d.getHours().toString().padStart(2, '0'))
    .replace('mm', d.getMinutes().toString().padStart(2, '0'))
    .replace('ss', d.getSeconds().toString().padStart(2, '0'));
};

// Add other date-fns functions as needed
