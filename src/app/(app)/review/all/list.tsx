"use client";

import { useEffect, useState } from "react";
import { Button } from "@/app/components/ui/button/button";
import { EditForm } from "./editForm";

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
  const [pubName, setPubName] = useState("");
  const [revId, setRevId] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);
  const [edit, setEdit] = useState(false);

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
        setAllReviews(res);
      });
  }

  function handleClickEdit(pub: string, id: string) {
    setPubName(pub);
    setRevId(id);
    setEdit(true);
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
  }, [isDeleted, edit]);

  if (!edit) {
    return (
      <div className="h-full w-screen flex overflow-y-scroll flex-col justify-start items-center space-y-8 bg-slate-100">
        {allReviews &&
          allReviews.map((review) => {
            return (
              <div
                key={review.id}
                className="w-[300px] h-full p-4 bg-white shadow-lg rounded grid grid-rows-7 space-y-3"
              >
                <div className="font-bold text-center">{review.pub}</div>
                <div className="grid grid-cols-2">
                  Food Rating:
                  <span className="font-light">{review.food_rating}</span>
                </div>
                <div className="grid grid-cols-2">
                  Drink Rating:
                  <span className="font-light">{review.drink_rating}</span>
                </div>
                <div className="grid grid-cols-2">
                  Overall Rating:
                  <span className="font-light">{review.rating}</span>
                </div>
                <div className="grid grid-row-2">
                  <div>Comments:</div>
                  <div className="font-light w-full h-[100px]">
                    {review.content}{" "}
                  </div>
                </div>
                <div className="w-full">
                  <Button
                    className="w-full"
                    size="sm"
                    onClick={() => handleClickEdit(review.pub, review.id)}
                  >
                    Edit Review
                  </Button>
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
      </div>
    );
  } else {
    return (
      <div className="flex flex-col justify-center items-center sm:shadow-xl pb-8 pt-12 sm:bg-white rounded-xl">
        <EditForm
          userId={userId}
          pubName={pubName}
          reviewId={revId}
          setEdit={setEdit}
        />
        <h1
          className="pb-10 text-red-500 hover:text-red-700 hover:underline"
          onClick={() => setEdit(false)}
        >
          Cancel
        </h1>
      </div>
    );
  }
}
