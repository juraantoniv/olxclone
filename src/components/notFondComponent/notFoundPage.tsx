import { Box } from "@material-ui/core";
import React from "react";

import { NotFoundSvgPage } from "../../common/iconsAndSVGComponents/notFoundPage";
import s from "./notFoundPage.module.css";

export const NotFoundPage = () => {
  console.log("NotFoundPage");
  return (
    <Box className={s.box}>
      <NotFoundSvgPage />
    </Box>
  );
};
