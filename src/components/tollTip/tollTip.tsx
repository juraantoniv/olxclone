import { Avatar, Box, Tooltip } from "@material-ui/core";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonIcon from "@mui/icons-material/Person";
import { Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import React from "react";
import { useSelector } from "react-redux";

import { selectCount, selectUser } from "../../store/store";
import { RecoveryPasswordDiag } from "../forgotPassword/recoveryPasswordDiag";
import { AdminModal } from "../myAccountForm/AdminMenu";
import { CrateAccountModal } from "../myAccountForm/crateAccountModal";
import { MyAccountModal } from "../myAccountForm/myAccountModal";
const settings = ["Profile", "Account", "Dashboard", "Logout"];
export const TollTip = () => {
  const user = useSelector(selectUser);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  console.log(user);
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar src={user.avatar} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          {user.email}
        </MenuItem>
        <Divider
          component={"div"}
          style={{ width: "100%" }}
          variant={"fullWidth"}
        />
        <CrateAccountModal callBack={handleCloseUserMenu} />
        <Divider
          component={"div"}
          style={{ width: "100%" }}
          variant={"fullWidth"}
        />
        <MyAccountModal />
        <Divider
          component={"div"}
          style={{ width: "100%" }}
          variant={"fullWidth"}
        />
        <RecoveryPasswordDiag closeModal={handleCloseUserMenu} />
        <Divider
          component={"div"}
          style={{ width: "100%" }}
          variant={"fullWidth"}
        />
        <AdminModal close={handleCloseUserMenu} />
      </Menu>
    </Box>
  );
};
