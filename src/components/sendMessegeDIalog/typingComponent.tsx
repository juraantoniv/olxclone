import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@material-ui/core";
import SendIcon from "@mui/icons-material/Send";
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

import { useAppDispatch } from "../../store/store";
import s from "./typeMessege.module.css";

const Schema = z.object({
  message: z.string().min(1),
});

export type FormType = z.infer<typeof Schema>;

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

  const onSubmit = (data: FormType) => {
    console.log(data);
    try {
      toast.info(`Welcome in our platform!`, {
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
    <Box
      className={s.form}
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <DialogTitle>Message</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To to send to this website, please enter your message here.
        </DialogContentText>
        <TextField
          {...register("message")}
          autoFocus
          required
          margin="dense"
          id="name"
          name="message"
          label="type your message"
          type="text"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button endIcon={<SendIcon />} type="submit">
          Send message
        </Button>
      </DialogActions>
    </Box>
  );
};
