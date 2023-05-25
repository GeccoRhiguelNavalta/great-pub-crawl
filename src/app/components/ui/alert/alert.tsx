import React from "react";

type AlertProps = {
  children: React.ReactNode;
};

const Alert = ({ children }: AlertProps) => {
  return (
    <div className="p-2 border rounder flex bg-red-200 justify-center items-center">
      {children}
    </div>
  );
};
export { Alert };
