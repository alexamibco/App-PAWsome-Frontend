import React, { forwardRef, InputHTMLAttributes } from "react";
import { Label } from "../../components";
import { UseFormRegisterReturn } from "react-hook-form";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder: string;
  name: string;
  type?: "text" | "email";
  registration?: Partial<UseFormRegisterReturn>;
  error?: string;
}

export const TextInput: React.FC<TextInputProps> = forwardRef<
  HTMLInputElement,
  TextInputProps
>(
  (
    {
      label,
      placeholder,
      name,
      type = "text",
      registration,
      error,
      ...customProps
    },
    ref
  ) => {
    return (
      <div className="md:w-[20rem] max-w-[20rem]">
        <Label htmlFor={name}>{label}</Label>
        <input
          className="font-dosis font-normal text-base placeholder:text-base w-full px-2 py-1 border-b outline-none focus:ring-0 focus:border-primary"
          ref={ref}
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          {...customProps}
          {...registration}
        />
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
    );
  }
);
