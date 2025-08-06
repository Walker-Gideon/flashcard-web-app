export default function Input({
  classname,
  required,
  type,
  name,
  placeholder,
  value,
  onChange,
  id,
  disabled,
}) {
  if (id)
    return (
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={classname}
        required={required ? required : false}
        disabled={disabled}
      />
    );

  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`input ${classname}`}
      required={required ? required : false}
      disabled={disabled}
    />
  );
}
