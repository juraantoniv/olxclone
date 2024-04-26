import { Box, Paper } from "@material-ui/core";
import CallIcon from "@mui/icons-material/Call";
import { Button, Card, CardMedia, Divider } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { DataGoods, UserInfoType } from "../../common/types/types";
import { carsApiService } from "../../services/goods.service";
import { goodIdSelected, setGoodOwner } from "../../store/store";
import { AddFavorite } from "../addFavorite/addFavorite";
import { ProfileAvatar } from "../avatar/profileAvatar";
import { GoogleMapsComponent } from "../mapComponent/mapComponent";
import { FormDialog } from "../sendMessegeDIalog/sendMessegeDialog";
import s from "./currentGoodInfo.module.css";

export const CurrentGoodInfo = () => {
  const id = useSelector(goodIdSelected);
  const user = useSelector(setGoodOwner);

  const [goods, setGoods] = useState<DataGoods>();

  useEffect(() => {
    carsApiService.getById(id).then((r) => {
      setGoods(r.data);
    });
  }, [id, user]);

  console.log(user);

  return (
    <Card className={s.container} variant={"outlined"}>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Card variant={"outlined"} className={s.image}>
            <CardMedia
              component="img"
              height="100%"
              image={goods?.image}
              alt="goods"
            />
          </Card>

          <Card variant={"outlined"} className={s.item2}>
            <Typography variant={"h5"}>Description</Typography>
            <Typography>{goods?.description}</Typography>
          </Card>
          <Divider
            component={"div"}
            style={{ width: "100%" }}
            variant={"fullWidth"}
          />
          <Box className={s.underDivider}>
            <Typography>ID : {goods?.id}</Typography>
            <Typography> Views: {goods?.views?.length}</Typography>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box className={s.contact}>
            <Card className={s.priceName} variant={"outlined"}>
              <Typography>{goods?.created?.toString().slice(0, 10)}</Typography>
              <Typography fontFamily={"fantasy"}>{goods?.title}</Typography>
              <Typography fontWeight={"bold"} fontSize={"large"}>
                {goods?.price} UAH
              </Typography>
            </Card>
            <Card variant={"outlined"} className={s.numberMessage}>
              <Box sx={{ marginLeft: "85%" }}>
                <AddFavorite />
              </Box>
              <FormDialog />
              <Button>+380977863872</Button>
            </Card>

            <Card sx={{ width: "100%", padding: "10px" }} variant={"outlined"}>
              <Typography fontWeight={"bold"}>{user?.name}</Typography>
              <Typography fontWeight={"initial"}>
                On olx from {user?.created?.toString().slice(0, 10)}
              </Typography>
            </Card>
            <Card variant={"outlined"} className={s.map}>
              <GoogleMapsComponent />
            </Card>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Card variant={"outlined"} className={s.profile}>
            <ProfileAvatar name={false} id={user.id} />
            <Typography alignItems={"center"} variant={"h5"}>
              {user.name}
            </Typography>
            <CallIcon />
          </Card>
        </Grid>
      </Grid>
    </Card>
  );
};
