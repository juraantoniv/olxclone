import InfoIcon from "@mui/icons-material/Info";
import {
  Badge,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Stack,
} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { IconEye } from "../../common/iconsAndSVGComponents/eye";
import { IconHeart } from "../../common/iconsAndSVGComponents/heart";
import svg from "../../common/iconsAndSVGComponents/image-landscape-png-svgrepo-com.svg";
import { DataGoods, UserInfoType } from "../../common/types/types";
import { userService } from "../../services/auth.service";
import { userActions, userThunks } from "../../store/slices";
import { selectCount, setOffset, useAppDispatch } from "../../store/store";
import { CarOrder } from "../oder/goodsOrder";
import s from "./cardItem.module.css";

type cardContent = {
  items: Array<DataGoods>;
  currencyType: string;
};

export const CardItem: React.FC<cardContent> = ({ items, currencyType }) => {
  const [user, setUser] = useState<UserInfoType>();
  const dispatch = useAppDispatch();
  const itemPage = useSelector(selectCount);
  const skip = useSelector(setOffset);
  const navigate = useNavigate();

  const likeCar = (id: string) => {
    dispatch(userThunks.likeCar(id))
      .unwrap()
      .then(() => {
        dispatch(
          userThunks.fetchGoods({
            limit: itemPage.toString(),
            offset: skip.toString(),
          }),
        );
      })
      .catch((e) => {
        dispatch(
          userThunks.fetchGoods({
            limit: itemPage.toString(),
            offset: skip.toString(),
          }),
        );
        console.log(e);
        toast.error(`${e}`);
      });
  };

  const viewsHandler = async (id: string, userId: string) => {
    await userService.getById(userId).then((r) => {
      setUser(r.data);
      dispatch(userActions.setGoodOwner(r.data));
    });

    dispatch(userActions.setGoodId(id));

    navigate("info");
  };

  return (
    <Grid container spacing={1} className={s.contentContainer} gap={3}>
      {items?.map((el) => (
        <Grid item xs={12} sm={4} md={3} lg={2}>
          <Card variant={"outlined"} sx={{ minHeight: "230px" }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="150px"
                image={
                  !el.image?.includes("null")
                    ? el.image
                    : "https://www.shutterstock.com/image-vector/no-image-available-vector-illustration-260nw-744886198.jpg"
                }
                alt="good"
              />
              <CardContent>
                <Divider variant={"middle"} sx={{ width: "100%" }} />
                <Box className={s.boxCurrency}>
                  <Typography gutterBottom variant="h5" component="div">
                    {el.region}
                  </Typography>
                  <Divider orientation="vertical" flexItem />
                  <Typography
                    variant="h5"
                    component={"div"}
                    fontFamily={"serif"}
                    align={"center"}
                  >
                    {el.location}
                  </Typography>
                  <Divider orientation="vertical" flexItem />
                  <Typography variant={"caption"} fontSize={"small"}>
                    {el.price} UAH
                  </Typography>
                </Box>
                <Divider variant={"middle"} sx={{ width: "100%" }} />
                <Typography
                  fontSize={"x-large"}
                  variant="subtitle1"
                  sx={{ textDecoration: "underline" }}
                >
                  {el.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {el.description}
                </Typography>
              </CardContent>
            </CardActionArea>
            <Divider variant={"middle"} sx={{ width: "100%" }} />
            <CardActions className={s.cardActions}>
              <Stack direction={"row"}>
                <Button
                  size="medium"
                  color="primary"
                  onClick={() => likeCar(el.id)}
                >
                  <Badge
                    color={"success"}
                    badgeContent={el.likes?.length ? el.likes?.length : 0}
                  >
                    <IconHeart />
                  </Badge>
                </Button>
                <Button size="small" color="primary">
                  <Badge
                    color={"success"}
                    badgeContent={el.views?.length ? el.views?.length : 0}
                  >
                    <IconEye />
                  </Badge>
                </Button>
              </Stack>

              <Stack direction={"row"}>
                <CarOrder id={el.id} />
                <Button
                  variant={"contained"}
                  startIcon={<InfoIcon />}
                  onClick={() => viewsHandler(el.id, el.user_id)}
                  size={"small"}
                ></Button>
              </Stack>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
