import React from "react";
import { Loader2, LucideIcon } from "lucide-react";
import { Button, ButtonProps } from "./button";

type LoaderButtonProps = ButtonProps & {
  isLoading?: boolean;
  icon?: LucideIcon;
  children: React.ReactNode;
};

export const LoaderButton = React.forwardRef<
  HTMLButtonElement,
  LoaderButtonProps
>(({ className, isLoading, icon: Icon, children }, ref) => {
  if (isLoading) {
    return (
      <Button className={className} ref={ref} disabled={isLoading}>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        {children}
      </Button>
    );
  }

  return (
    <Button className={className} ref={ref} disabled={isLoading}>
      {Icon ? (
        <>
          <Icon size={18} className="mr-3" />
          {children}
        </>
      ) : (
        children
      )}
    </Button>
  );
});
LoaderButton.displayName = "LoaderButton";
