import ChatIcon from "@mui/icons-material/Chat";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import * as React from "react";
import { useSelector } from "react-redux";

import { selectUser } from "../../store/store";
import { TypingComponent } from "./typingComponent";

type SendMessageDialogType = {
  id: string;
};

export const FormDialog: React.FC<SendMessageDialogType> = ({ id }) => {
  const [open, setOpen] = React.useState(false);
  const user = useSelector(selectUser);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        endIcon={<ChatIcon />}
        variant="contained"
        onClick={handleClickOpen}
        disabled={!user.name || user.id === id}
      >
        Send message
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <TypingComponent close={handleClose} id={id} />
      </Dialog>
    </React.Fragment>
  );
};
