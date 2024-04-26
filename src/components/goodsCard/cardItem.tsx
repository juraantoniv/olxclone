import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import EuroIcon from "@mui/icons-material/Euro";
import InfoIcon from "@mui/icons-material/Info";
import {
  Badge,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Stack,
} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { DataGoods, GoodsType, UserInfoType } from "../../common/types/types";
import { userService } from "../../services/auth.service";
import { userActions, userThunks } from "../../store/slices";
import { selectCount, setOffset, useAppDispatch } from "../../store/store";
import { CarOrder } from "../oder/goodsOrder";
import { IconEye } from "../svg/eye";
import { IconHeart } from "../svg/heart";
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
  console.log(user);

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

    navigate("info", { replace: true, state: { ...user } });
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
                image={el.image}
                alt="car"
                sx={{ borderRadius: "10px" }}
              />
              <CardContent>
                <Box className={s.boxCurrency}>
                  <Typography gutterBottom variant="h5" component="div">
                    {el.region}
                  </Typography>
                  <Typography variant={"caption"} fontSize={"large"}>
                    {el.price}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {el.description}
                </Typography>
              </CardContent>
            </CardActionArea>
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
