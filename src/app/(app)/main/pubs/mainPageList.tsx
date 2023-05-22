"use client";

import { useEffect, useState } from "react";

type PubProps = {
  id: string;
  name: string;
  overall_drink_rating: number;
  overall_food_rating: number;
  overall_rating: number;
  reviews: Reviews;
  visitors: Users;
}[];

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

type Users = {
  id: string;
  email: string;
  name: string;
}[];

export default function MainPageList() {
  const [allPubs, setAllPubs] = useState<PubProps>();

  async function getAllPubs() {
    const pubs = await fetch("/api/pubs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    setAllPubs(pubs);
  }

  useEffect(() => {
    getAllPubs();
  }, []);

  function calculateAverages(reviews: Reviews) {
    const totalReviews = reviews.length;
    const foodRatingSum = reviews.reduce(
      (sum, review) => sum + review.food_rating,
      0
    );
    const drinkRatingSum = reviews.reduce(
      (sum, review) => sum + review.drink_rating,
      0
    );
    const ratingSum = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageFoodRating = foodRatingSum / totalReviews;
    const averageDrinkRating = drinkRatingSum / totalReviews;
    const averageRating = ratingSum / totalReviews;
    return {
      averageFoodRating,
      averageDrinkRating,
      averageRating,
    };
  }

  return (
    <div className="h-full w-screen flex overflow-y-scroll flex-col justify-start items-center space-y-8 bg-slate-100">
      {allPubs &&
        allPubs.map((pub) => {
          const { averageFoodRating, averageDrinkRating, averageRating } =
            calculateAverages(pub.reviews);
          return (
            <div
              key={pub.id}
              className="w-[300px] h-full p-4 bg-white shadow-lg rounded grid grid-rows-7 space-y-3"
            >
              <div>{pub.name}</div>
              <div>Reviews: {pub.reviews.length}</div>
              <div>Visitors: {pub.visitors.length}</div>
              <div>Average Food Rating: {averageFoodRating}</div>
              <div>Average Drink Rating: {averageDrinkRating}</div>
              <div>Average Rating: {averageRating}</div>
            </div>
          );
        })}
    </div>
  );
}
