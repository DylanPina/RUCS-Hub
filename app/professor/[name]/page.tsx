import { queryProfessorByName } from "@/lib/data/professor";
import { ProfessorPage } from "@/lib/definitions/professor";
import { titleCase, kebabCaseToTitleCase } from "@/lib/utils";
import type { Metadata } from "next";
import ProfessorBanner from "../professor_banner";

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
    <div className="flex flex-col">
      <ProfessorBanner
        name={`${titleCase(professor.firstName)} ${titleCase(
          professor.lastName,
        )}`}
        professor={professor}
      />
    </div>
  );
}
