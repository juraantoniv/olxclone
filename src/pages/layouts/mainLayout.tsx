import { Box } from "@material-ui/core";
import { LinearProgress } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useSearchParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { ReactSlick } from "../../components/cauruselComponent/caurusell";
import { Favorites } from "../../components/favoritsGoods/favoritsGoods";
import { FooterPage } from "../../components/footer/reactFooter";
import CustomizedInputBase from "../../components/input/inputBase";
import { userActions, userThunks } from "../../store/slices";
import {
  category,
  langValue,
  loadingStatus,
  regionSelector,
  selectCars,
  selectCount,
  selectUser,
  setGoodOwner,
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
  const dispatch = useAppDispatch();
  const itemPage = useSelector(selectCount);
  const region = useSelector(regionSelector);
  const lang = useSelector(langValue);
  const skip = useSelector(setOffset);
  const user = useSelector(selectUser);
  console.log(sortValue);

  useEffect(() => {
    dispatch(
      userThunks.fetchGoods({
        limit: itemPage.toString(),
        ORDER: sortValue ? "ASC" : "DESC",
        category: categoryValue,
        region: region,
      }),
    )
      .unwrap()
      .then()
      .catch((e) => {
        userThunks.fetchGoods({
          limit: itemPage.toString(),
          ORDER: sortValue ? "ASC" : "DESC",
          category: categoryValue,
          region: region,
        });
        dispatch(userActions.setCount(5));
      });
  }, [categoryValue, region, sortValue]);

  console.log(loading);

  return (
    <Box className={s.mainBox}>
      <ToastContainer />
      <SearchAppBar />
      {loading === "loading" ? (
        <LinearProgress
          color={"secondary"}
          sx={{ margin: "1px", width: "100%" }}
        />
      ) : null}
      <CustomizedInputBase />
      <Outlet />
      {user.name ? <Favorites /> : null}
      <ReactSlick />
      <FooterPage />
    </Box>
  );
};
