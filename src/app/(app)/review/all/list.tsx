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
      <div className="h-screen w-screen flex overflow-y-scroll flex-col justify-center items-center bg-slate-100">
        <h1>List</h1>
        {allReviews &&
          allReviews.map((review) => {
            return (
              <div
                key={review.id}
                className="w-[300px] h-[500px] p-6 bg-white shadow-lg rounded grid grid-rows-4"
              >
                <div>{review.pub}</div>
                <div>Food Rating: {review.food_rating}</div>
                <div>Drink Rating: {review.drink_rating}</div>
                <div>Overall Rating: {review.rating}</div>
                <div>Comments: {review.content}</div>
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
      <EditForm
        userId={userId}
        pubName={pubName}
        reviewId={revId}
        setEdit={setEdit}
      />
    );
  }
}
