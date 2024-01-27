import { titleCase } from "@/lib/utils";

export default async function Page({ params }: { params: { name: string } }) {
  const { name } = params;
  const [firstName, lastName] =
    name.split("-").length == 2 ? name.split("-") : [name, ""];

  return (
    <ul className="flex flex-col space-y-5">
      <li>First name: {titleCase(firstName)}</li>
      <li>Last name: {titleCase(lastName)}</li>
    </ul>
  );
}
