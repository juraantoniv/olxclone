import { Box } from "@material-ui/core";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import { AxiosError } from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { goodsApiService } from "../../services/goods.service";
import { goodIdSelected, selectUser } from "../../store/store";

export const AddFavorite = () => {
  const id = useSelector(goodIdSelected);
  const user = useSelector(selectUser);

  const addFavoriteHandler = async () => {
    try {
      const response = await goodsApiService.addFavorite(id);
      toast.info(`${response.data}`);
    } catch (e: any) {
      console.log(e);
      toast.error(`${e.response.data.messages}`);
    }
  };

  return (
    <Box>
      <IconButton onClick={addFavoriteHandler} disabled={!user.name}>
        <FavoriteIcon />
      </IconButton>
    </Box>
  );
};
