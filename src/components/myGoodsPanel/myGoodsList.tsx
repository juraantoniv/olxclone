import { Box } from "@material-ui/core";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { DataGoods, GoodsType, UserInfoType } from "../../common/types/types";
import { carsApiService } from "../../services/goods.service";
import { selectUser, setGoodOwner } from "../../store/store";
import { DeleteUserModal } from "../deleteUserModal/deleteUserModal";
import { EditableGoods } from "../editableDialogGoods/editableGoods";
import s from "./myGoodsList.module.css";
const goodsColum: GridColDef[] = [
  { field: "id", headerName: "ID", width: 120 },
  {
    field: "title",
    headerName: "Title",
    width: 120,
    renderCell: (params) => (
      <EditableGoods text={params.value} item={params.row} />
    ),
  },

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

export const MyGoodsList = () => {
  const [goods, setGoods] = useState<DataGoods[]>([]);
  const [item, setItem] = useState<string>("");
  const user = useSelector(selectUser);

  useEffect(() => {
    carsApiService.getMyGoods().then((goods) => {
      setGoods(goods.data.data);
    });
  }, [user]);

  const setId = (id: string) => {
    console.log(id);
  };

  const onChange = (params: GridCellParams) => {
    if (params.formattedValue === "no") {
      setItem(params.row.id);
      setId(params.row.id);
    } else {
      setItem("");
    }
  };

  return (
    <>
      <Box style={{ height: 400, width: "60%" }}>
        <Box className={s.iconBox}>{item ? <DeleteUserModal /> : null}</Box>

        <DataGrid
          rows={goods}
          columns={goodsColum}
          onCellClick={(params) => onChange(params)}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </Box>
    </>
  );
};
