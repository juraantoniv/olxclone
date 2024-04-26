import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button, Card, Divider, Modal } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";
import { Trans } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../store/store";
import s from "./delteUserModal.module.css";

export const DeleteUserModal = () => {
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useAppDispatch();
  const logOutHandler = async () => {};

  return (
    <Box>
      <DeleteIcon onClick={handleClickOpen} sx={{ cursor: "pointer" }} />
      <Modal open={open} onClose={handleClose}>
        <Card className={s.modal} variant={"outlined"}>
          <Typography component="div" variant="h6">
            Are you sure
          </Typography>
          <Divider orientation="vertical" variant="middle" />
          <Card className={s.buttons}>
            <Button
              className={s.currentButton}
              onClick={handleClose}
              variant={"contained"}
              size={"medium"}
            >
              Cancel
            </Button>
            <Button
              startIcon={<DeleteIcon />}
              onClick={logOutHandler}
              variant={"contained"}
              size={"medium"}
              className={s.currentButton}
            >
              Delete
            </Button>
          </Card>
        </Card>
      </Modal>
    </Box>
  );
};
