"use client";

import { Button } from "@/app/components/ui/button/button";
import ReviewCard from "../../../components/ui/reviewCard/reviewCard";
import { useEffect, useState } from "react";

type PubProps = {
  id: string;
  name: string;
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
  author: AuthorProps;
}[];

type AuthorProps = {
  name: string;
};

type Users = {
  id: string;
  email: string;
  name: string;
}[];

export default function MainPageList() {
  const [allPubs, setAllPubs] = useState<PubProps>();
  const [reviewClicked, setReviewClick] = useState(false);
  const [reviews, setReviews] = useState<Reviews>([]);
  const [selectedPubName, setSelectedPubName] = useState("");
  const [visitorsClicked, setVisitorsClick] = useState(false);

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
    const averageFoodRating = Math.floor(foodRatingSum / totalReviews);
    const averageDrinkRating = Math.floor(drinkRatingSum / totalReviews);
    const averageRating = Math.floor(ratingSum / totalReviews);
    return {
      averageFoodRating,
      averageDrinkRating,
      averageRating,
    };
  }

  const onClickReviews = (reviews: Reviews, name: string) => {
    setReviews(reviews);
    setSelectedPubName(name);
    setReviewClick(true);
  };

  if (reviewClicked && !visitorsClicked) {
    return (
      <div className="h-full w-screen flex overflow-y-scroll flex-col justify-start items-center space-y-8 bg-slate-100">
        <button
          onClick={() => setReviewClick(false)}
          className="text-red-500 hover:text-red-700 hover:underline"
        >
          Back
        </button>
        {reviews.map((review) => (
          <ReviewCard reviews={review} name={selectedPubName} />
        ))}
      </div>
    );
  } else if (!reviewClicked && visitorsClicked) {
    return (
      <>
        <h1>visitors here</h1>
        <button
          onClick={() => setVisitorsClick(false)}
          className="text-red-500 hover:text-red-700 hover:underline"
        >
          Back
        </button>
      </>
    );
  } else {
    return (
      <div className="h-full w-screen flex overflow-y-scroll flex-col justify-start items-center space-y-8 bg-slate-100">
        {allPubs &&
          allPubs.map((pub) => {
            const { averageFoodRating, averageDrinkRating, averageRating } =
              calculateAverages(pub.reviews);
            return (
              <div
                key={pub.id}
                className="w-[300px] h-full p-4 bg-white shadow-lg rounded grid grid-rows-6 space-y-3"
              >
                <div className="font-bold text-center">{pub.name}</div>
                <div className="grid grid-cols-2">
                  Average Food Rating:
                  <span className="font-light">
                    {isNaN(averageFoodRating)
                      ? "No reviews yet"
                      : averageFoodRating}
                  </span>
                </div>
                <div className="grid grid-cols-2">
                  Average Drink Rating:
                  <span className="font-light">
                    {isNaN(averageDrinkRating)
                      ? "No reviews yet"
                      : averageDrinkRating}
                  </span>
                </div>
                <div className="grid grid-cols-2">
                  Average Overall Rating:
                  <span className="font-light">
                    {isNaN(averageRating) ? "No reviews yet" : averageRating}
                  </span>
                </div>
                <Button
                  onClick={() => onClickReviews(pub.reviews, pub.name)}
                  className="grid grid-cols-2"
                >
                  Reviews:
                  <span className="font-light">{pub.reviews.length}</span>
                </Button>
                <Button
                  onClick={() => setVisitorsClick(true)}
                  className="grid grid-cols-2"
                >
                  Visitors:
                  <span className="font-light">{pub.visitors.length}</span>
                </Button>
              </div>
            );
          })}
      </div>
    );
  }
}
