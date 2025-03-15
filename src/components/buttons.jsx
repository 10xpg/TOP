export const Button = function ({ text, type, onClick }) {
  return (
    <button type={type} onClick={onClick}>
      {text}
    </button>
  );
};
