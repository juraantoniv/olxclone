import "./styles.css";

import LoginIcon from "@mui/icons-material/Login";
import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React from "react";
import { useNavigate } from "react-router-dom";

import { SignIn } from "../loginComponent/loginComponentNew";

type LoginDiagType = {
  close?: () => void;
};

export const LoginDiag: React.FC<LoginDiagType> = ({ close }) => {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    navigate("/");
  };

  const handleClose = () => {
    setOpen(false);
    if (close) {
      close();
    }
  };
  return (
    <Box>
      <Button
        onClick={handleClickOpen}
        startIcon={<LoginIcon />}
        variant="contained"
      >
        Login
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box>
          <SignIn
            closeModal={close ? close : undefined}
            callback={handleClose}
          />
        </Box>
      </Modal>
    </Box>
  );
};
