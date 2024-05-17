import { Box } from "@material-ui/core";
import { makeStyles } from "@mui/material";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import React from "react";
import { Trans } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import IconComponentAll from "../../common/iconsAndSVGComponents/allGoods";
import IconCar from "../../common/iconsAndSVGComponents/car";
import IconElectronics from "../../common/iconsAndSVGComponents/electronics";
import IconFashion from "../../common/iconsAndSVGComponents/fashion";
import IconFoods from "../../common/iconsAndSVGComponents/foods";
import IconComponentHome from "../../common/iconsAndSVGComponents/home";
import IconHouse from "../../common/iconsAndSVGComponents/house";
import JobComponent from "../../common/iconsAndSVGComponents/job";
import { userActions } from "../../store/slices";
import {
  category,
  langValue,
  selectCars,
  useAppDispatch,
} from "../../store/store";
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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const lang = useSelector(langValue);

  const categoryHandler = (cat: string | null) => {
    dispatch(userActions.setCategory(cat));
    navigate("category");
  };

  return (
    <Box className={s.main} sx={styles.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant={"h4"} fontWeight={"bold"}>
            <Trans>Category</Trans>
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
