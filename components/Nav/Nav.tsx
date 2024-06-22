import React from "react";
import NavSearchBar from "./NavSearchBar";
import NavLogo from "./NavLogo";
import NavIcon from "./NavIcon";
import { FaBook } from "react-icons/fa6";
import { HiMiniAcademicCap } from "react-icons/hi2";
import NavProfile from "./NavProfile";
import SignIn from "../Auth/SignIn";
import { queryCourseTableDataByYearTerm } from "@/lib/data/course";
import { queryProfessorTableData } from "@/lib/data/professor";
import { ProfessorTableColumn } from "@/lib/definitions/professor";
import { CourseTableColumn } from "@/lib/definitions/course";
import { MdRateReview } from "react-icons/md";
import NavNotification from "./NavNotifications";
import { getNotifications } from "@/lib/data/notification";
import { getSession } from "@auth0/nextjs-auth0";
import { hashEmailAddress } from "@/lib/utils";

export default async function Nav() {
  const session = await getSession();

  const courseTableData: CourseTableColumn[] =
    await queryCourseTableDataByYearTerm(null, null);

  const professorTableData: ProfessorTableColumn[] =
    await queryProfessorTableData();

  const notifications = await getNotifications(
    hashEmailAddress(session?.user?.email as string),
  );

  return (
    <div className="flex place-items-center backdrop-blur justify-center w-full transition-colors duration-500 border-b border-primary-white bg-primary-black supports-backdrop-blur:bg-white/60 dark:bg-transparent">
      <div className="flex place-content-between align-items-center space-x-4 w-full max-w-screen-2xl p-4 max-sm:py-3">
        <NavLogo />
        <NavIcon link="/courses" tooltip="Courses">
          <FaBook className="w-6 h-6 fill-primary-white cursor-pointer hover:fill-primary-red focus:border-0 transition duration-150 ease-out hover:ease-in" />
        </NavIcon>
        <NavIcon link="/professors" tooltip="Professors">
          <HiMiniAcademicCap className="w-8 h-8 fill-primary-white cursor-pointer hover:fill-primary-red transition duration-150 ease-out hover:ease-in" />
        </NavIcon>
        <NavIcon link="/add-review" tooltip="Add Review">
          <MdRateReview className="w-8 h-8 fill-primary-white cursor-pointer hover:fill-primary-red transition duration-150 ease-out hover:ease-in" />
        </NavIcon>
        <NavSearchBar
          courses={courseTableData}
          professors={professorTableData}
        />
        <div className="flex items-center space-x-4">
          <NavNotification notifications={notifications} />
          <NavProfile />
          <SignIn />
        </div>
      </div>
    </div>
  );
}
