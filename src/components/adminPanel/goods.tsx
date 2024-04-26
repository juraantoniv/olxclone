import { Box } from "@material-ui/core";
import { Card, Pagination } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

import { userActions, userThunks } from "../../store/slices";
import {
  selectCars,
  selectCount,
  setOffset,
  sortDirection,
  useAppDispatch,
} from "../../store/store";
import { CardItem } from "../goodsCard/cardItem";
import s from "./goods.module.css";

export const Goods = () => {
  const dispatch = useAppDispatch();

  const cars = useSelector(selectCars);
  const amountPages = Math.ceil(cars?.total / cars?.limit);
  const itemPage = useSelector(selectCount);
  const direction = useSelector(sortDirection);

  const [currency, setCurrency] = React.useState("");

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    const items = itemPage * (value - 1);
    dispatch(userActions.setOffset(items));
    dispatch(
      userThunks.fetchGoods({
        limit: String(cars?.limit),
        offset: items.toString(),
        ORDER: !direction ? "ASC" : "DESC",
      }),
    );
  };

  return (
    <Card variant={"outlined"} className={s.box}>
      <CardItem items={cars?.data} currencyType={currency} />
      <Pagination
        sx={{ marginTop: "30px" }}
        count={amountPages}
        page={cars?.page}
        onChange={handleChange}
        variant="outlined"
        shape="rounded"
      />
    </Card>
  );
};
