import { cn } from "../utils";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export const Container = ({ children, className }: Props) => {
  return (
    <div className={cn("px-6 py-3 max-w-screen-xl  mx-auto", className)}>
      {children}
    </div>
  );
};
