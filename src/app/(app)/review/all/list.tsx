"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/app/components/ui/button/button";

type Reviews = {
  id: string;
  content: string;
  food_rating: number;
  drink_rating: number;
  rating: number;
  pub: string;
  pubId: string;
  authorId: string;
  name: string;
}[];

export default function List({ userId }: { userId: string }) {
  const [allReviews, setAllReviews] = useState<Reviews | undefined>();
  const [isDeleted, setIsDeleted] = useState(false);

  async function getAllReviews() {
    setIsDeleted(false);
    return await (
      await fetch(`/api/user/${userId}/review`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
    )
      .json()
      .then((res) => {
        console.log(res);
        setAllReviews(res);
      });
  }
  async function handleClick(reviewId: string) {
    const usId = userId;
    const res = await fetch(`/api/user/${usId}/review/${reviewId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((deleted) => deleted.json());
    setIsDeleted(true);
    return res;
  }

  useEffect(() => {
    getAllReviews();
  }, [isDeleted]);

  return (
    <>
      <h1>List</h1>
      {allReviews &&
        allReviews.map((review) => {
          return (
            <div
              key={review.id}
              className="w-[300px] h-[500px] overflow-y-scroll p-6 bg-white shadow-lg rounded grid grid-rows-4"
            >
              <div>{review.pub}</div>
              <div>Food Rating: {review.food_rating}</div>
              <div>Drink Rating: {review.drink_rating}</div>
              <div>Overall Rating: {review.rating}</div>
              <div>Comments: {review.content}</div>
              <div className="w-full">
                <Link href="/review/edit">
                  <Button className="w-full" size="sm">
                    Edit Review
                  </Button>
                </Link>
              </div>{" "}
              <div className="w-full">
                <Button
                  className="w-full"
                  size="sm"
                  onClick={() => handleClick(review.id)}
                >
                  Delete Review
                </Button>
              </div>{" "}
            </div>
          );
        })}
    </>
  );
}
