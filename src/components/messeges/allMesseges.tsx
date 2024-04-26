import { Box } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import React from "react";

import { CommonMessagesType } from "../../common/scrips/commonMessages";

type RenderedItemsType = {
  data: CommonMessagesType[];
};

export const AllMessages: React.FC<RenderedItemsType> = ({ data }) => {
  return (
    <Box>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography fontWeight={"bold"}>
          {data[0].title ? data[0].title : "Title"}
        </Typography>
        <Typography>{data[0].message.slice(0, 20)}...</Typography>
      </Box>
    </Box>
  );
};
