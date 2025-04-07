
import React from 'react';

// This component doesn't render anything visible
// It just injects important styles to ensure visibility of elements
const GlobalStyles: React.FC = () => {
  React.useEffect(() => {
    // Force visibility on all important elements
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
      button, a, span, svg, p, h1, h2, h3, h4, h5, h6 {
        visibility: visible !important;
        opacity: 1 !important;
        display: inline-block !important;
      }
      
      svg {
        color: currentColor !important;
        fill: currentColor !important;
      }
      
      button span, a span, nav span, aside span {
        display: inline !important;
        visibility: visible !important;
      }
      
      .PopoverContent, 
      [role="dialog"],
      [role="listbox"],
      [role="menu"] {
        z-index: 100 !important;
        pointer-events: auto !important;
      }
    `;
    document.head.appendChild(styleTag);
    
    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);
  
  return null;
};

export default GlobalStyles;
