import { Container } from "./Container";

type Props = {
  title?: string;
  hidden?: boolean;
  children: React.ReactNode;
  className?: string;
};

export const Section = ({ title, hidden, className, children }: Props) => {
  if (hidden) {
    return null;
  }

  return (
    <Container className={className}>
      {title ? <h1 className="text-2xl px-3 py-2 font-bold">{title}</h1> : ""}
      {children}
    </Container>
  );
};
