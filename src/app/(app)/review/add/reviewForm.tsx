"use client";

import React, { FormEventHandler, useEffect, useState } from "react";
import { Button } from "../../../components/ui/button/button";
import { Input } from "../../../components/ui/input/input";
import { Label } from "../../../components/ui/label/label";
import { Alert } from "../../../components/ui/alert/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select/select";
import { Textarea } from "../../../components/ui/textarea/textarea";

type PubProps = {
  date: Date;
  id: string;
  name: string;
  overall_drink_rating: number;
  overall_food_rating: number;
  overall_rating: number;
}[];

export const AddReviewForm = ({ userId }: { userId: string | undefined }) => {
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
    e.preventDefault();
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

  return (
    <form onSubmit={onSubmit} className="p-12 space-y-10 w-full sm:w-[400px]">
      <div className="grid w-full items-center gap-1.5">
        <Label>Pub</Label>
        <Select onValueChange={(name) => setPubName(name)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Pick a Pub" />
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
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="foodRating">Food Rating</Label>
        <Input
          required
          value={foodRating}
          onChange={(e) =>
            setFoodRating(Math.min(10, Math.max(0, Number(e.target.value))))
          }
          id="foodRating"
          type="foodRating"
          min="0"
          max="10"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="drinkRating">Drink Rating</Label>
        <Input
          required
          value={drinkRating}
          onChange={(e) =>
            setDrinkRating(Math.min(10, Math.max(0, Number(e.target.value))))
          }
          id="drinkRating"
          type="drinkRating"
          min="0"
          max="10"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="overallRating">Overall Rating</Label>
        <Input
          required
          value={overallRating}
          onChange={(e) =>
            setOverallRating(Math.min(10, Math.max(0, Number(e.target.value))))
          }
          id="overallRating"
          type="overallRating"
          min="0"
          max="10"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="comment">Comments</Label>
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          id="comment"
        />
      </div>
      {error && <Alert>{error}</Alert>}
      <div className="w-full">
        <Button className="w-full" size="sm" onClick={onSubmit}>
          Add Review
        </Button>
      </div>
    </form>
  );
};
