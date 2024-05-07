import { Card, Pagination } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";

import { userActions, userThunks } from "../../store/slices";
import {
  regionSelector,
  selectCars,
  selectCount,
  setOffset,
  sortDirection,
  useAppDispatch,
} from "../../store/store";
import { CardItem } from "../goodsCard/cardItem";
import { SelectComponent } from "../selectComponent/selectComponent";
import { SelectItemsCount } from "../selectCountItems/selectItemsCount";
import { SortComponent } from "../sortComponent/sortComponent";
import s from "./goodsList.module.css";

function valuetext(value: number) {
  return `${value}°C`;
}

export const GoodsList = () => {
  const dispatch = useAppDispatch();

  const goods = useSelector(selectCars);
  const skip = useSelector(setOffset);
  const amountPages = Math.ceil(goods?.total / goods?.limit);
  const itemPage = useSelector(selectCount);
  const direction = useSelector(sortDirection);
  // const [sortDirection, setSort] = useState<boolean>(false);
  const [currency, setCurrency] = React.useState("");
  const region = useSelector(regionSelector);
  const { data } = useSelector(selectCars);

  const currencyType = (type: string) => {
    setCurrency(type);
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    const items = itemPage * (value - 1);
    dispatch(userActions.setOffset(items));
    dispatch(
      userThunks.fetchGoods({
        limit: String(goods?.limit),
        offset: items.toString(),
        ORDER: direction ? "ASC" : "DESC",
        region,
      }),
    );
  };

  return (
    <Box className={s.container}>
      <Card className={s.sideContainer} variant={"outlined"}>
        <Box className={s.sortContainer}>
          <SelectItemsCount />
          <SortComponent />
        </Box>
        <SelectComponent setCurrencyType={currencyType} />
      </Card>
      <Card className={s.contentContainer} variant={"outlined"}>
        <CardItem items={goods?.data} currencyType={currency} />
        <Pagination
          sx={{ marginTop: "30px" }}
          count={amountPages}
          page={goods?.page}
          onChange={handleChange}
          variant="outlined"
          shape="rounded"
        />
      </Card>
    </Box>
  );
};
