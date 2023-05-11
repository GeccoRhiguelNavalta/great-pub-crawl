"use client";

import { useSession } from "next-auth/react";
import Layout from "../../../../components/ui/layout/layout";
import { LoginButton, LogoutButton } from "@/app/auth";

function User() {
  const { data: session } = useSession();
  return (
    <div className="flex overflow-scroll p-5">
      <LoginButton />
      <LogoutButton />
      <div>User</div>
    </div>
  );
}

export default function () {
  return (
    <Layout>
      <User />
    </Layout>
  );
}
