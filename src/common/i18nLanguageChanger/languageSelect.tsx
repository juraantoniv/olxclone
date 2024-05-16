import { Box } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useTranslation } from "react-i18next";

import { userActions } from "../../store/slices";
import { useAppDispatch } from "../../store/store";
import IconComponentLangENG from "../iconsAndSVGComponents/langENG";
import IconComponentLangUA from "../iconsAndSVGComponents/langUA";

export const I18nLanguageChanger = () => {
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();
  const [lang, setLang] = React.useState(language);
  const dispatch = useAppDispatch();

  console.log(language);
  const handleChange = async (event: SelectChangeEvent) => {
    setLang(event.target.value);
    await changeLanguage(event.target.value);
    dispatch(userActions.setLang(event.target.value));
    localStorage.setItem("language", event.target.value);
  };

  return (
    <Box sx={{ margin: "1em" }}>
      <FormControl color={"info"} sx={{ minWidth: 80 }} size={"small"}>
        <InputLabel sx={{ color: "black" }}>Lang</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={lang}
          onChange={handleChange}
          autoWidth
          sx={{ color: "black" }}
          label="eng"
        >
          <MenuItem value={"eng"} divider>
            <span>
              ENG<span> </span>
            </span>
            <IconComponentLangENG />
          </MenuItem>
          <MenuItem value={"ua"} divider>
            <span>
              UA <span> </span>
            </span>
            <IconComponentLangUA />
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
