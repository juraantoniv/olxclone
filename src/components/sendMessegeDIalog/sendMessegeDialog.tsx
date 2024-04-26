import ChatIcon from "@mui/icons-material/Chat";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import * as React from "react";

import { TypingComponent } from "./typingComponent";

export const FormDialog = () => {
  const [open, setOpen] = React.useState(false);

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
      >
        Send message
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <TypingComponent close={handleClose} />
      </Dialog>
    </React.Fragment>
  );
};
