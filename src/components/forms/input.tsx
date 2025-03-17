type InputProps = React.ComponentProps<"input"> & {
  label: string;
  error?: string;
};

export default function Input({ label, ...props }: InputProps) {
  return (
    <div className="grid grid-cols-1">
      <label className="mb-3 text-2xl" htmlFor={props.name}>
        {label}
      </label>
      <input
        className="text-2xl mb-3 border-2 border-gray-300 rounded-lg p-2"
        type={props.type}
        id={props.name}
        {...props}
      />
    </div>
  );
}
