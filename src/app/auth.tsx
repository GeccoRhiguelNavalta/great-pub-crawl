"use client";

import { signOut } from "next-auth/react";
import { Button } from "./components/ui/button/button";

export const LogoutButton = () => {
  return (
    <Button
      onClick={() => signOut()}
      className="text-red-500 hover:text-red-700 w-full"
    >
      Sign Out
    </Button>
  );
};
