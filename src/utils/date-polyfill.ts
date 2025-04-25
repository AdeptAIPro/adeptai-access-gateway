
// This file provides polyfills for date-fns when the library is not available

/**
 * Returns the distance between two dates in words.
 * 
 * @param date - The date to calculate the distance from
 * @param baseDate - The date to calculate the distance to
 * @param options - Additional options
 * @returns A string representing the distance between the dates
 */
export function formatDistanceToNow(date: Date | number, options?: { addSuffix?: boolean }): string {
  try {
    const now = new Date();
    const then = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);
    
    // Less than a minute
    if (diffInSeconds < 60) {
      return options?.addSuffix ? 'just now' : 'less than a minute';
    }
    
    // Less than an hour
    if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return options?.addSuffix 
        ? `${minutes} minute${minutes !== 1 ? 's' : ''} ago` 
        : `${minutes} minute${minutes !== 1 ? 's' : ''}`;
    }
    
    // Less than a day
    if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return options?.addSuffix 
        ? `${hours} hour${hours !== 1 ? 's' : ''} ago` 
        : `${hours} hour${hours !== 1 ? 's' : ''}`;
    }
    
    // Less than a month
    if (diffInSeconds < 2592000) {
      const days = Math.floor(diffInSeconds / 86400);
      return options?.addSuffix 
        ? `${days} day${days !== 1 ? 's' : ''} ago` 
        : `${days} day${days !== 1 ? 's' : ''}`;
    }
    
    // Less than a year
    if (diffInSeconds < 31536000) {
      const months = Math.floor(diffInSeconds / 2592000);
      return options?.addSuffix 
        ? `${months} month${months !== 1 ? 's' : ''} ago` 
        : `${months} month${months !== 1 ? 's' : ''}`;
    }
    
    // More than a year
    const years = Math.floor(diffInSeconds / 31536000);
    return options?.addSuffix 
      ? `${years} year${years !== 1 ? 's' : ''} ago` 
      : `${years} year${years !== 1 ? 's' : ''}`;
  } catch (e) {
    return options?.addSuffix ? 'some time ago' : 'some time';
  }
}

/**
 * Formats a date according to the specified format string.
 * 
 * @param date - The date to format
 * @param formatString - The format string
 * @returns The formatted date string
 */
export function format(date: Date | number, formatString: string): string {
  try {
    const d = new Date(date);
    
    // Simple implementation that handles only a few format patterns
    return formatString
      .replace('yyyy', d.getFullYear().toString())
      .replace('MM', (d.getMonth() + 1).toString().padStart(2, '0'))
      .replace('dd', d.getDate().toString().padStart(2, '0'))
      .replace('HH', d.getHours().toString().padStart(2, '0'))
      .replace('mm', d.getMinutes().toString().padStart(2, '0'))
      .replace('ss', d.getSeconds().toString().padStart(2, '0'));
  } catch (e) {
    return 'Invalid date';
  }
}

/**
 * Returns true if the given dates are in the same day.
 * 
 * @param dateLeft - The first date
 * @param dateRight - The second date
 * @returns True if the dates are in the same day
 */
export function isSameDay(dateLeft: Date | number, dateRight: Date | number): boolean {
  try {
    const dl = new Date(dateLeft);
    const dr = new Date(dateRight);
    return dl.getDate() === dr.getDate() && 
           dl.getMonth() === dr.getMonth() &&
           dl.getFullYear() === dr.getFullYear();
  } catch (e) {
    return false;
  }
}

/**
 * Parses a date from a string using the specified format.
 * 
 * @param dateString - The date string to parse
 * @param formatString - The format of the date string
 * @param referenceDate - The reference date to use
 * @returns The parsed date
 */
export function parse(dateString: string, formatString: string, referenceDate: Date | number): Date {
  // This is a very simplified implementation
  try {
    // For simplicity, just use the native Date parser
    return new Date(dateString);
  } catch (e) {
    return new Date(NaN);
  }
}

// Export a default object simulating the date-fns structure
export default {
  formatDistanceToNow,
  format,
  isSameDay,
  parse
};
