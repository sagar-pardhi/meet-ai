import Image from "next/image";

interface EmptyStateProps {
  title: string;
  description: string;
  image?: string;
}

export const EmptyState = ({
  title,
  description,
  image = "/empty.svg",
}: EmptyStateProps) => {
  return (
    <div className="flex items-center justify-center flex-col">
      <Image src="/empty.svg" alt="Empty" width={240} height={240} />
      <div className="flex flex-col text-center gap-y-6 max-w-md mx-auto">
        <h6 className="text-lg font-medium">{title}</h6>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};
