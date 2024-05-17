import { GridColDef } from "@mui/x-data-grid";
import * as React from "react";
import { useEffect, useState } from "react";

import { DataGoods } from "../../common/types/types";
import { userService } from "../../services/auth.service";
import { goodsApiService } from "../../services/goods.service";
import { EditUserModal } from "../adminComponents/editUserComponent";
import { UniversalTableComponent } from "../universalTable/table";
import s from "./users.module.css";

export const columnsGoods: GridColDef[] = [
  { field: "id", headerName: "ID", width: 120 },
  { field: "title", headerName: "Title", width: 120 },

  { field: "region", headerName: "Region", width: 120 },
  { field: "location", headerName: "Location", width: 120 },
  { field: "price", headerName: "Price", width: 130 },
  {
    field: "active",
    headerName: "Active",
    width: 130,
    cellClassName: (params) => (params.value === "nonActive" ? `${s.red}` : ``),
  },
  { field: "category", headerName: "Category", width: 130 },
  { field: "description", headerName: "Description", width: 160 },
];

export const GoodsDataTable = () => {
  const [users, setUsers] = useState<DataGoods[]>([]);

  useEffect(() => {
    goodsApiService.getAll().then((data) => {
      console.log(data.data);
      setUsers(data.data.data);
    });
  }, []);

  return (
    <>
      <UniversalTableComponent columns={columnsGoods} data={users} />
    </>
  );
};
