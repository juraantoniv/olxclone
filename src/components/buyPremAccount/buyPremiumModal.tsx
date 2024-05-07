import InventoryIcon from "@mui/icons-material/Inventory";
import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React from "react";

import { CreditCardForm } from "./buyPremAccount";

export const BuyPremiumModal = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box>
      <Button
        onClick={handleClickOpen}
        startIcon={<InventoryIcon />}
        variant="contained"
      >
        Buy
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box>
          <CreditCardForm />
        </Box>
      </Modal>
    </Box>
  );
};
