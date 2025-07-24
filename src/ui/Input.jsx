export default function Input({
  classname,
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
      className={`input ${classname}`}
      required={required ? required : false}
    />
  );
}
