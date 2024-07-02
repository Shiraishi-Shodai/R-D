import { ErrorMessage } from "@hookform/error-message";
import React from "react";

interface FormFieldProps {
  name: string;
  register: any;
  errors: any;
  isPending: boolean;
  placeholder: string;
  type: string;
}

const FormField: React.FC<FormFieldProps> = ({
  name,
  register,
  errors,
  isPending,
  placeholder,
  type,
}) => {
  return (
    <div>
      <label htmlFor={name}>{name}</label>
      <input
        {...register(name)}
        disabled={isPending}
        placeholder={placeholder}
        type={type}
      />
      <p style={{ color: "red" }}>
        <ErrorMessage errors={errors} name={name} />
      </p>
    </div>
  );
};

export default FormField;
