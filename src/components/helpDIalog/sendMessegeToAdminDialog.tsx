import { Box } from "@material-ui/core";
import HelpIcon from "@mui/icons-material/Help";
import { Card } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import * as React from "react";
import { useSelector } from "react-redux";

import { selectUser } from "../../store/store";
import { TypingComponent } from "./typingComponent";

type SendMessageDialogType = {
  id?: string;
};

export const FormDialogHelp: React.FC<SendMessageDialogType> = ({ id }) => {
  const [open, setOpen] = React.useState(false);
  const user = useSelector(selectUser);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Button
        endIcon={<HelpIcon />}
        variant="contained"
        onClick={handleClickOpen}
        disabled={!user.name || user.id === id}
      >
        Help
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <TypingComponent close={handleClose} />
      </Dialog>
    </Box>
  );
};
