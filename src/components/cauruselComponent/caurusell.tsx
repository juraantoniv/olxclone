import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styless.css";

import { Box, Card, CardMedia } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import Slider from "react-slick";

import { selectCars } from "../../store/store";
import s from "./caulrosell.module.css";

export const ReactSlick = () => {
  const goods = useSelector(selectCars);
  const settings = {
    className: "center",
    centerMode: true,
    focusOnSelect: true,
    infinite: true,
    centerPadding: "100px",
    slidesToShow: 3,
    speed: 500,
    autoplay: true,
    cssEase: "linear",
  };

  return (
    <Card className={s.box}>
      <Slider key="slider-on" {...settings}>
        {goods?.data?.map((good) => (
          <Card>
            <Typography>{good?.title}</Typography>
            <CardMedia
              sx={{ borderRadius: "10px" }}
              component="img"
              height="100"
              image={
                !good.image?.includes("null")
                  ? good.image
                  : "https://www.shutterstock.com/image-vector/no-image-available-vector-illustration-260nw-744886198.jpg"
              }
            />
            <Typography>{good?.price} UAH</Typography>
            <Typography fontStyle={"oblique"} fontSize={"large"}>
              {good.location}
            </Typography>
          </Card>
        ))}
      </Slider>
    </Card>
  );
};
