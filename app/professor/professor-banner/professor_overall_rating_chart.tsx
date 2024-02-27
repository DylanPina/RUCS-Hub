"use client";

import { Review } from "@prisma/client";
import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const renderCustomLabel = (props: any) => {
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
};

export default class ProfessorOverallRatingChart extends PureComponent {
  render() {
    const { reviews } = this.props;

    const ratings = Array.from({ length: 10 }, (_, index) => index + 1);

    const ratingCount = ratings.map((rating) => {
      return reviews.filter((review: Review) => review.rating === rating)
        .length;
    });

    const chartData = ratingCount.map((rating, index) => {
      return {
        rating: rating,
        count: index + 1,
      };
    });

    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            name="rating"
            tick={{ stroke: "#fafafa" }}
            tickFormatter={(value: number) => String(Number(value) + 1)}
          />
          <YAxis name="count" tick={{ stroke: "#fafafa" }} />
          <Bar dataKey="rating" fill="#E11D48">
            <LabelList dataKey="rating" content={renderCustomLabel} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
