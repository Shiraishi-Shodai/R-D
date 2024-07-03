import React from "react";
import { CheckCircledIcon } from "@radix-ui/react-icons";

interface FormSuccessProps {
  message?: string;
}
const FormSuccess: React.FC<FormSuccessProps> = ({ message }) => {
  if (!message) {
    return null;
  }
  return (
    <div>
      <CheckCircledIcon />
      <p style={{ color: "green" }}>{message}</p>
    </div>
  );
};

export default FormSuccess;
