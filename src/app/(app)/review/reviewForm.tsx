"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../../../../components/ui/button/button";
import { Input } from "../../../../components/ui/input/input";
import { Label } from "../../../../components/ui/label/label";
import { Alert } from "../../../../components/ui/alert/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select/select";

type PubProps = {
  date: Date;
  id: string;
  name: string;
  overall_drink_rating: number;
  overall_food_rating: number;
  overall_rating: number;
}[];

export const ReviewForm = ({ userId }: { userId: string | undefined }) => {
  const [pubName, setPubName] = useState("");
  const [existingPubNames, setExistingPubNames] = useState<PubProps>([]);
  const [foodRating, setFoodRating] = useState(0);
  const [drinkRating, setDrinkRating] = useState(0);
  const [overallRating, setOverallRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/pubs")
      .then((res) => res.json())
      .then((data) => {
        setExistingPubNames(data);
      });
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    console.log("added!");
    try {
      const res = await fetch(`/api/user/${userId}/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: pubName,
          food_rating: foodRating,
          drink_rating: drinkRating,
          rating: overallRating,
          content: comment,
        }),
      });
      if (res.ok) {
        setPubName("");
        setFoodRating(0);
        setDrinkRating(0);
        setOverallRating(0);
        setComment("");
      } else {
        setError((await res.json()).error);
      }
    } catch (error: any) {
      setError(error?.message);
    }
  };

  const onEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("edited!");
  };
  return (
    <form onSubmit={onSubmit} className="p-12 space-y-10 w-full sm:w-[400px]">
      <div className="grid w-full items-center gap-1.5">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Existing Pub Names" />
          </SelectTrigger>
          <SelectContent>
            {existingPubNames.map((pubs) => {
              return (
                <SelectItem key={pubs.id} value={pubs.name}>
                  {pubs.name}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <h1>- or -</h1>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="pubName">Pub Name</Label>
        <Input
          value={pubName}
          onChange={(e) => setPubName(e.target.value)}
          id="name"
          type="name"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="foodRating">Food Rating</Label>
        <Input
          required
          value={foodRating}
          onChange={(e) => setFoodRating(Number(e.target.value))}
          id="name"
          type="name"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="drinkRating">Drink Rating</Label>
        <Input
          required
          value={drinkRating}
          onChange={(e) => setDrinkRating(Number(e.target.value))}
          id="name"
          type="name"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="overallRating">Overall Rating</Label>
        <Input
          required
          value={overallRating}
          onChange={(e) => setOverallRating(Number(e.target.value))}
          id="name"
          type="name"
        />
      </div>
      {error && <Alert>{error}</Alert>}
      <div className="w-full">
        <Button className="w-full" size="sm" onClick={onSubmit}>
          Add Review
        </Button>
      </div>
      <div className="w-full">
        <Button className="w-full" size="sm" onClick={onEdit}>
          Edit Review
        </Button>
      </div>
    </form>
  );
};
