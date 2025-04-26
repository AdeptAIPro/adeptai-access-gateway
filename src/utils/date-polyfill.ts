
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
