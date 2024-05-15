import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import * as React from "react";
import { KeyboardEvent, useState } from "react";

import { userThunks } from "../../store/slices";
import { useAppDispatch } from "../../store/store";
import GroupedSelect from "../selectRegion/selectRegion";

export default function CustomizedInputBase() {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const search = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setTitle(event.currentTarget.value);
  };

  const addItemHandler = () => {
    if (title.trim() !== "") {
      console.log("ok");
      dispatch(userThunks.fetchGoods({ search: title }));
      setTitle("");
    } else {
      setError("Title is required");
      dispatch(userThunks.fetchGoods());
    }
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null);
    }
    if (e.charCode === 13) {
      addItemHandler();
    }
  };

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 6px 4px 6px",
        display: "flex",
        alignItems: "center",
        width: "60%",
        margin: "15px 10px",
      }}
    >
      <IconButton color="primary" sx={{ p: "10px" }} aria-label="directions">
        <MenuIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search"
        onChange={search}
        onKeyPress={onKeyPressHandler}
      />
      <GroupedSelect />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton color="primary" sx={{ p: "10px" }} aria-label="directions">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
