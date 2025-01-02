import { type FunctionComponent } from "react";

export const LoadingSpinner: FunctionComponent = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-6 w-6 border-4 border-muted-foreground border-t-primary-foreground" />
    </div>
  );
};
