import { Tooltip } from "@material-ui/core";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Modal } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { GridRowId, GridRowModel } from "@mui/x-data-grid/models/gridRows";
import React from "react";

import { DataGoods } from "../../common/types/types";
import { EditableGoodsModal } from "./editGoodsForModal";

type EditableGoodsType = {
  text: string;
  item: GridRowModel<DataGoods>;
};

export const EditableGoods: React.FC<EditableGoodsType> = ({ text, item }) => {
  const [open, setOpen] = React.useState(false);

  console.log(item);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Typography>
        {text}
        <IconButton onClick={handleOpen}>
          <Tooltip title="edit">
            <EditIcon fontSize={"small"} />
          </Tooltip>
        </IconButton>
      </Typography>

      <Modal open={open} onClose={handleClose}>
        <EditableGoodsModal close={handleClose} item={item} />
      </Modal>
    </Box>
  );
};
