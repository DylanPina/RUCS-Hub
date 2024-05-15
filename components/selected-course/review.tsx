import React from "react";

interface ReviewProps {
  title: string;
  semester: string;
  dateTime: string;
  ratings: {
    overallRating: number;
    difficulty: number;
    workload: number;
    textbook: number;
    lectures: number;
    professor: number;
    piazzaSupport: number;
  };
  description: string;
}

export default function Review({ title, semester, dateTime, ratings, description }: ReviewProps) {
  return (
    <div className="p-4 border rounded overflow-hidden-lg shadow w-9/12">
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="text-sm text-gray-600">
        {semester} • {new Date(dateTime).toLocaleString()}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 my-2">
        <p>Rating: {ratings.overallRating.toFixed(1)}</p>
        <p>Difficulty: {ratings.difficulty.toFixed(1)}</p>
        <p>Textbook: {ratings.textbook.toFixed(1)}</p>
        <p>Lectures: {ratings.lectures.toFixed(1)}</p>
        <p>Professor: {ratings.professor.toFixed(1)}</p>
        <p>Piazza Support: {ratings.piazzaSupport.toFixed(1)}</p>
        <p>Workload: {ratings.workload} hours per a week</p>
      </div>
      <p>{description}</p>
    </div>
  );
}
