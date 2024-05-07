import { zodResolver } from "@hookform/resolvers/zod";
import CloseIcon from "@mui/icons-material/Close";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  Divider,
  MenuItem,
} from "@mui/material";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { z } from "zod";

import { UserInfoType } from "../../common/types/types";
import { userService } from "../../services/auth.service";
import s from "./myAccount.module.css";
const Schema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().min(1).optional(),
  age: z.number().min(16).max(99).optional(),
  city: z.string().min(1).optional(),
  status: z.enum(["active", "banned"]).optional(),
});

export type FormTypeForUpdate = z.infer<typeof Schema>;

type MyType = {
  close: () => void;
  user: UserInfoType;
};
export const EditAccountByAdmin: React.FC<MyType> = ({ close, user }) => {
  const [disabled, setDisabled] = useState<boolean>(true);

  const editMode = () => {
    setDisabled(false);
  };

  const {
    handleSubmit,
    register,
    // control,
    formState: { errors, isValid, isSubmitted },
  } = useForm<FormTypeForUpdate>({
    resolver: zodResolver(Schema),
    defaultValues: {
      email: user.email,
      age: user.age,
      city: user.city,
      status: user.active,
      name: user.name,
    },
  });

  const save = () => {
    setDisabled(true);
  };

  const onSubmit = async (data: FormTypeForUpdate) => {
    console.log(data);
    try {
      const user = await userService.updateUserData(data);
      toast.info(`data was saved`);
    } catch (e) {
      console.log(e);
    }
  };

  console.log(errors, isValid, isSubmitted);

  return (
    <Card className={s.box} variant={"outlined"}>
      <Box className={s.headerBox}>
        <Typography>User info</Typography>
        <CloseIcon onClick={close} sx={{ cursor: "pointer" }} />
      </Box>

      <Box component={"form"} noValidate onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Divider variant={"fullWidth"} sx={{ width: "100%" }} />
          </Grid>
          <Grid item xs={6}>
            <TextField
              {...register("name")}
              name={"name"}
              size={"small"}
              label="name"
              defaultValue={user.name}
              disabled={disabled}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              {...register("email")}
              name={"email"}
              size={"small"}
              label="email"
              defaultValue={user.email}
              disabled={disabled}
            />
          </Grid>

          <Grid item xs={4}>
            <Select
              {...register("status")}
              size={"small"}
              fullWidth
              name={"status"}
              label="status"
              defaultValue={user.active}
              disabled={disabled}
            >
              <MenuItem value={"active"}>active</MenuItem>
              <MenuItem value={"banned"}>banned</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={4}>
            <TextField
              {...register("city")}
              name={"city"}
              size={"small"}
              label="city"
              defaultValue={user.city}
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              {...register("age", { valueAsNumber: true })}
              name={"age"}
              size={"small"}
              label="age"
              defaultValue={Number(user.age)}
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={12}>
            <Divider variant={"fullWidth"} sx={{ width: "100%" }} />
          </Grid>
          <Grid item xs={12}>
            <ButtonGroup color={"primary"} sx={{ marginLeft: "50%" }}>
              <Button
                onClick={editMode}
                variant={"contained"}
                disabled={!disabled}
              >
                Edit account
              </Button>
              <Button type={"submit"} onClick={save} variant={"contained"}>
                Save
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};
