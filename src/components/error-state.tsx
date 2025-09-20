import { AlertCircleIcon, Loader2Icon } from "lucide-react";

interface ErrorStateProps {
  title: string;
  description: string;
}

export const ErrorState = ({ title, description }: ErrorStateProps) => {
  return (
    <div className="flex items-center justify-center flex-1 px-8 py-4">
      <div className="flex flex-col items-center justify-center p-10 rounded-lg shadow-sm gap-y-6 bg-background">
        <AlertCircleIcon className="text-red-500 size-6" />
        <div className="flex flex-col text-center gap-y-2">
          <h6 className="text-lg font-medium">{title}</h6>
          <p className="text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};
