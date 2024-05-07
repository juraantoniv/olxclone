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
  message: z.string().min(1),
});

export type FormType = z.infer<typeof Schema>;

type TypingComponentType = {
  close: () => void;
  id: string;
};

export const TypingComponent: React.FC<TypingComponentType> = ({
  close,
  id,
}) => {
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
    console.log(data);
    try {
      await userService.sendMessage(id, data.message);
      toast.info(`You send message`, {
        position: "top-right",
        theme: "colored",
        type: "success",
      });
    } catch (e) {}
  };

  const handleClose = () => {
    close();
  };

  console.error(errors);

  return (
    <Card
      className={s.form}
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
          {...register("message")}
          autoFocus
          required
          margin="dense"
          id="name"
          name="message"
          multiline
          rows={2}
          maxRows={4}
          label="type your message"
          helperText={errors.message?.message}
          error={!!errors.message?.message}
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
