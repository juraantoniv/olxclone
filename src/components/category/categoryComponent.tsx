import { Box } from "@material-ui/core";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import GroupIcon from "@mui/icons-material/Group";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import TvIcon from "@mui/icons-material/Tv";
import { Button, CardMedia } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { userActions } from "../../store/slices";
import { category, selectCars, useAppDispatch } from "../../store/store";
import { IconSearchProperty } from "../svg/home";
import s from "./categoryComponent.module.css";

export const CategoryComponent = () => {
  const categoryValue = useSelector(category);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const categoryHandler = (cat: string) => {
    dispatch(userActions.setCategory(cat));
    navigate("category");
  };

  return (
    <Box className={s.main}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant={"h4"} fontWeight={"bold"}>
            Main Category
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} md={3} lg={3}>
          <Button
            variant={"contained"}
            size={"large"}
            onClick={() => categoryHandler("")}
          >
            ALL
          </Button>
        </Grid>
        <Grid item xs={12} sm={4} md={3} lg={3}>
          <Button
            variant={"contained"}
            size={"large"}
            startIcon={<LocalDiningIcon />}
            onClick={() => categoryHandler("FOODS")}
          >
            FOODS
          </Button>
        </Grid>
        <Grid item xs={12} sm={4} md={3} lg={3}>
          <Button
            variant={"contained"}
            size={"large"}
            startIcon={<DirectionsCarIcon />}
            onClick={() => categoryHandler("CARS")}
          >
            CARS
          </Button>
        </Grid>
        <Grid item xs={12} sm={4} md={3} lg={3}>
          <Button
            variant={"contained"}
            size={"large"}
            startIcon={<HomeWorkIcon />}
            onClick={() => categoryHandler("HOME")}
          >
            HOME
          </Button>
        </Grid>
        <Grid item xs={12} sm={4} md={3} lg={3}>
          <Button
            variant={"contained"}
            size={"large"}
            startIcon={<IconSearchProperty />}
            onClick={() => categoryHandler("PROPERTY")}
          >
            PROPERTY
          </Button>
        </Grid>
        <Grid item xs={12} sm={4} md={3} lg={3}>
          <Button
            size={"large"}
            variant={"contained"}
            startIcon={<GroupIcon />}
            onClick={() => categoryHandler("JOB")}
          >
            JOB
          </Button>
        </Grid>
        <Grid item xs={12} sm={4} md={3} lg={3}>
          <Button
            size={"large"}
            variant={"contained"}
            startIcon={<TvIcon />}
            onClick={() => categoryHandler("ELECTRONICS")}
          >
            ELECTRONICS
          </Button>
        </Grid>
        <Grid item xs={12} sm={4} md={3} lg={3}>
          <Button
            size={"large"}
            variant={"contained"}
            startIcon={<TvIcon />}
            onClick={() => categoryHandler("ELECTRONICS")}
          >
            ELECTRONICS
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
