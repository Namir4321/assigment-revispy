import React from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
const SubmitButton = ({ className, text, btnSize, variant }) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant={variant || "default"}
      disabled={pending}
      className={`capitalize ${className}`}
      size={btnSize || "default"}
    >
      {pending ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : text}
    </Button>
  );
};

export default SubmitButton;
