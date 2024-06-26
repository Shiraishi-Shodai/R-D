import { ErrorMessage } from "@hookform/error-message";
import React from "react";

interface FormFieldProps {
  name: string;
  register: any;
  errors: any;
}

const FormField: React.FC<FormFieldProps> = ({ name, register, errors }) => {
  return (
    <div>
      <label htmlFor={name}>{name}</label>
      <input {...register(name)} />
      <p style={{ color: "red" }}>
        <ErrorMessage errors={errors} name={name} />
      </p>
    </div>
  );
};

export default FormField;
