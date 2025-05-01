export const Input = function ({ htmlFor, type, id, label, value, onChange }) {
  return (
    <span>
      <label htmlFor={htmlFor}>{label}</label>
      <input type={type} id={id} value={value} onChange={onChange} />
    </span>
  );
};

export const TextArea = function ({ htmlFor, id, label, value, onChange }) {
  return (
    <span>
      <label htmlFor={htmlFor}>{label}</label>
      <textarea id={id} value={value} onChange={onChange}></textarea>
    </span>
  );
};
