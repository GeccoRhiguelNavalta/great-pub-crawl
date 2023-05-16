"use client";

import { useSession } from "next-auth/react";
import Layout from "../../../../components/ui/layout/layout";
import { LogoutButton } from "@/app/auth";
import { useEffect, useState } from "react";
import { User } from "@prisma/client";
import { Button } from "../../../../components/ui/button/button";
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

  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="flex overflow-scroll p-5">
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
        <Button
          className="w-full"
          size="sm"
          onClick={() => console.log("edit")}
        >
          <LogoutButton />
        </Button>
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
  );
}

export default function WrapUser() {
  return (
    <Layout>
      <User />
    </Layout>
  );
}
