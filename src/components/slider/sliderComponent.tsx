import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import * as React from "react";

function valuetext(value: number) {
  return `${value}  "$`;
}

const marks = [
  {
    value: 1000,
    label: "1000$",
  },
  {
    value: 10000,
    label: "1000$",
  },
  {
    value: 100000,
    label: "99999$",
  },
];

export const RangeSlider = () => {
  const [value, setValue] = React.useState<number[]>([0, 10000]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <Box>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="on"
        getAriaValueText={valuetext}
        step={5000}
        min={1000}
        max={99999}
        marks={marks}
      />
    </Box>
  );
};
