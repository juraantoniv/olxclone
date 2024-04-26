import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { ListItemIcon, MenuItem } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

type AdminMenuType = {
  close: () => void;
};

export const AdminModal: React.FC<AdminMenuType> = ({ close }) => {
  const navigate = useNavigate();

  const handleClickOpen = () => {
    navigate("admin");
    close();
  };

  return (
    <div>
      <MenuItem onClick={handleClickOpen}>
        <ListItemIcon>
          <AdminPanelSettingsIcon fontSize={"small"} />
        </ListItemIcon>
        Admin panel
      </MenuItem>
    </div>
  );
};
