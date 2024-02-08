import { queryProfessorByName } from "@/lib/data/professor";
import { ProfessorPage } from "@/lib/definitions/professor";
import { titleCase, kebabCaseToTitleCase } from "@/lib/utils";
import type { Metadata } from "next";

type Props = {
  params: { name: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: kebabCaseToTitleCase(params.name),
  };
}

export default async function Page({ params }: Props) {
  const { name } = params;
  const [firstName, lastName] =
    name.split("-").length == 2 ? name.split("-") : ["", name];

  const professor: ProfessorPage = await queryProfessorByName(
    firstName.toUpperCase() ?? "",
    lastName.toUpperCase(),
  );

  return (
    <div className="flex flex-col space-y-5">
      <div className="flex space-x-2">
        <h3 className="font-bold">First name:</h3>{" "}
        <span>{titleCase(professor?.firstName ?? "")}</span>
      </div>
      <div className="flex space-x-2">
        <h3 className="font-bold">Last name:</h3>{" "}
        <span>{titleCase(professor.lastName)}</span>
      </div>
      <div className="flex space-x-2">
        <h3 className="font-bold">Overall:</h3>{" "}
        <span>{professor.overall !== -1 ? professor.overall : "?"}</span>
      </div>
      <div className="flex space-x-2">
        <h3 className="font-bold">Difficulty:</h3>
        <span>{professor.difficulty !== -1 ? professor.difficulty : "?"}</span>
      </div>
      <h2 className="font-bold">Reviews:</h2>
      {professor.reviews.length !== 0 ? (
        <ul className="ml-10 flex flex-col space-y-5">
          {professor.reviews.map((review: any) => (
            <li key={review.id}>{review.content}</li>
          ))}
        </ul>
      ) : (
        <span className="ml-10">No reviews found</span>
      )}
    </div>
  );
}
