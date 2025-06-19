import type { ChangeEvent } from "react";

type InputProps = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value: string;
  
};

const Input = ({ onChange, placeholder = "Enter text...", value }: InputProps) => {
  return (
    <input
    value={value}
      onChange={onChange}
      placeholder={placeholder}
      type="text"
      className="px-2 py-0.5  w-full rounded focus:outline-none  m-1"
    />
  );
};

export default Input;
