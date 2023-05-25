"use client";

import { useSession } from "next-auth/react";
import Layout from "../../components/ui/layout/layout";
import { LogoutButton } from "@/app/auth";
import { Button } from "../../components/ui/button/button";
import Link from "next/link";

type Session = {
  user: SessionUser;
};

type SessionUser = {
  name: string;
  email: string;
  id: string;
};

function User() {
  const { data: session }: any = useSession();
  const user: Session = session;

  return (
    <div className="h-[580px] md:h-[600px] lg:h-[750px] w-full flex flex-col p-3 justify-center overflow-y-scroll space-y-6 items-center bg-slate-100">
      <div className="w-[300px] h-full p-4 sm:bg-white sm:shadow-lg rounded grid grid-row-5 space-y-4 place-content-center place-items-center ">
        <div className="font-bold text-center">User Details</div>
        <h1 className="font-semibold text-center">Hey {user?.user.name}!</h1>
        <div className="w-[200px]">
          Email:
          <span className="font-light pl-2">{user?.user.email}</span>
        </div>
        <Link href="/user/edit">
          <Button className="w-[200px] flex justify-center items-center">
            Edit
          </Button>
        </Link>
        <LogoutButton />
      </div>
    </div>
  );
}

export default function WrapUser() {
  return (
    <Layout>
      <User />
    </Layout>
  );
}
