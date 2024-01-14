import React from "react";
import CourseTags from "./course-tags";

export default function Hero() {
  return (
    <div className="flex flex-col bg-primary-red text-white p-8 w-9/12">
      <h1 className="text-5xl font-bold mb-2">Intro to Artifical Intelligence</h1>
      <p className="text-xl mb-2">(01:198:440)</p>
      <p className="text-base mb-4">Prerequisites: Brain rot</p>
      <CourseTags />
    </div>
  );
}
