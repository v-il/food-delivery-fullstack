
const Input = ({ value, onChange, placeholder, className, onBlur, type }) => {
  const classes = className
    ? `p-2.5 rounded-xl border-2 ${className}`
    : "p-2.5 rounded-xl border-2";

  return (
    <input
      className={classes}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      onBlur={onBlur}
      type={type}
    />
  );
};

export default Input;
