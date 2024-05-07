import { Box } from "@material-ui/core";
import { Divider, ListItem, MenuItem } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import { useNavigate } from "react-router-dom";

import { Conversation } from "../../common/scrips/commonMessages";
import { ProfileAvatar } from "../avatar/profileAvatar";
import { AllMessages } from "./allMesseges";

type RenderedItemsType = {
  data: Conversation[];
};

export const RenderedItems: React.FC<RenderedItemsType> = ({ data }) => {
  const navigate = useNavigate();

  const navigateTo = (id: string) => {
    navigate(`messages/${id}`);
  };
  return (
    <Box>
      {data.map((conversation) => (
        <MenuItem onClick={() => navigateTo(conversation.receiverId)}>
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <ProfileAvatar id={conversation.receiverId} />
            <AllMessages data={conversation.messages} />
          </Box>
        </MenuItem>
      ))}
    </Box>
  );
};
