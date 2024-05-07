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
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Trans } from "react-i18next";
import { z } from "zod";

import { useAppDispatch } from "../../store/store";

const Schema = z.object({
  region: z.string().min(1),
  description: z.string().min(1, { message: "error" }),
  title: z.string().min(1, { message: "error" }),
  price: z.string().min(1, { message: "error" }),
  image: z.any(),
});

export type FormType = z.infer<typeof Schema>;

export const PostGoodDialog = () => {
  const {
    handleSubmit,
    register,
    // control,
    formState: { errors },
  } = useForm<FormType>({
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
  const onSubmit = (data: FormType) => {
    try {
      handleClose();
    } catch (e) {}
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
        aria-describedby="alert-dialog-description"
      >
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
                {...register("price")}
                name={"price"}
                helperText="Please enter price "
                size={"small"}
                id="demo-helper-text-aligned-no-helper"
                label="price"
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
