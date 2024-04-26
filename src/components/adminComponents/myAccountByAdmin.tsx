import { zodResolver } from "@hookform/resolvers/zod";
import CloseIcon from "@mui/icons-material/Close";
import { Button, Card, MenuItem } from "@mui/material";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { z } from "zod";

import { UserInfoType } from "../../common/types/types";
import { userService } from "../../services/auth.service";
import { selectUser } from "../../store/store";
import s from "./myAccount.module.css";
const Schema = z.object({
  name: z.string().min(1),
  age: z.number().min(16).max(99),
  city: z.string().min(1, { message: "error" }),
  status: z.enum(["active", "banned"]),
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
    formState: { errors },
  } = useForm<FormTypeForUpdate>({
    resolver: zodResolver(Schema),
  });

  const save = () => {
    setDisabled(true);
  };

  const onSubmit = async (data: FormTypeForUpdate) => {
    try {
      const user = await userService.updateUserData(data);
      toast.info(`data was saved`);
      console.log(user);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Card className={s.box} variant={"outlined"}>
      <CloseIcon
        onClick={close}
        sx={{ cursor: "pointer", marginLeft: "90%" }}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "10px",
          gap: "10px",
        }}
      >
        <TextField
          {...register("name")}
          name={"name"}
          size={"small"}
          label="name"
          defaultValue={user.name}
          disabled={disabled}
        />
        <Select
          {...register("status")}
          size={"small"}
          autoWidth
          name={"status"}
          label="status"
          defaultValue={user.active}
          disabled={disabled}
        >
          <MenuItem value={"active"}>active</MenuItem>
          <MenuItem value={"banned"}>banned</MenuItem>
        </Select>
        <TextField
          {...register("city")}
          name={"city"}
          size={"small"}
          label="city"
          defaultValue={user.city}
          disabled={disabled}
        />
        <TextField
          {...register("age", { valueAsNumber: true })}
          name={"age"}
          size={"small"}
          label="age"
          defaultValue={Number(user.age)}
          disabled={disabled}
        />
        <Button onClick={editMode}>Edit account</Button>
        <Button type={"submit"} onClick={save}>
          Save
        </Button>
      </form>
    </Card>
  );
};
