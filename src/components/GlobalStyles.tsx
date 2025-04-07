
import React from 'react';

// This component injects critical visibility styles globally
const GlobalStyles: React.FC = () => {
  React.useEffect(() => {
    // Create a style tag for high-priority visibility rules
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
      /* Critical visibility fixes */
      button, a, span, svg, p, h1, h2, h3, h4, h5, h6, label, div {
        visibility: visible !important;
        opacity: 1 !important;
      }
      
      /* Icon visibility */
      svg {
        color: currentColor !important;
        fill: currentColor !important;
        display: inline-block !important;
      }
      
      /* Button and link text visibility */
      button span, 
      a span, 
      nav span, 
      aside span,
      .sidebar-text,
      .visible {
        visibility: visible !important;
        opacity: 1 !important;
        display: inline !important;
      }
      
      /* Interactive elements */
      button, a, .btn, [role="button"] {
        display: inline-flex !important;
        align-items: center !important;
        gap: 0.5rem !important;
        visibility: visible !important;
        opacity: 1 !important;
      }
      
      /* Popover and dropdown visibility */
      .PopoverContent, 
      [role="dialog"],
      [role="listbox"],
      [role="menu"],
      .rdp,
      .rdp-months,
      .rdp-month,
      .rdp-table {
        z-index: 100 !important;
        pointer-events: auto !important;
        visibility: visible !important;
        opacity: 1 !important;
      }
    `;
    document.head.appendChild(styleTag);
    
    // Clean up function
    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);
  
  return null;
};

export default GlobalStyles;
