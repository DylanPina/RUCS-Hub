import React from "react";

interface Props {
  title: string;
  rating: number;
}

export default function ProfessorRatingCard({ title, rating }: Props) {
  return (
    <div className="flex flex-col p-3 rounded outline outline-1 outline-primary-white">
      <h1>{title}</h1>
      <h2>{rating}</h2>
    </div>
  );
}
