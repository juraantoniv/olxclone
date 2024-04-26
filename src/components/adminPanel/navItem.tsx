import { Box } from "@material-ui/core";
import GroupIcon from "@mui/icons-material/Group";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import { Button, ListItemButton } from "@mui/material";
import { alpha } from "@mui/material/styles";
import React from "react";
import { useNavigate } from "react-router-dom";

export const NavItem = () => {
  const navigate = useNavigate();

  const redirectHandler = (nav: string) => {
    navigate(nav);
  };

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Button
        style={{ cursor: "pointer" }}
        onClick={() => redirectHandler("dashboard")}
        variant={"contained"}
        startIcon={<QueryStatsIcon />}
      >
        Dashboard
      </Button>
      <Button
        style={{ cursor: "pointer" }}
        onClick={() => redirectHandler("user")}
        variant={"contained"}
        startIcon={<GroupIcon />}
      >
        Users
      </Button>
      <Button
        startIcon={<ProductionQuantityLimitsIcon />}
        style={{ cursor: "pointer" }}
        variant={"contained"}
        onClick={() => redirectHandler("products")}
      >
        Products
      </Button>
    </Box>
  );
};
