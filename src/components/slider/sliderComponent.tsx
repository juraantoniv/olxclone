import { Box } from "@material-ui/core";
import { Card, Slider, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { userActions } from "../../store/slices";
import { setRange, useAppDispatch } from "../../store/store";

export const RangeSlider = () => {
  const dispatch = useAppDispatch();
  const range = useSelector(setRange);

  const [minNum, setMinNum] = useState(0);
  const [maxNum, setMaxNum] = useState(100000);
  const minmin = 0;
  const maxmax = 100000;
  const [priceRangeValue, setPriceRangeValue] = useState([0, 100000]);

  const handlePriceRangeChange = (event: any, newValue: any) => {
    dispatch(userActions.setRange([newValue[0], newValue[1]]));
    setMinNum(newValue[0]);
    setMaxNum(newValue[1]);
    setPriceRangeValue(newValue);
  };

  return (
    <Card variant={"outlined"} sx={{ margin: "5px", padding: "5px" }}>
      <Typography>Price</Typography>
      <Slider
        getAriaLabel={() => "Price range"}
        value={priceRangeValue}
        onChange={handlePriceRangeChange}
        valueLabelDisplay="auto"
        min={minmin}
        max={maxmax}
      />
      <Stack direction="row" justifyContent="space-evenly" alignItems="center">
        <TextField
          label="min"
          type="number"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          size={"small"}
          sx={{ width: "100px" }}
          value={minNum}
          onChange={(e) => {
            setMinNum(Number(e.target.value));
            dispatch(userActions.setRange([e.target.value, range[1]]));
            setPriceRangeValue([Number(e.target.value), priceRangeValue[1]]);
          }}
        />
        <Typography>-</Typography>
        <TextField
          label="max"
          type="number"
          size={"small"}
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          sx={{ width: "100px" }}
          value={maxNum}
          onChange={(e) => {
            setMaxNum(Number(e.target.value));
            dispatch(userActions.setRange([range[0], e.target.value]));
            setPriceRangeValue([priceRangeValue[0], Number(e.target.value)]);
          }}
        />
      </Stack>
    </Card>
  );
};
