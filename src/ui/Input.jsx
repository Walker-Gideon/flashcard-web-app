export default function Input({
  classname,
  required,
  type,
  name,
  placeholder,
  value,
  onChange,
}) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`input ${classname}`}
      required={required ? required : false}
    />
  );
}
