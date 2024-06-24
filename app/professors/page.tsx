import ProfessorListingHeader from "@/components/ProfessorTable/ProfessorTableHeader";
import ProfessorTable from "@/components/ProfessorTable/ProfessorTable";
import { getProfessorTableData } from "@/lib/data/professor";
import { ProfessorTableColumn } from "@/lib/definitions/professor";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Professors",
};

export default async function Page() {
  const professorData: ProfessorTableColumn[] = await getProfessorTableData();

  return (
    <div className="flex flex-col place-items-center justify-center space-y-2">
      <ProfessorListingHeader />
      <ProfessorTable data={professorData} />
    </div>
  );
}
