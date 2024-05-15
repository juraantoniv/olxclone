import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@material-ui/core";
import CloseIcon from "@mui/icons-material/Close";
import { Button, ButtonGroup, Card } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { z } from "zod";

import { DataGoods } from "../../common/types/types";
import { carsApiService } from "../../services/goods.service";
import s from "./editGoodsForModal.module.css";
const Schema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  price: z.number().min(1).max(99999).optional(),
});

export type FormTypeForUpdateModal = z.infer<typeof Schema>;

type EditableGoodsType = {
  close: () => void;
  item: DataGoods;
  setGoods: (data: DataGoods[]) => void;
};
export const EditableGoodsModal: React.FC<EditableGoodsType> = ({
  close,
  item,
  setGoods,
}) => {
  const [disabled, setDisabled] = useState<boolean>(true);
  const editMode = () => {
    setDisabled(false);
  };

  const {
    handleSubmit,
    register,
    // control,
    formState: { errors, isValid },
  } = useForm<FormTypeForUpdateModal>({
    resolver: zodResolver(Schema),
    defaultValues: {
      description: item.description,
      price: item.price,
      title: item.title,
    },
  });

  console.log(errors);

  const save = () => {
    setDisabled(true);
  };

  const onSubmit = async (data: FormTypeForUpdateModal) => {
    try {
      await carsApiService.editGoods(item.id, data);

      const goods = await carsApiService.getMyGoods();
      setGoods(goods.data.data);
      toast.info(`data was saved`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Card className={s.box} variant={"outlined"}>
      <CloseIcon
        onClick={close}
        sx={{
          cursor: "pointer",
          marginLeft: "90%",
        }}
      />
      <Box
        component={"form"}
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container spacing={3} sx={{ width: "100%" }}>
          <Grid item xs={12}>
            <TextField
              {...register("title")}
              name={"title"}
              size={"small"}
              label="title"
              defaultValue={item.title}
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register("price", { valueAsNumber: true })}
              name={"price"}
              size={"small"}
              label="price"
              defaultValue={Number(item.price)}
              disabled={disabled}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              {...register("description")}
              name={"description"}
              size={"small"}
              multiline
              rows={3}
              maxRows={4}
              label="description"
              defaultValue={item.description}
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={12}>
            <ButtonGroup>
              <Button
                variant={"contained"}
                onClick={editMode}
                disabled={!disabled}
              >
                Edit
              </Button>
              <Button variant={"contained"} type={"submit"} onClick={save}>
                Save
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};
