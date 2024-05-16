import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ListSubheader from "@mui/material/ListSubheader";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import * as React from "react";
import { useSelector } from "react-redux";

import { userActions } from "../../store/slices";
import { selectUser, useAppDispatch } from "../../store/store";

export default function GroupedSelect() {
  const user = useSelector(selectUser);
  const dispatch = useAppDispatch();
  const onChangeHandler = (event: SelectChangeEvent) => {
    dispatch(userActions.setRegion(event.target.value));
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel htmlFor="grouped-select">Region</InputLabel>
        <Select
          onChange={onChangeHandler}
          defaultValue="AllRegions"
          id="grouped-select"
          label="Region"
          disabled={!user.name}
        >
          <MenuItem value={""}>AllRegions</MenuItem>
          <MenuItem value={"Vinnytska"}>Vinnytska</MenuItem>
          <MenuItem value={"Lutska"}>Lutska</MenuItem>
          <MenuItem value={"Lvivska"}>Lvivska</MenuItem>
          <MenuItem value={"Mykolaivska"}>Mykolaivska</MenuItem>
          <MenuItem value={"Odeska"}>Odeska</MenuItem>
          <MenuItem value={"Poltavska"}>Poltavska</MenuItem>
          <MenuItem value={"Rivnska"}>Rivnska</MenuItem>
          <MenuItem value={"Ternopilska"}>Ternopilska</MenuItem>
          <MenuItem value={"Kyivska"}>Kyivska</MenuItem>
          <MenuItem value={"Kharkivska"}>Kharkivska</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
