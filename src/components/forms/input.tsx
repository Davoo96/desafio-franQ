type InputProps = React.ComponentProps<"input"> & {
  label: string;
  error?: string;
};

export default function Input({ label, error, ...props }: InputProps) {
  return (
    <div>
      <label htmlFor={props.name}>{label}</label>
      <input type={props.type} id={props.name} {...props} />
      {error && <p>{error}</p>}
    </div>
  );
}
