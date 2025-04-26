
// This file provides polyfill functions for date-fns

export const format = (date: Date | number, formatStr: string): string => {
  const d = new Date(date);
  
  // Simple implementation that mimics common date-fns format patterns
  const formatMap: Record<string, () => string> = {
    'yyyy': () => d.getFullYear().toString(),
    'MM': () => (d.getMonth() + 1).toString().padStart(2, '0'),
    'dd': () => d.getDate().toString().padStart(2, '0'),
    'HH': () => d.getHours().toString().padStart(2, '0'),
    'mm': () => d.getMinutes().toString().padStart(2, '0'),
    'ss': () => d.getSeconds().toString().padStart(2, '0'),
    'PPP': () => `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`
  };

  let result = formatStr;
  for (const [pattern, replacer] of Object.entries(formatMap)) {
    result = result.replace(pattern, replacer());
  }
  
  return result;
};

export const parseISO = (dateString: string): Date => {
  return new Date(dateString);
};

export const addDays = (date: Date | number, amount: number): Date => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + amount);
  return newDate;
};

export const subDays = (date: Date | number, amount: number): Date => {
  return addDays(date, -amount);
};

export const isAfter = (date: Date | number, dateToCompare: Date | number): boolean => {
  return new Date(date).getTime() > new Date(dateToCompare).getTime();
};

export const isBefore = (date: Date | number, dateToCompare: Date | number): boolean => {
  return new Date(date).getTime() < new Date(dateToCompare).getTime();
};

export const isSameDay = (date: Date | number, dateToCompare: Date | number): boolean => {
  const d1 = new Date(date);
  const d2 = new Date(dateToCompare);
  return (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  );
};

export const differenceInDays = (dateLeft: Date | number, dateRight: Date | number): number => {
  const d1 = new Date(dateLeft);
  const d2 = new Date(dateRight);
  const diffTime = Math.abs(d1.getTime() - d2.getTime());
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};

export const startOfDay = (date: Date | number): Date => {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
};

export const endOfDay = (date: Date | number): Date => {
  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
};

export const formatDistance = (date: Date | number, baseDate: Date | number): string => {
  const milliseconds = new Date(date).getTime() - new Date(baseDate).getTime();
  const seconds = Math.abs(Math.floor(milliseconds / 1000));
  
  if (seconds < 60) return `${seconds} seconds`;
  
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
  
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''}`;
  
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days !== 1 ? 's' : ''}`;
  
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months !== 1 ? 's' : ''}`;
  
  const years = Math.floor(months / 12);
  return `${years} year${years !== 1 ? 's' : ''}`;
};

export const formatRelative = (date: Date | number, baseDate: Date | number): string => {
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const d = new Date(date);
  const bd = new Date(baseDate);
  
  if (isSameDay(d, bd)) return 'Today';
  
  const dayDiff = differenceInDays(d, bd);
  if (dayDiff === 1) return 'Tomorrow';
  if (dayDiff === -1) return 'Yesterday';
  if (dayDiff > -7 && dayDiff < 7) return dayNames[d.getDay()];
  
  return format(d, 'MM/dd/yyyy');
};

// Add more date-fns functions as needed
