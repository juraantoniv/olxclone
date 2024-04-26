import { Box } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";

import { DataGoods, GoodsType } from "../../common/types/types";
import { carsApiService } from "../../services/goods.service";
import { CardItem } from "../goodsCard/cardItem";
import s from "./favoritsGoods.module.css";

export const Favorites = () => {
  const [goods, setGoods] = useState<DataGoods[]>();

  useEffect(() => {
    carsApiService.getFavorite().then((data) => {
      console.log(data);
      setGoods(data.data.data);
    });
  }, []);

  return (
    <Box className={s.mainBox}>
      <Typography variant={"h5"}>My favorites</Typography>
      <CardItem items={goods!} currencyType={"USD"} />
    </Box>
  );
};
