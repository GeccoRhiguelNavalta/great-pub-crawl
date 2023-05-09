import React from "react";

type AlertProps = {
  children: React.ReactNode;
};

const Alert = ({ children }: AlertProps) => {
  return <div className="p-2 border rounder bg-red-200">{children}</div>;
};
export { Alert };
