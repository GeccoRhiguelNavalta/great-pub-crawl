"use client";

import { useSession } from "next-auth/react";
import Layout from "../../components/ui/layout/layout";
import { LogoutButton } from "@/app/auth";
import { useEffect, useState } from "react";
import { User } from "@prisma/client";
import { Button } from "../../components/ui/button/button";
import Link from "next/link";

function User() {
  const { data: session }: any = useSession();
  const userId = session?.user?.id;
  const [userDetails, setUserDetails] = useState<User[]>([]);

  async function getUser() {
    const res = await fetch(`/api/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((data) => data.json());
    if (res) {
      const data = [...userDetails, res];
      setUserDetails(data);
    }
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-slate-100">
      <div className="flex flex-col justify-center items-center sm:shadow-xl pb-8 pt-12 sm:bg-white rounded-xl space-y-8">
        {!userDetails ? (
          <div>Loading..</div>
        ) : (
          userDetails.map((user) => {
            return (
              <div key={user.id}>
                <div>{user.email}</div>
                <div>{user.name}</div>
              </div>
            );
          })
        )}
        <div className="w-full">
          <LogoutButton />
        </div>
        <div className="w-full">
          <Link href="/user/edit">
            <Button
              className="w-full"
              size="sm"
              onClick={() => console.log("edit")}
            >
              Edit
            </Button>
          </Link>
        </div>
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
