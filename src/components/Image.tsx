import { cn } from "../utils";

type Props = {
  src: string;
  className?: string;
  alt: string;
};

export const Image = ({ src, className, alt }: Props) => {
  return (
    <div
      className={cn(
        "bg-primary h-full w-full rounded-lg overflow-hidden",
        className
      )}
    >
      <img
        src={src}
        alt={alt}
        className={cn("min-h-[200px] w-full h-full object-cover")}
      ></img>
    </div>
  );
};
