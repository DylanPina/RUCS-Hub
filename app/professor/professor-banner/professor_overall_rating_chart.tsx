"use client";

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
import { Review } from "@prisma/client";

function renderCustomLabel(props: any) {
  const { x, y, width, height, value } = props;
  const labelX = x + width / 2;
  const labelY = y + height / 2 + (props.offset || 0);

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

export default function ProfessorOverallRatingChart(props: any) {
  const { reviews } = props;
  const ratings = Array.from({ length: 10 }, (_, index) => index + 1);

  const ratingCount = ratings.map((rating) => {
    return reviews.filter((review: Review) => review.rating === rating).length;
  });

  const chartData = ratingCount.map((count, index) => ({
    rating: index + 1,
    count,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="rating" tick={{ stroke: "#fafafa" }} />
        <YAxis tick={{ stroke: "#fafafa" }} />
        <Bar dataKey="count" fill="#E11D48">
          <LabelList dataKey="count" content={renderCustomLabel} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
