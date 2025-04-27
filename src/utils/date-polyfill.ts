
export function formatDistanceToNow(date: Date, options?: { addSuffix?: boolean }): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  
  // Convert to seconds
  const diffSec = Math.floor(diffMs / 1000);
  
  if (diffSec < 60) {
    const output = 'less than a minute';
    return options?.addSuffix ? `${output} ago` : output;
  }
  
  // Convert to minutes
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) {
    const output = diffMin === 1 ? '1 minute' : `${diffMin} minutes`;
    return options?.addSuffix ? `${output} ago` : output;
  }
  
  // Convert to hours
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) {
    const output = diffHours === 1 ? '1 hour' : `${diffHours} hours`;
    return options?.addSuffix ? `${output} ago` : output;
  }
  
  // Convert to days
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) {
    const output = diffDays === 1 ? '1 day' : `${diffDays} days`;
    return options?.addSuffix ? `${output} ago` : output;
  }
  
  // Convert to months
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) {
    const output = diffMonths === 1 ? '1 month' : `${diffMonths} months`;
    return options?.addSuffix ? `${output} ago` : output;
  }
  
  // Convert to years
  const diffYears = Math.floor(diffMonths / 12);
  const output = diffYears === 1 ? '1 year' : `${diffYears} years`;
  return options?.addSuffix ? `${output} ago` : output;
}

export function format(date: Date, formatString: string): string {
  // Simple implementation of format function for the most commonly used patterns
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const shortMonthNames = monthNames.map(m => m.substring(0, 3));

  switch (formatString) {
    case 'MM/dd/yyyy':
      return `${month}/${day}/${year}`;
    case 'yyyy-MM-dd':
      return `${year}-${month}-${day}`;
    case 'MMM dd, yyyy':
      return `${shortMonthNames[date.getMonth()]} ${day}, ${year}`;
    case 'MMMM dd, yyyy':
      return `${monthNames[date.getMonth()]} ${day}, ${year}`;
    case 'PPP':
      return `${monthNames[date.getMonth()]} ${day}, ${year}`;
    default:
      return `${month}/${day}/${year}`;
  }
}
