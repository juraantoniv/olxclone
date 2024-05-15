import { Box } from "@material-ui/core";
import { Card, CardMedia } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { DataGoods } from "../../common/types/types";
import { userService } from "../../services/auth.service";
import { carsApiService } from "../../services/goods.service";
import { userActions } from "../../store/slices";
import { setGoodOwner, useAppDispatch } from "../../store/store";
import { AddFavorite } from "../addFavorite/addFavorite";
import { ProfileAvatar } from "../avatar/profileAvatar";
import s from "./userGoods.module.css";

export const UserGoods = () => {
  const { id } = useParams();
  const user = useSelector(setGoodOwner);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [goods, setGoods] = useState<DataGoods[]>();

  useEffect(() => {
    if (id) {
      carsApiService.getUserGoods(id).then((r) => {
        setGoods(r.data);
      });
    }
  }, [id]);

  const toCurrent = async (id: string, userId: string) => {
    await userService.getById(userId).then((r) => {
      dispatch(userActions.setGoodOwner(r.data));
    });

    dispatch(userActions.setGoodId(id));

    navigate(-1);
  };
  return (
    <Card className={s.box} variant={"outlined"}>
      <Grid container spacing={3}></Grid>
      {goods?.map((g) => (
        <Box className={s.box} onClick={() => toCurrent(g.id, g.user_id)}>
          <Grid xs={12} lg={6} className={s.item}>
            <Card variant={"outlined"} className={s.item}>
              <CardMedia
                component="img"
                image={g.image}
                alt="good"
                sx={{ width: "20%" }}
              />
              <Box className={s.info}>
                <Box sx={{ marginLeft: "95%" }}>
                  <AddFavorite />
                </Box>
                <Typography fontWeight={"bold"}>{g.title}</Typography>
                <Typography fontWeight={"bold"} fontStyle={"oblique"}>
                  {g.price} UAH
                </Typography>
                <Typography fontStyle={"oblique"}>{g.location}</Typography>

                <Typography fontStyle={"italic"}>
                  {g.created.toString().slice(0, 10)}
                </Typography>
              </Box>
            </Card>
          </Grid>
        </Box>
      ))}
    </Card>
  );
};
