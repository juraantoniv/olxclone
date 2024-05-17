import { zodResolver } from "@hookform/resolvers/zod";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { MenuItem, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Trans } from "react-i18next";
import { toast } from "react-toastify";
import { z } from "zod";

import { userThunks } from "../../store/slices";
import { useAppDispatch } from "../../store/store";

const Schema = z.object({
  region: z.string().min(1),
  location: z.string().min(1).max(20),
  category: z.string().min(1),
  description: z.string().min(1, { message: "error" }),
  title: z.string().min(1, { message: "error" }),
  price: z.number().min(1, { message: "error" }).max(99999),
  image: z.any(),
});

export type CreateGoodsType = z.infer<typeof Schema>;

export const PostGoodDialog = () => {
  const {
    handleSubmit,
    register,
    // control,
    formState: { errors },
  } = useForm<CreateGoodsType>({
    resolver: zodResolver(Schema),
  });
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = (data: CreateGoodsType) => {
    try {
      dispatch(userThunks.postGood({ ...data, image: data.image[0] }));
      toast.info("You posted your good");

      handleClose();
    } catch (e: any) {
      toast.info(`${e.message.message}`);
    }
  };

  return (
    <React.Fragment>
      <Button
        startIcon={<AddShoppingCartIcon />}
        variant="contained"
        onClick={handleClickOpen}
      >
        <Trans>Post</Trans>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">
          {"Please add you your good that you want to sell"}
        </DialogTitle>
        <DialogContent>
          <Box>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "10px",
                gap: "20px",
              }}
            >
              <Button
                startIcon={<CloudUploadIcon />}
                variant="contained"
                component="label"
                style={{ margin: "1em" }}
              >
                Upload PHOTO
                <input
                  {...register("image")}
                  name={"image"}
                  type="file"
                  hidden
                />
              </Button>
              <TextField
                {...register("title")}
                name={"title"}
                size={"small"}
                helperText="Please enter model of car"
                id="demo-helper-text-aligned"
                label="title"
                fullWidth
              />
              <TextField
                {...register("description")}
                name={"description"}
                size={"small"}
                multiline
                rows={2}
                maxRows={4}
                helperText="Please describe your car"
                id="demo-helper-text-aligned"
                label="description"
                fullWidth
              />

              <TextField
                {...register("region")}
                name={"region"}
                select
                fullWidth
                size={"small"}
                label="Region"
                defaultValue="Kyivska"
                helperText="Please select region"
              >
                <MenuItem key={"Kyivska"} value={"Kyivska"}>
                  Kyivska
                </MenuItem>
                <MenuItem key={"Lvivska"} value={"Lvivska"}>
                  Lvivska
                </MenuItem>
                <MenuItem key={"Volynska"} value={"Volynska"}>
                  Volynska
                </MenuItem>
                <MenuItem key={"Ternopilska"} value={"Ternopilska"}>
                  Ternopilska
                </MenuItem>
                <MenuItem key={"Zakarpatska"} value={"Zakarpatska"}>
                  Zakarpatska
                </MenuItem>
                <MenuItem key={"Chmelnytska"} value={"Chmelnytska"}>
                  Chmelnytska
                </MenuItem>
              </TextField>

              <TextField
                {...register("category")}
                name={"category"}
                select
                fullWidth
                size={"small"}
                label="Category"
                defaultValue="CARS"
                helperText="Please select category"
              >
                <MenuItem key={"CARS"} value={"CARS"}>
                  CARS
                </MenuItem>
                <MenuItem key={"JOB"} value={"JOB"}>
                  JOB
                </MenuItem>
                <MenuItem key={"FASHION"} value={"FASHION"}>
                  FASHION
                </MenuItem>
                <MenuItem key={"PROPERTY"} value={"PROPERTY"}>
                  PROPERTY
                </MenuItem>
                <MenuItem key={"ELECTRONICS"} value={"ELECTRONICS"}>
                  ELECTRONICS
                </MenuItem>
                <MenuItem key={"FOODS"} value={"FOODS"}>
                  FOODS
                </MenuItem>
                <MenuItem key={"HOME"} value={"HOME"}>
                  HOME
                </MenuItem>
                <MenuItem key={"OTHER"} value={"OTHER"}>
                  OTHER
                </MenuItem>
              </TextField>

              <TextField
                {...register("price", { valueAsNumber: true })}
                name={"price"}
                helperText="Please enter price "
                size={"small"}
                id="demo-helper-text-aligned-no-helper"
                label="price"
                fullWidth
              />
              <TextField
                {...register("location")}
                name={"location"}
                helperText="Please enter location "
                size={"small"}
                id="demo-helper-text-aligned-no-helper"
                label="location"
                fullWidth
              />
              <Button
                startIcon={<PostAddIcon />}
                variant={"contained"}
                type={"submit"}
              >
                Post
              </Button>
            </form>
          </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};
