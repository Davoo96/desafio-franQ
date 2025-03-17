export default function FormMessage({
  message,
  isError,
}: {
  message: string;
  isError: boolean;
}) {
  if (!message) return null;
  return (
    <p className={`${isError ? "text-red-500" : "text-green-500"} my-3`}>
      {message}
    </p>
  );
}
