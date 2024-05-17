import { Box } from "@material-ui/core";
import { BarChart, PieChart, SparkLineChart } from "@mui/x-charts";
import React, { useEffect, useState } from "react";

import { goodsApiService } from "../../services/goods.service";
import s from "./dashboard.module.css";

export type DataType = {
  value: number;
  label: string;
  id: string;
};

export type DataTypeWithId = {
  id: string | number;
  value: number;
  label: string;
};

export const Dashboard = () => {
  const [statics, setStatics] = useState<DataTypeWithId[]>([]);

  useEffect(() => {
    goodsApiService.getStatics().then((data) => {
      setStatics(data?.data);
    });
  }, []);

  return (
    <Box className={s.dashboard}>
      <PieChart
        series={[
          {
            data: statics,
          },
        ]}
        width={400}
        height={200}
      />
      <BarChart
        xAxis={[{ scaleType: "band", data: ["group A", "group B", "group C"] }]}
        series={[{ data: [4, 3, 5] }]}
        width={500}
        height={300}
      />
    </Box>
  );
};
