import { Tooltip } from "@material-ui/core";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useEffect } from "react";

import { UserInfoType } from "../../common/types/types";
import { userService } from "../../services/auth.service";
import s from "./editUserComponent.module.css";
import { EditAccountByAdmin } from "./myAccountByAdmin";

type EditUserComponentType = {
  text: boolean;
  id: string;
  setUsers: (users: any) => void;
};

export const EditUserModal: React.FC<EditUserComponentType> = ({
  text,
  id,
  setUsers,
}) => {
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState<UserInfoType>();

  useEffect(() => {
    userService.getById(id).then(({ data }) => {
      setUser(data);
    });
  }, [id]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Typography align={"center"} sx={{ m: 0, p: 0 }} onClick={handleOpen}>
        {text}
        <Tooltip title="edit">
          <EditIcon fontSize={"small"} />
        </Tooltip>
      </Typography>
      <Modal open={open} onClose={handleClose}>
        <EditAccountByAdmin
          close={handleClose}
          user={user!}
          setUsers={setUsers}
        />
      </Modal>
    </div>
  );
};
