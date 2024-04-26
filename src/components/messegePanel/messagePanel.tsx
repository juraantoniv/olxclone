import { Box, Paper } from "@material-ui/core";
import { Button, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ChatItem, ChatList } from "react-chat-elements";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

import { Conversation } from "../../common/scrips/commonMessages";
import { userService } from "../../services/auth.service";
import { selectUser } from "../../store/store";
import { ProfileAvatar } from "../avatar/profileAvatar";
import s from "./messagePanel.module.css";

export const MessagePanel = () => {
  const user = useSelector(selectUser);
  const [data, setData] = useState<Conversation[]>();
  const navigate = useNavigate();
  useEffect(() => {
    userService.getMessages().then((data) => {
      setData(data.data);
    });
  }, []);

  const currentDialogHandler = (id: string) => {
    navigate(`dialog/${id}`);
  };

  return (
    <Paper variant={"outlined"} className={s.box}>
      <Box className={s.leftBox}>
        {data?.map((current) => (
          <Box>
            <Button onClick={() => currentDialogHandler(current.receiverId)}>
              <ProfileAvatar id={user.id} />
            </Button>
            {/*<ChatItem*/}
            {/*  avatar="https://avatars.githubusercontent.com/u/80540635?v=4"*/}
            {/*  alt="kursat_avatar"*/}
            {/*  title="Kursat"*/}
            {/*  subtitle="Ok. See you !"*/}
            {/*  date={new Date()}*/}
            {/*  unread={0}*/}
            {/*  id={user.id}*/}
            {/*  onClick={() => currentDialogHandler(current.receiverId)}*/}
            {/*/>*/}
          </Box>
        ))}
      </Box>
      <Divider
        style={{ position: "sticky", top: 0 }}
        orientation={"vertical"}
        variant={"fullWidth"}
        flexItem
      />
      <Outlet />
    </Paper>
  );
};
