// This is a partial update just to fix the specific errors with formatDistanceToNow
// Import the formatDistanceToNow function with correct usage
import { formatDistanceToNow } from 'date-fns';

// ... keep existing code

// Replace the incorrect usage on line 47 with:
<p className="text-xs text-muted-foreground">
  {formatDistanceToNow(new Date(lead.createdAt))} ago
</p>

// ... keep existing code

// Replace the incorrect usage on line 133 with:
<p className="text-xs text-muted-foreground">
  {formatDistanceToNow(new Date(lead.lastActivity))} ago
</p>

// ... keep existing code
