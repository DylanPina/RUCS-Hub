"use client";

import { Review } from "@/lib/definitions/review";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LabelList,
} from "recharts";

function renderCustomLabel(props: any): JSX.Element | null {
  const { x, y, width, height, value, offset = 0 } = props;
  const labelX: number = x + width / 2;
  const labelY: number = y + height / 2 + offset;

  return value > 0 ? (
    <text
      x={labelX}
      y={labelY}
      fill="#fff"
      textAnchor="middle"
      dominantBaseline="bottom"
    >
      {value}
    </text>
  ) : null;
}

interface ProfessorDifficultyRatingChartProps {
  reviews: Review[];
}

export default function ProfessorDifficultyRatingChart({
  reviews,
}: ProfessorDifficultyRatingChartProps): JSX.Element {
  const ratings: number[] = Array.from({ length: 10 }, (_, index) => index + 1);

  const ratingCount: number[] = ratings.map((rating) => {
    return reviews.filter(
      (review: Review) => review.difficultyRating === rating,
    ).length;
  });

  const chartData: { count: number; rating: number }[] = ratingCount.map(
    (count, index) => ({
      count,
      rating: index + 1,
    }),
  );

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="rating" tick={{ stroke: "#fafafa" }} />
        <YAxis dataKey="count" tick={{ stroke: "#fafafa" }} />
        <Bar dataKey="count" fill="#E11D48">
          <LabelList dataKey="count" content={renderCustomLabel} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
