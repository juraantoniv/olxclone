import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Card, Divider, Modal } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";
import { Trans } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { DataGoods, UserInfoType } from "../../common/types/types";
import { adminService, userService } from "../../services/auth.service";
import { goodsApiService } from "../../services/goods.service";
import { useAppDispatch } from "../../store/store";
import s from "./delteUserModal.module.css";

type DeleteUserModalType = {
  mode: boolean;
  id: string;
  setGoods?: (data: DataGoods[]) => void;
  userId?: string | undefined;
  setUsers?: (users: UserInfoType[]) => void;
};

export const DeleteModal: React.FC<DeleteUserModalType> = ({
  mode,
  id,
  userId,
  setGoods,
  setUsers,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteHandler = async () => {
    try {
      mode
        ? await adminService.deleteUser(userId)
        : await goodsApiService.deleteGood(id);

      mode ? toast.info("User was deleted") : toast.info("Goods was deleted");
      const goods = await goodsApiService.getUserGoods(userId!);
      if (setGoods) {
        setGoods(goods.data);
      }
      const users = await userService.getAllUsers();
      if (setUsers) {
        setUsers(users.data);
      }
      handleClose();
    } catch (e) {
      console.log(e);
    }
  };

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
              onClick={deleteHandler}
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
