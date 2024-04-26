import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { AxiosError } from "axios";
import React from "react";
import { toast } from "react-toastify";

import { carsApiService } from "../../services/goods.service";

type CarOrderType = {
  id: string;
};

export const CarOrder: React.FC<CarOrderType> = ({ id }) => {
  const toOrderCarHandler = async () => {
    try {
      await carsApiService.orderCar(id);
      toast.info("You ordered a car, a manager will contact you asap");
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        toast.error(`${e?.response?.data.messages.toString()}`);
      }
    }
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <Button
          size={"small"}
          color="primary"
          startIcon={<AddShoppingCartIcon />}
          variant={"contained"}
          sx={{ width: "50%", marginRight: "10px" }}
        ></Button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="AlertDialogOverlay" />
        <AlertDialog.Content className="AlertDialogContent">
          <AlertDialog.Title className="AlertDialogTitle">
            Are you absolutely sure?
          </AlertDialog.Title>
          <AlertDialog.Description className="AlertDialogDescription">
            This action cannot be undone.
          </AlertDialog.Description>
          <div
            style={{
              display: "flex",
              gap: 25,
              justifyContent: "flex-end",
            }}
          >
            <AlertDialog.Cancel asChild>
              <button className="Button mauve">Cancel</button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <Button
                startIcon={<AddShoppingCartIcon />}
                onClick={toOrderCarHandler}
                variant={"contained"}
              >
                Order
              </Button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};
