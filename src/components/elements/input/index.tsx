import { HTMLAttributes } from "react";

interface IInputProps extends HTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = ({ label, ...rest }: IInputProps) => {
  return (
    <>
      <label htmlFor="" className="mr-2">
        {label}
      </label>
      <input {...rest} className="p-3 text-black border-2 rounded-md" />
    </>
  );
};

export default Input;
