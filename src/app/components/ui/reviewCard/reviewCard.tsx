"use client";

type ReviewProps = {
  id: string;
  content: string;
  food_rating: number;
  drink_rating: number;
  rating: number;
  pub: string;
  pubId: string;
  authorId: string;
  author: AuthorProps;
};

type AuthorProps = {
  name: string;
};

export default function ReviewCard({
  reviews,
  name,
}: {
  reviews: ReviewProps;
  name: string;
}) {
  return (
    <div className="w-[300px] h-full p-4 bg-white shadow-lg rounded grid grid-rows-6 space-y-3">
      <div className="font-bold text-center">{name}</div>
      <div className="font-bold text-center">{reviews.pub}</div>
      <div className="grid grid-cols-2">
        Food Rating:
        <span className="font-light">{reviews.food_rating}</span>
      </div>
      <div className="grid grid-cols-2">
        Drink Rating:
        <span className="font-light">{reviews.drink_rating}</span>
      </div>
      <div className="grid grid-cols-2">
        Overall Rating:
        <span className="font-light">{reviews.rating}</span>
      </div>
      <div className="grid grid-cols-2">
        Rating by:
        <span className="font-light">{reviews.author.name}</span>
      </div>
      <div className="grid grid-row-2">
        <div>Comments:</div>
        <div className="font-light w-full h-[100px]">{reviews.content} </div>
      </div>
    </div>
  );
}
