import React from "react";
import StatBox from "./stat_box";

export default function StatGrid() {
  const gridData = [
    { title: "Reviews", subtitle: "Total Count", value: 0 },
    { title: "Rating", subtitle: "On a Scale of 1-5", value: 0 },
    { title: "Difficulty", subtitle: "On a Scale of 1-5", value: 0 },
    { title: "Workload", subtitle: "Hours Per Week", value: 69 },
    { title: "Textbook", subtitle: "On a Scale of 1-5", value: 0 },
    { title: "Lectures", subtitle: "On a Scale of 1-5", value: 0 },
    { title: "Professor", subtitle: "On a Scale of 1-5", value: 0 },
    { title: "Piazza Support", subtitle: "On a Scale of 1-5", value: 0 },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 w-9/12">
      {gridData.map((item, index) => (
        <StatBox key={index} title={item.title} subtitle={item.subtitle} value={item.value} />
      ))}
    </div>
  );
}
