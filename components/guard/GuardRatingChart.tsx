"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "Awesome", uv: 10, pv: 2400, amt: 2300 },
  { name: "Great", uv: 5, pv: 2000, amt: 3000 },
  { name: "Good", uv: 3, pv: 2000, amt: 3000 },
  { name: "Ok", uv: 1, pv: 2000, amt: 3000 },
  { name: "Awful", uv: 0, pv: 2000, amt: 3000 },
];

const GuardRatingChart = () => {
  return (
    <BarChart className="w-full" width={600} height={300} data={data}>
      <XAxis dataKey="name" stroke="hsl(var(--primary))" />
      <YAxis />
      <Tooltip wrapperStyle={{ width: 100, backgroundColor: "#ccc" }} />
      <Legend
        width={100}
        wrapperStyle={{
          top: 40,
          right: 20,
          backgroundColor: "#f5f5f5",
          border: "1px solid #d5d5d5",
          borderRadius: 3,
          lineHeight: "40px",
        }}
      />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <Bar dataKey="uv" fill="hsl(var(--primary))" barSize={30} />
    </BarChart>
  );
};

export default GuardRatingChart;
