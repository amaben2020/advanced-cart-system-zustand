import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
interface IInputProps extends HTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
}

const Input = ({ label, className, ...rest }: IInputProps) => {
  return (
    <>
      <label htmlFor="" className="mr-2">
        {label}
      </label>
      <input
        {...rest}
        className={twMerge(className, "p-3 text-black border-2 rounded-md")}
      />
    </>
  );
};

export default Input;
