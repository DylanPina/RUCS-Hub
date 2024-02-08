import { queryProfessorByName } from "@/lib/data/professor";
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

  const professor = await queryProfessorByName(
    firstName.toUpperCase() ?? "",
    lastName.toUpperCase(),
  );

  return (
    <ul className="flex flex-col space-y-5">
      <li>First name: {titleCase(professor?.firstName ?? "")}</li>
      <li>Last name: {titleCase(professor?.lastName ?? "")}</li>
    </ul>
  );
}
