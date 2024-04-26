import "react-chat-elements/dist/main.css";

import { Box, Paper } from "@material-ui/core";
import React from "react";
import { MessageBox, MessageList } from "react-chat-elements";
import { useSelector } from "react-redux";

import {
  CommonMessagesType,
  Conversation,
} from "../../../../common/scrips/commonMessages";
import { selectUser } from "../../../../store/store";
import { ProfileAvatar } from "../../../avatar/profileAvatar";
import s from "./Message.module.css";

// нужно создать правильный тип вместо any
export type MessagePropsType = {
  message: CommonMessagesType;
  id: string;
};

// нужно отобразить приходящие данные
const Message: React.FC<MessagePropsType> = ({ id, message }) => {
  const user = useSelector(selectUser);

  return (
    <>
      <MessageBox
        position={message.users_id_massages === id ? "left" : "right"}
        title={message.title}
        type="meetingLink"
        text={message.message}
        date={message.created}
        focus
        forwarded
        id={message.good_id}
        notch
        removeButton
        replyButton
        retracted
        status={message.read ? "read" : "sent"}
        titleColor={"white"}
        avatar={
          message.users_id_massages === id ? `${user.avatar}` : `${user.avatar}`
        }
      />
    </>
  );
};

export default Message;
