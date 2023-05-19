"use client";

import React, { useState } from "react";
import { Label } from "../../../components/ui/label/label";
import { Input } from "../../../components/ui/input/input";
import { Alert } from "../../../components/ui/alert/alert";
import { Button } from "../../../components/ui/button/button";

export const PubForm = () => {
  const [pubName, setPubName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/pubs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: pubName,
        }),
      });
      if (res.ok) {
        setPubName("");
      } else {
        setError((await res.json()).error);
      }
    } catch (error: any) {
      setError(error?.message);
    }
  };

  return (
    <form onSubmit={onSubmit} className="p-12 space-y-10 w-full sm:w-[400px]">
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="pubName">Pub Name</Label>
        <Input
          value={pubName}
          onChange={(e) => setPubName(e.target.value)}
          id="name"
          type="name"
        />
      </div>
      {error && <Alert>{error}</Alert>}
      <div className="w-full">
        <Button className="w-full" size="sm" onClick={onSubmit}>
          Add Pub
        </Button>
      </div>
    </form>
  );
};
