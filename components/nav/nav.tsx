import React from "react";
import NavSearchBar from "./nav_search_bar";
import NavStar from "./nav_star";
import NavNotification from "./nav_notifications";
import NavLogo from "./nav_logo";
import NavIcon from "./nav_icon";
import { FaBook } from "react-icons/fa6";
import { HiMiniAcademicCap } from "react-icons/hi2";
import NavProfile from "./nav_profile";
import SignIn from "../auth/sign_in";
import { queryCourseTableDataByYearTerm } from "@/lib/data/course";
import { queryProfessorTableData } from "@/lib/data/professor";
import { ProfessorTableColumn } from "@/lib/definitions/professor";
import { CourseTableColumn } from "@/lib/definitions/course";

export default async function Nav() {
  const courseTableData: CourseTableColumn[] =
    await queryCourseTableDataByYearTerm(null, null);

  const professorTableData: ProfessorTableColumn[] =
    await queryProfessorTableData();

  return (
    <div className="flex place-items-center backdrop-blur justify-center w-full transition-colors duration-500 border-b border-primary-white bg-primary-black supports-backdrop-blur:bg-white/60 dark:bg-transparent">
      <div className="flex place-content-between align-items-center space-x-4 w-full max-w-screen-2xl p-4 max-sm:py-2">
        <NavLogo />
        <NavIcon link="/courses" tooltip="Courses page">
          <FaBook className="w-6 h-6 fill-primary-white max-sm:w-5 max-sm:h-5 cursor-pointer hover:fill-primary-red focus:border-0 transition duration-150 ease-out hover:ease-in" />
        </NavIcon>
        <NavIcon link="/professors" tooltip="Professors page">
          <HiMiniAcademicCap className="w-8 h-8 fill-primary-white max-sm:w-6 max-sm:h-6 cursor-pointer hover:fill-primary-red transition duration-150 ease-out hover:ease-in" />
        </NavIcon>
        <NavSearchBar
          courses={courseTableData}
          professors={professorTableData}
        />
        <div className="flex items-center space-x-4">
          <NavStar />
          <NavNotification />
          <NavProfile />
          <SignIn />
        </div>
      </div>
    </div>
  );
}
