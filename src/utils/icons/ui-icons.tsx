
import React from 'react';

// Basic icon component creator
const createIcon = (path: JSX.Element) => {
  return ({ size = 24, color = 'currentColor', strokeWidth = 2, ...rest }: {
    size?: number | string;
    color?: string;
    strokeWidth?: number;
    [key: string]: any;
  }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...rest}
      >
        {path}
      </svg>
    );
  };
};

// UI Icons
export const Search = createIcon(
  <path d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0 0 4.3 4.3" />
);

export const ChevronDown = createIcon(
  <path d="m6 9 6 6 6-6" />
);

export const ChevronUp = createIcon(
  <path d="m18 15-6-6-6 6" />
);

export const ChevronLeft = createIcon(
  <path d="m15 18-6-6 6-6" />
);

export const ChevronRight = createIcon(
  <path d="m9 18 6-6-6-6" />
);

export const Menu = createIcon(
  <path d="M3 12h18M3 6h18M3 18h18" />
);

export const X = createIcon(
  <path d="M18 6 6 18M6 6l12 12" />
);

export const Plus = createIcon(
  <path d="M12 5v14M5 12h14" />
);

export const Minus = createIcon(
  <path d="M5 12h14" />
);

export const ArrowLeft = createIcon(
  <path d="m10 19-7-7 7-7M3 12h18" />
);

export const Filter = createIcon(
  <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
);

export const Settings = createIcon(
  <>
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </>
);

export const Calendar = createIcon(
  <>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </>
);

export const CalendarIcon = Calendar;

export const MoreHorizontal = createIcon(
  <>
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
    <circle cx="5" cy="12" r="1" />
  </>
);

// ... Add more UI icons as needed
