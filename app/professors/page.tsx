import ProfessorListingHeader from "@/components/professor-table/professor_listing_header";
import ProfessorTable from "@/components/professor-table/professor_table";
import {
  fetchProfessorTableData,
  queryProfessorTableData,
} from "@/lib/data/professor";
import { ProfessorTableColumn } from "@/lib/definitions/professor";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Professors",
};

export default async function Page() {
  const professorData: ProfessorTableColumn[] = await queryProfessorTableData();

  return (
    <div className="flex flex-col place-items-center justify-center space-y-2">
      <ProfessorListingHeader />
      <ProfessorTable data={professorData} />
    </div>
  );
}
