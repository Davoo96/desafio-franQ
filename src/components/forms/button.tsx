export default function Button({
  children,
  ...props
}: {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props}>{children}</button>;
}
