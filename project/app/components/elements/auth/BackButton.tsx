import Link from "next/link";
import React from "react";

interface BackButtonProps {
  message: string;
  href: string;
}

const BackButton: React.FC<BackButtonProps> = ({ message, href }) => {
  return (
    <button>
      <Link href={href}>{message}</Link>
    </button>
  );
};

export default BackButton;
