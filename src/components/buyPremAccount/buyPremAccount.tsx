import { FormLabel } from "@material-ui/core";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  FormControl,
  Input,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import * as React from "react";

import s from "./buyPremAccount.module.css";

export const CreditCardForm = () => {
  return (
    <Card variant="outlined" className={s.card}>
      <Typography>Buy PremAccount for one mounth</Typography>
      <CardContent
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(80px, 1fr))",
          gap: 1.5,
        }}
      >
        <FormControl sx={{ gridColumn: "1/-1" }}>
          <FormLabel>Card number</FormLabel>
          <Input type={"outlined"} />
        </FormControl>
        <FormControl>
          <FormLabel>Expiry date</FormLabel>
          <Input />
        </FormControl>
        <FormControl>
          <FormLabel>CVC/CVV</FormLabel>
          <Input />
        </FormControl>
        <FormControl sx={{ gridColumn: "1/-1" }}>
          <FormLabel>Card holder name</FormLabel>
          <Input placeholder="Enter cardholder's full name" />
        </FormControl>
        <CardActions sx={{ gridColumn: "1/-1" }}>
          <Button variant="contained" color="primary">
            Buy
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};
