export default function Input({
  className,
  required,
  type,
  name,
  placeholder,
}) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className={`input ${className}`}
      required={required ? required : false}
    />
  );
}
