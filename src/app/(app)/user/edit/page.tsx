"use client";

import { Label } from "@/app/components/ui/label/label";
import Layout from "../../../components/ui/layout/layout";
import { Input } from "@/app/components/ui/input/input";
import { useState } from "react";
import { Alert } from "@/app/components/ui/alert/alert";
import { Button } from "@/app/components/ui/button/button";
import { useSession } from "next-auth/react";
import Link from "next/link";

function EditUser() {
  const { data: session }: any = useSession();
  const userId: string = session?.user.id;
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
      setError("Please fill out all fields.");
      return;
    }
    try {
      const res = await fetch(`/api/user`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          name: name,
          email: email,
          password: password,
        }),
      });
      if (res.ok) {
        setName("");
        setEmail("");
        setPassword("");
        setError("Now Sign out and Sign in again");
      } else {
        setError((await res.json()).error);
      }
    } catch (error: any) {
      setError(error?.message);
    }
  };

  return (
    <div className="h-[580px] md:h-[600px] lg:h-[750px] w-full flex flex-col p-3 justify-center overflow-y-scroll space-y-3 items-center bg-slate-100">
      <form onSubmit={onSubmit} className="p-12 space-y-10 w-full sm:w-[400px]">
        <div className="grid w-full items-center gap-1.5">
          <h1 className="text-center font-bold">Edit Your Details</h1>
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            type="name"
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            type="email"
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            type="password"
          />
        </div>

        {error && <Alert>{error}</Alert>}
        <div className="w-full">
          <Button className="w-full" size="sm" onClick={onSubmit}>
            Edit Details
          </Button>
        </div>
      </form>
      <Link href="/user">
        <h1 className="text-red-500 hover:text-red-700 hover:underline">
          Back
        </h1>
      </Link>
    </div>
  );
}

export default async function WrapEditUser() {
  return (
    <Layout>
      <EditUser />
    </Layout>
  );
}
