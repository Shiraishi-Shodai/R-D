import React from "react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface FormErrorProps {
  message?: string;
}
const FormError: React.FC<FormErrorProps> = ({ message }) => {
  if (!message) {
    return null;
  }
  return (
    <div>
      <ExclamationTriangleIcon />
      <p style={{ color: "red" }}>{message}</p>
    </div>
  );
};

export default FormError;
