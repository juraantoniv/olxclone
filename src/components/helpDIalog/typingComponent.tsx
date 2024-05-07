import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@material-ui/core";
import SendIcon from "@mui/icons-material/Send";
import { Card } from "@mui/material";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import { userService } from "../../services/auth.service";
import { useAppDispatch } from "../../store/store";
import s from "./typeMessege.module.css";

const Schema = z.object({
  subject: z.string().min(1),
  message: z.string().min(1),
});

type FormType = z.infer<typeof Schema>;

type TypingComponentType = {
  close: () => void;
};

export const TypingComponent: React.FC<TypingComponentType> = ({ close }) => {
  const {
    handleSubmit,
    register,
    // control,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(Schema),
  });
  const dispatch = useAppDispatch();

  const onSubmit = async (data: FormType) => {
    try {
      const res = await userService.helpMessage(data.message, data.subject);

      toast.info(`${res.data}`, {
        position: "top-right",
        theme: "colored",
        type: "success",
      });
    } catch (e) {}
  };

  const handleClose = () => {
    close();
  };

  return (
    <Card
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
      variant={"outlined"}
    >
      <DialogTitle>Message</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To to send to this website, please enter your message here.
        </DialogContentText>
        <TextField
          {...register("subject")}
          autoFocus
          required
          margin="dense"
          id="name"
          name="subject"
          label="type your subject"
          type="text"
          fullWidth
          variant={"outlined"}
        />
        <TextField
          {...register("message")}
          autoFocus
          required
          margin="dense"
          id="name"
          multiline
          rows={3}
          maxRows={5}
          name="message"
          label="type your message"
          type="text"
          fullWidth
          variant={"outlined"}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant={"contained"}>
          Cancel
        </Button>
        <Button endIcon={<SendIcon />} type="submit" variant={"contained"}>
          Send message
        </Button>
      </DialogActions>
    </Card>
  );
};
