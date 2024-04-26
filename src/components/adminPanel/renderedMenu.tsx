import { Stack } from "@mui/material";
import React from "react";

import { NavItem } from "./navItem";

export const RenderedMenu = () => {
  return (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
      <NavItem />
    </Stack>
  );
};
