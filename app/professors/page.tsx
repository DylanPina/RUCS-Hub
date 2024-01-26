import ProfessorListingHeader from "@/components/professor-table/professor_listing_header";
import ProfessorTable from "@/components/professor-table/professor_table";

export default async function Page() {
  return (
    <div className="flex flex-col place-items-center justify-center space-y-2">
      <ProfessorListingHeader />
      <ProfessorTable data={[]} />
    </div>
  );
}
