import { Box } from "@material-ui/core";
import { Divider } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

import s from "./adminPanel.module.css";
import { RenderedMenu } from "./renderedMenu";

export const AdminPanel = () => {
  return (
    <Box
      style={{
        width: "100%",
        justifyContent: "center",
      }}
    >
      <Box className={s.adminModule}>
        <RenderedMenu />
        <Divider component={"span"} orientation={"vertical"} />
        <Outlet />
      </Box>
    </Box>
  );
};
