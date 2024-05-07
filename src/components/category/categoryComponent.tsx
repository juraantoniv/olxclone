import { Box } from "@material-ui/core";
import { makeStyles } from "@mui/material";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { userActions } from "../../store/slices";
import { category, selectCars, useAppDispatch } from "../../store/store";
import IconComponentAll from "../svg/allGoods";
import IconCar from "../svg/car";
import IconElectronics from "../svg/electronics";
import IconFashion from "../svg/fashion";
import IconFoods from "../svg/foods";
import IconComponentHome from "../svg/home";
import IconHouse from "../svg/house";
import JobComponent from "../svg/job";
import s from "./categoryComponent.module.css";
const styles = {
  root: {
    background: "linear-gradient(45deg, #2196F3 10%, #21CBF3 40%)",
    boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
    color: "white",
    margin: 8,
  },
};

export const CategoryComponent = () => {
  const categoryValue = useSelector(category);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const categoryHandler = (cat: string | null) => {
    dispatch(userActions.setCategory(cat));
    navigate("category");
  };

  return (
    <Box className={s.main} sx={styles.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant={"h4"} fontWeight={"bold"}>
            Category
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} md={3} lg={3}>
          <IconButton
            onClick={() => categoryHandler(null)}
            sx={{ "&:hover": { tra: "green" } }}
          >
            <IconComponentAll />
          </IconButton>
        </Grid>
        <Grid item xs={12} sm={4} md={3} lg={3}>
          <IconButton onClick={() => categoryHandler("FOODS")}>
            <IconFoods />
          </IconButton>
        </Grid>
        <Grid item xs={12} sm={4} md={3} lg={3}>
          <IconButton onClick={() => categoryHandler("CARS")}>
            <IconCar />
          </IconButton>
        </Grid>

        <Grid item xs={12} sm={4} md={3} lg={3}>
          <IconButton onClick={() => categoryHandler("PROPERTY")}>
            <IconHouse />
          </IconButton>
        </Grid>
        <Grid item xs={12} sm={4} md={3} lg={3}>
          <IconButton onClick={() => categoryHandler("JOB")}>
            <JobComponent />
          </IconButton>
        </Grid>
        <Grid item xs={12} sm={4} md={3} lg={3}>
          <IconButton onClick={() => categoryHandler("ELECTRONICS")}>
            <IconElectronics />
          </IconButton>
        </Grid>
        <Grid item xs={12} sm={4} md={3} lg={3}>
          <IconButton onClick={() => categoryHandler("FASHION")}>
            <IconFashion />
          </IconButton>
        </Grid>
        <Grid item xs={12} sm={4} md={3} lg={3}>
          <IconButton onClick={() => categoryHandler("HOME")}>
            <IconComponentHome />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};
