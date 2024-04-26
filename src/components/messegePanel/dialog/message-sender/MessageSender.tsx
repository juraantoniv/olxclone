import SendIcon from "@mui/icons-material/Send";
import { Button, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import { Conversation } from "../../../../common/scrips/commonMessages";
import { userService } from "../../../../services/auth.service";
import { message0 } from "../dialog";
import s from "./MessageSender.module.css";

type MessageSenderType = {
  id: string;
  setDataMessages: () => void;
};
const MessageSender: React.FC<MessageSenderType> = ({
  id,
  setDataMessages,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [data, setData] = useState<Conversation[]>();
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState<any>("");

  const onChange = (e: any) => {
    setText(e.currentTarget.value);
  };

  useEffect(() => {
    if (textareaRef?.current) {
      textareaRef.current.style.height = "30px";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [text]);

  const addMessage = async () => {
    try {
      await userService.sendMessage(id, text);
      toast.info("Message was send");
      const messages = await userService.getMessages();
      setData(messages.data);
      setDataMessages();
    } catch (e) {}
  };

  const onKeyDown = (e: any) => {
    e.key === "Enter" && e.shiftKey && addMessage();
  };

  return (
    <>
      <div id={"hw1-send-message-form"} className={s.sendForm}>
        <TextField
          title={"Shift+Enter for send"}
          placeholder={"Type your message"}
          value={text}
          onChange={onChange}
          onKeyDown={onKeyDown}
          size={"small"}
          fullWidth
        />
        <Button
          endIcon={<SendIcon />}
          variant={"contained"}
          className={s.button}
          onClick={addMessage}
        >
          Send
        </Button>
      </div>
    </>
  );
};

export default MessageSender;
