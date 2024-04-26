import { Avatar, Box, Paper } from "@material-ui/core";
import { Badge } from "@mui/material";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";

import { UserInfoType } from "../../common/types/types";
import { userService } from "../../services/auth.service";
import s from "./profileAvatar.module.css";

type ProfileAvatarType = {
  id: string;
  name?: boolean;
};

export const ProfileAvatar: React.FC<ProfileAvatarType> = ({
  id,
  name = true,
}) => {
  const [source, setSource] = useState<UserInfoType>();

  useEffect(() => {
    userService.getById(id).then((data) => {
      setSource(data.data);
    });
  }, []);

  console.log(source);

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
