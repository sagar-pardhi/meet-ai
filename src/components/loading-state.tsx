import { Loader2Icon } from "lucide-react";

interface LoadingStateProps {
  title: string;
  description: string;
}

export const LoadingState = ({ title, description }: LoadingStateProps) => {
  return (
    <div className="flex items-center justify-center flex-1 px-8 py-4">
      <div className="flex flex-col items-center justify-center p-10 rounded-lg shadow-sm gap-y-6 bg-background">
        <Loader2Icon className="size-6 animate-spin text-primary" />
        <div className="flex flex-col text-center gap-y-2">
          <h6 className="text-lg font-medium">{title}</h6>
          <p className="text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};
