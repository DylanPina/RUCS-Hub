import React from "react";

export default function CourseListingHeader() {
  return (
    <div className="flex flex-col space-y-2 place-items-center justify-center">
      <h1 className="text-4xl max-sm:text-2xl font-bold text-primary-red">
        RUCS <span className="text-primary-white">Courses</span>
      </h1>
      <h4 className="max-w-4xl text-md max-sm:text-sm font-semibold text-center text-primary-white">
        Welcome to the unofficial hub for Rutgers University Computer Science.
        Here you can find reviews for classes and anonymously add your own.
      </h4>
    </div>
  );
}
