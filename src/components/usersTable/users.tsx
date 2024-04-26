// import { Box } from "@material-ui/core";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { CircularProgress, ListItemIcon } from "@mui/material";
// import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
// import * as React from "react";
// import { useEffect, useState } from "react";
//
// import { UserInfoType } from "../../common/types/types";
// import { userService } from "../../services/auth.service";
// import { EditUserModal } from "../adminComponents/editUserComponent";
// import { DeleteUserModal } from "../deleteUserModal/deleteUserModal";
// import s from "./table.module.css";
//
// const columns: GridColDef[] = [
//   { field: "id", headerName: "ID", width: 120 },
//   {
//     field: "name",
//     headerName: "Name",
//     width: 130,
//     renderCell: (params) => <EditUserModal text={params.value} />,
//   },
//   { field: "city", headerName: "City", width: 50 },
//   { field: "age", headerName: "Age", width: 50 },
//   { field: "email", headerName: "Email", width: 130 },
//   {
//     field: "active",
//     headerName: "Active",
//     width: 130,
//     cellClassName: (params) => (params.value === "active" ? `` : `${s.red}`),
//   },
//   { field: "role", headerName: "Role", width: 130 },
//   { field: "userPremiumRights", headerName: "PremiumRights", width: 130 },
// ];
//
// export const UsersDataTable = () => {
//   const [item, setItem] = useState<string>("");
//   const [users, setUsers] = useState<UserInfoType[]>([]);
//   const [open, setOpen] = React.useState(false);
//   const onChange = (params: GridCellParams) => {
//     if (params.formattedValue === "no") {
//       setItem(params.row.id);
//     } else {
//       setItem("");
//     }
//   };
//
//   useEffect(() => {
//     userService.getAllUsers().then((data) => {
//       console.log(data.data);
//       setUsers(data.data);
//     });
//   }, []);
//
//   const handleOpen = () => {
//     setOpen(true);
//   };
//
//   return (
//     <Box style={{ height: 400, width: "60%" }}>
//       <Box className={s.iconBox}>{item ? <DeleteUserModal /> : null}</Box>
//
//       <DataGrid
//         onRowClick={handleOpen}
//         rows={users}
//         columns={columns}
//         onCellClick={(params) => onChange(params)}
//         initialState={{
//           pagination: {
//             paginationModel: { page: 0, pageSize: 5 },
//           },
//         }}
//         pageSizeOptions={[5, 10]}
//         checkboxSelection
//       />
//     </Box>
//   );
// };

import { GridColDef } from "@mui/x-data-grid";
import * as React from "react";
import { useEffect, useState } from "react";

import { UserInfoType } from "../../common/types/types";
import { userService } from "../../services/auth.service";
import { EditUserModal } from "../adminComponents/editUserComponent";
import { UniversalTableComponent } from "../universalTable/table";
import s from "./users.module.css";

const columns: GridColDef[] = [
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
      console.log(data.data);
      setUsers(data.data);
    });
  }, []);

  const setId = (id: string) => {
    console.log(id);
  };
  return (
    <>
      <UniversalTableComponent columns={columns} data={users} setId={setId} />
    </>
  );
};
