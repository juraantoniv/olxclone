import { Box } from "@material-ui/core";
import { BarChart, SparkLineChart } from "@mui/x-charts";
import React from "react";

export const Dashboard = () => {
  return (
    <BarChart
      series={[{ data: [35, 44, 24, 34] }]}
      height={290}
      xAxis={[{ data: ["Q1"], scaleType: "band" }]}
      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
    />
  );
};
