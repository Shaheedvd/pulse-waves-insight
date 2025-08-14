import React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ValidatedButtonProps extends React.ComponentProps<typeof Button> {
  children: React.ReactNode;
  action?: string;
  confirmMessage?: string;
  requiresAuth?: boolean;
}

export const ValidatedButton: React.FC<ValidatedButtonProps> = ({
  children,
  onClick,
  action,
  confirmMessage,
  requiresAuth = false,
  disabled = false,
  ...props
}) => {
  const { toast } = useToast();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent default if button is disabled
    if (disabled) {
      e.preventDefault();
      return;
    }

    // Show confirmation if required
    if (confirmMessage && !window.confirm(confirmMessage)) {
      e.preventDefault();
      return;
    }

    // Show action feedback
    if (action) {
      toast({
        title: "Action Initiated",
        description: action,
      });
    }

    // Call original onClick handler
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Button
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </Button>
  );
};

// Hook to validate button functionality across the app
export const useButtonValidator = () => {
  const { toast } = useToast();

  const validateButton = (buttonElement: HTMLButtonElement) => {
    // Check if button has proper event handlers
    const hasClickHandler = buttonElement.onclick !== null || 
      buttonElement.getAttribute('onclick') !== null;
    
    const hasReactHandler = buttonElement.hasAttribute('data-react-event');

    if (!hasClickHandler && !hasReactHandler) {
      console.warn('Button found without click handler:', buttonElement);
      return false;
    }

    return true;
  };

  const validateAllButtons = () => {
    const buttons = document.querySelectorAll('button');
    let invalidButtons = 0;

    buttons.forEach((button) => {
      if (!validateButton(button)) {
        invalidButtons++;
      }
    });

    if (invalidButtons > 0) {
      toast({
        title: "Button Validation",
        description: `Found ${invalidButtons} buttons without proper handlers`,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Button Validation",
        description: "All buttons are properly configured",
      });
    }

    return invalidButtons === 0;
  };

  return { validateButton, validateAllButtons };
};