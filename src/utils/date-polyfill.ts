
// Simple polyfill for date-fns functions used in the app

interface FormatOptions {
  addSuffix?: boolean;
}

// Simple formatDistanceToNow implementation
export function formatDistanceToNow(date: Date, options: FormatOptions = {}): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  let result = '';
  
  if (diffInSeconds < 60) {
    result = `${diffInSeconds} second${diffInSeconds !== 1 ? 's' : ''}`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    result = `${minutes} minute${minutes !== 1 ? 's' : ''}`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    result = `${hours} hour${hours !== 1 ? 's' : ''}`;
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400);
    result = `${days} day${days !== 1 ? 's' : ''}`;
  } else if (diffInSeconds < 31536000) {
    const months = Math.floor(diffInSeconds / 2592000);
    result = `${months} month${months !== 1 ? 's' : ''}`;
  } else {
    const years = Math.floor(diffInSeconds / 31536000);
    result = `${years} year${years !== 1 ? 's' : ''}`;
  }
  
  if (options.addSuffix) {
    result = `${result} ago`;
  }
  
  return result;
}

export function format(date: Date, formatStr: string): string {
  // Simple format implementation for common formats
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  if (formatStr === 'yyyy-MM-dd') {
    return `${year}-${month}-${day}`;
  }
  
  if (formatStr === 'MM/dd/yyyy') {
    return `${month}/${day}/${year}`;
  }
  
  // Default to ISO string if format not supported
  return date.toISOString().split('T')[0];
}

export function parseISO(dateStr: string): Date {
  return new Date(dateStr);
}
