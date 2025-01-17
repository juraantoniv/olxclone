import { PersonAdd } from "@mui/icons-material";
import { ListItemIcon, MenuItem, Modal } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";

import { SignUp } from "./createAccountNew";

type CrateAccountModalType = {
  callBack: () => void;
};

export const CrateAccountModal: React.FC<CrateAccountModalType> = ({
  callBack,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    callBack();
  };
  return (
    <div>
      <MenuItem onClick={handleClickOpen}>
        <ListItemIcon>
          <PersonAdd fontSize="small" />
        </ListItemIcon>
        Add another account
      </MenuItem>
      <Modal open={open} onClose={handleClose}>
        <SignUp closeMenu={handleClose} />
      </Modal>
    </div>
  );
};
