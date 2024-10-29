import React from "react";

interface LabelProps {
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}

export const Label: React.FC<LabelProps> = ({ htmlFor, children, required = false }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="block font-dosis font-bold text-base black"
    >
      {children}
      {required && <span className="text-red-500">*</span>}
    </label>
  );
};
