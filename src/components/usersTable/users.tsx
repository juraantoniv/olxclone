import { GridColDef } from "@mui/x-data-grid";
import * as React from "react";
import { useEffect, useState } from "react";

import { UserInfoType } from "../../common/types/types";
import { userService } from "../../services/auth.service";
import { EditUserModal } from "../adminComponents/editUserComponent";
import { UniversalTableComponent } from "../universalTable/table";
import s from "./users.module.css";

export const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 120 },
  {
    field: "name",
    headerName: "Name",
    width: 130,
    renderCell: (params) => (
      <EditUserModal id={params.row.id} text={params.value} />
    ),
  },
  { field: "city", headerName: "City", width: 50 },
  { field: "age", headerName: "Age", width: 50 },
  { field: "email", headerName: "Email", width: 130 },
  {
    field: "active",
    headerName: "Active",
    width: 130,
    cellClassName: (params) => (params.value === "active" ? `` : `${s.red}`),
  },
  { field: "role", headerName: "Role", width: 130 },
  { field: "userPremiumRights", headerName: "PremiumRights", width: 130 },
];

export const UsersDataTable = () => {
  const [users, setUsers] = useState<UserInfoType[]>([]);

  useEffect(() => {
    userService.getAllUsers().then((data) => {
      setUsers(data.data);
    });
  }, []);

  const setUser = (users: UserInfoType[]) => {
    setUsers(users);
  };
  return (
    <>
      <UniversalTableComponent
        columns={columns}
        data={users}
        setUser={setUser}
      />
    </>
  );
};
