import ProfessorListingHeader from "@/components/professor-table/professor_listing_header";
import ProfessorTable from "@/components/professor-table/professor_table";
import { fetchProfessorNames } from "@/lib/data/professor";

export default async function Page() {
  console.log(JSON.stringify(await fetchProfessorNames(), null, 2));

  return (
    <div className="flex flex-col place-items-center justify-center space-y-2">
      <ProfessorListingHeader />
      <ProfessorTable data={[]} />
    </div>
  );
}
