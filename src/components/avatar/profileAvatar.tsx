import { Avatar, Box, Paper } from "@material-ui/core";
import { Badge } from "@mui/material";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { UserInfoType } from "../../common/types/types";
import { userService } from "../../services/auth.service";
import { setGoodOwner } from "../../store/store";
import s from "./profileAvatar.module.css";

type ProfileAvatarType = {
  id: string;
  name?: boolean;
};

export const ProfileAvatar: React.FC<ProfileAvatarType> = ({
  id,
  name = true,
}) => {
  const user = useSelector(setGoodOwner);
  const [source, setSource] = useState<UserInfoType>();

  useEffect(() => {
    if (user) {
      userService
        .getById(id)
        .then((data) => {
          setSource(data.data);
        })
        .catch((e) => {});
    }
  }, [user, id]);

  return (
    <Box className={s.profile}>
      <Badge
        color="info"
        overlap="circular"
        variant="dot"
        badgeContent="online"
      >
        <Avatar alt="profile avatar" src={source?.avatar} />
      </Badge>

      {name ? (
        <Typography fontStyle={"initial"}>{source?.name}</Typography>
      ) : null}
    </Box>
  );
};
