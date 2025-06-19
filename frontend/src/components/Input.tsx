import type { ChangeEvent } from "react";

type InputProps = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

const Input = ({ onChange, placeholder = "Enter text..." }: InputProps) => {
  return (
    <input
      onChange={onChange}
      placeholder={placeholder}
      type="text"
      className="p-2  w-full rounded focus:outline-none  m-1"
    />
  );
};

export default Input;
