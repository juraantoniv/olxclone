import "./styles.css";
import "react-toastify/dist/ReactToastify.css";

import { zodResolver } from "@hookform/resolvers/zod";
import SaveIcon from "@mui/icons-material/Save";
import { Box, Button, Card, TextField } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import { authService } from "../../services/auth.service";
import { userActions } from "../../store/slices";
import { useAppDispatch } from "../../store/store";
import s from "./changePassword.module.css";

type ChangePasswordType = {
  closeModal: () => void;
};

const Schema = z
  .object({
    old_password: z.string().min(1).max(10),
    new_password1: z.string().min(1).max(10),
    new_password2: z.string().min(1).max(10),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => data.new_password1 === data.new_password2, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type FormTypeForChangePassword = z.infer<typeof Schema>;

export const ChangePassword: React.FC<ChangePasswordType> = ({
  closeModal,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormTypeForChangePassword>({
    resolver: zodResolver(Schema),
  });
  const dispatch = useAppDispatch();
  const onSubmit = async (data: FormTypeForChangePassword) => {
    try {
      await authService.changePassword(data);
      toast.info("Password was changed, please login with new password", {
        type: "success",
        theme: "colored",
      });
      closeModal();
    } catch (e) {
      toast.error("Something went wrong", {
        type: "error",
        theme: "colored",
      });
    }
  };

  return (
    <Card
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      className={s.container}
      variant={"outlined"}
    >
      <Typography component={"p"}>
        Change your password here. After saving, you'll be logged out.
      </Typography>
      <TextField
        {...register("old_password")}
        name="old_password"
        type="password"
        size={"small"}
        label="Current password"
        helperText={errors.old_password?.message}
        error={!!errors.old_password?.message}
      />
      <TextField
        {...register("new_password1")}
        name={"new_password1"}
        type="text"
        size={"small"}
        label="New password"
        helperText={errors.new_password1?.message}
        error={!!errors.new_password1?.message}
      />
      <TextField
        {...register("new_password2")}
        name={"new_password2"}
        type="text"
        size={"small"}
        label={"Confirm password"}
        helperText={errors.new_password2?.message}
        error={!!errors.new_password2?.message}
      />

      {!!errors.confirmPassword?.message ? (
        <Typography style={{ color: "red" }} variant={"subtitle2"}>
          Passwords do not match
        </Typography>
      ) : null}
      <Button variant={"contained"} type={"submit"} startIcon={<SaveIcon />}>
        Change password
      </Button>
    </Card>
  );
};
