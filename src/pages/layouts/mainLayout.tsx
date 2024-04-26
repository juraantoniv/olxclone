import { Box } from "@material-ui/core";
import { LinearProgress } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useSearchParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Favorites } from "../../components/favoritsGoods/favoritsGoods";
import { FooterPage } from "../../components/footer/reactFooter";
import CustomizedInputBase from "../../components/input/inputBase";
import { GoogleMapsComponent } from "../../components/mapComponent/mapComponent";
import { ResponsiveCarousel } from "../../components/responsiveCarousel/responsiveCarousel";
import { userActions, userThunks } from "../../store/slices";
import {
  category,
  loadingStatus,
  selectCars,
  selectCount,
  selectUser,
  setOffset,
  sortDirection,
  useAppDispatch,
} from "../../store/store";
import { SearchAppBar } from "../header/headerPage";
import s from "./mainLayout.module.css";

export const MainLayout = () => {
  const loading = useSelector(loadingStatus);
  const categoryValue = useSelector(category);

  const [searchParams, setSearchParams] = useSearchParams();
  const sortValue = useSelector(sortDirection);
  const limit = searchParams.get("limit");
  console.log(limit);
  const dispatch = useAppDispatch();
  const itemPage = useSelector(selectCount);
  const skip = useSelector(setOffset);
  const { data } = useSelector(selectCars);

  useEffect(() => {
    dispatch(
      userThunks.fetchGoods({
        limit: itemPage.toString(),
        ORDER: sortValue ? "ASC" : "DESC",
        category: categoryValue,
      }),
    )
      .unwrap()
      .then()
      .catch((e) => {
        dispatch(userActions.logOff({}));
        dispatch(userActions.setCount(5));
      });
  }, [categoryValue]);

  return (
    <Box className={s.mainBox}>
      <ToastContainer />
      <SearchAppBar />
      {loading === "loading" ? (
        <LinearProgress sx={{ margin: "25px" }} />
      ) : null}
      <CustomizedInputBase />
      <Outlet />
      <Favorites />
      <ResponsiveCarousel />
      <FooterPage />
    </Box>
  );
};
