import React from "react";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";

interface ButtonProps {
  isLoading: boolean;
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
}

const SubmitButton = ({ isLoading, className, children, type = "submit" }: ButtonProps) => {
  const cArray = React.Children.toArray(children);

  return (
    <Button type={type} size="lg" disabled={isLoading} className={className ?? "shad-primary-btn w-full"}>
      {isLoading ? (
        cArray.length === 1 ? (
          <Spinner />
        ) : (
          <>
            <Spinner />
            {cArray[1]}
          </>
        )
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
