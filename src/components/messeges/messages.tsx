import { Box, Paper } from "@material-ui/core";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Badge, Divider, ListItem, Menu, MenuItem } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  CommonMessagesType,
  Conversation,
} from "../../common/scrips/commonMessages";
import { userService } from "../../services/auth.service";
import { ProfileAvatar } from "../avatar/profileAvatar";
import s from "./messages.module.css";
import { RenderedItems } from "./renderedItems";

export const Messages = () => {
  const [data, setData] = useState<Conversation[]>();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      userService.getMessages().then((data) => {
        setData(data.data);
      });
    } catch (e) {}
  }, []);

  const count = data?.map((el) =>
    el.messages.filter((current) => !current.read),
  );

  const arrLen = (arr: CommonMessagesType[][]) => {
    let number = 0;
    arr?.map((el) => {
      number += el.length;
    });
    return number;
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Badge
        badgeContent={arrLen(count!) ? arrLen(count!) : 0}
        color="secondary"
        overlap="circular"
      >
        <IconButton onClick={handleClick}>
          <NotificationsIcon fontSize={"large"} />
        </IconButton>
      </Badge>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        variant={"menu"}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box className={s.box}>
          <RenderedItems data={data!} />
        </Box>
      </Menu>
    </Box>
  );
};
