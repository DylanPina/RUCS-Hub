import React from "react";

interface StatBoxProps {
  title: string;
  subtitle: string;
  value: number | string;
}

export default function StatBox({ title, subtitle, value }: StatBoxProps) {
  return (
    <div className="flex flex-col items-center justify-center h-32 w-64 bg-neutral-800 p-3 rounded overflow-hidden-md">
      <h2 className="text-2xl max-sm:text-xl font-bold">{title}</h2>
      <div className="mb-3 text-base">{subtitle}</div>
      <div className="text-xl">{value}</div>
    </div>
  );
}
