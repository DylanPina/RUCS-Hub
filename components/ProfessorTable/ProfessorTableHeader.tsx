import React from "react";

export default function ProfessorTableHeader() {
  return (
    <div className="flex flex-col space-y-2 place-items-center justify-center">
      <h1 className="text-4xl max-sm:text-2xl font-bold text-primary-red">
        RU <span className="text-primary-white">Professors</span>
      </h1>
      <h4 className="max-w-4xl text-md max-sm:text-sm font-semibold text-center text-primary-white">
        Welcome to the unofficial hub for Rutgers University.{" "}
        <br className="max-sm:hidden" />
        Find reviews for classes and anonymously upload your own.
      </h4>
    </div>
  );
}
