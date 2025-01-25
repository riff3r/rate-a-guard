"use client";

import dynamic from "next/dynamic";

const GuardRatingChart = dynamic(() => import("./GuardRatingChartComponent"), {
  ssr: false,
});

export default GuardRatingChart;
