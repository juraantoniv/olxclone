import { Box } from "@material-ui/core";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import * as React from "react";
import { useState } from "react";

import { UserInfoType } from "../../common/types/types";
import { DeleteUserModal } from "../deleteUserModal/deleteUserModal";
import s from "./table.module.css";

type TableType = {
  columns: GridColDef[];
  data: UserInfoType | any;
  setId: (id: string) => void;
};

export const UniversalTableComponent: React.FC<TableType> = ({
  setId,
  data,
  columns,
}) => {
  const [item, setItem] = useState<string>("");
  const onChange = (params: GridCellParams) => {
    if (params.formattedValue === "no") {
      setItem(params.row.id);
      setId(params.row.id);
    } else {
      setItem("");
    }
  };

  return (
    <Box style={{ height: 400, width: "60%" }}>
      <Box className={s.iconBox}>{item ? <DeleteUserModal /> : null}</Box>

      <DataGrid
        rows={data}
        columns={columns}
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
  );
};
