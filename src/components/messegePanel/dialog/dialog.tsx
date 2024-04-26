import { Box } from "@material-ui/core";
import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { MessageList } from "react-chat-elements";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { Conversation } from "../../../common/scrips/commonMessages";
import { userService } from "../../../services/auth.service";
import { selectUser } from "../../../store/store";
import s2 from "./dialog.module.css";
import Message from "./message/Message";
import MessageSender from "./message-sender/MessageSender";

export type MessageType = {
  id: number;
  user: userInfo;
  message: messageInfo;
};

export type userInfo = {
  avatar: string;
  name: string;
};

export type messageInfo = {
  text: string;
  time: number;
};

// структуру объекта не менять
export const message0: MessageType = {
  id: 0,
  user: {
    avatar: "avatar", // можно менять
    name: "Some Name", // можно менять
  },
  message: {
    text: "some textsome textsome textsome textsome textsome textsome text", // можно менять
    time: new Date().getTime(), // можно менять
  },
};

export const CurrentDialog = () => {
  const user = useSelector(selectUser);
  const [data, setData] = useState<Conversation[]>();
  const { id } = useParams();
  useEffect(() => {
    userService.getMessages().then((data) => {
      setData(data.data);
    });
  }, []);

  const setDataMessages = () => {
    userService.getMessages().then((data) => {
      setData(data.data);
    });
  };

  const items = data?.find((m) => m.receiverId === id);

  return (
    <Stack spacing={1} className={s2.box}>
      {items?.messages.map((el) => <Message message={el} id={id!} />)}
      <MessageSender id={id!} setDataMessages={setDataMessages} />
    </Stack>
  );
};
