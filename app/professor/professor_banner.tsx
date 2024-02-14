import { Button } from "@/components/shadcn/ui/button";
import React from "react";
import ProfessorRatingChart from "./professor_rating_chart";
import { ProfessorPage } from "@/lib/definitions/professor";
import { titleCase } from "@/lib/utils";

interface Props {
  professor: ProfessorPage;
}

export default function ProfessorBanner({ professor }: Props) {
  const { firstName, lastName, overall, difficulty, reviews } = professor;
  const name = `${titleCase(firstName)} ${titleCase(lastName)}`;

  return (
    <div className="flex flex-row bg-primary-red outline outline-1 outline-primary-white rounded p-5">
      <div className="flex flex-col space-y-3 w-fit">
        <h1 className="text-4xl text-primary-black font-black">{name}</h1>
        <div className="flex flex-col space-y-1">
          <h3 className="text-lg text-primary-white">
            Overall: <span className="not-italic font-bold">{overall}</span>
            <span className="not-italic text-primary-white/50 text-xs">
              /10
            </span>
          </h3>
          <h3 className="text-lg text-primary-white">
            Difficulty:{" "}
            <span className="not-italic font-bold">{difficulty}</span>
            <span className="not-italic text-primary-white/50 text-xs">
              /10
            </span>
          </h3>
          <h3 className="text-lg text-primary-white">
            Total Reviews:{" "}
            <span className="not-italic font-bold">{reviews.length}</span>
          </h3>
        </div>
        <Button className="max-w-fit text-xs transition-all duration-150 hover:bg-primary-black hover:shadow-primary-black">
          Leave a Review
        </Button>
      </div>
      <div className="w-full h-56">
        <ProfessorRatingChart reviews={reviews} />
      </div>
    </div>
  );
}
