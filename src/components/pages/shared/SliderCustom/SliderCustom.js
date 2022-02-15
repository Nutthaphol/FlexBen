import React, { useState, useEffect, Fragment, useRef } from "react";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Slider from "react-slick";
import { Box } from "@mui/system";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const SliderCustom = ({ children }) => {
  const sliderRef = useRef(null);

  const [setting] = useState({
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 5,
    initialSlide: 1,
    adaptiveHeight: false,
    responsive: [
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
  return (
    <Box sx={{ position: "relative", display: !children ? "none" : "" }}>
      <Slider {...setting} ref={sliderRef}>
        {children}
      </Slider>
      <IconButton
        sx={{
          position: "absolute",
          p: 1,
          bgcolor: "rgba(22, 28, 36,0.48)",
          borderRadius: "16px",
          bottom: "50%",
          "&:hover": {
            backgroundColor: "rgba(22, 28, 36,1)",
            transform: "scale(1.09) translate(0px)",
            color: "rgba(255,255,255, 1)",
          },
          color: "rgba(255,255,255, 0.7)",
        }}
        onClick={() => sliderRef.current.slickPrev()}
      >
        <ArrowLeft sx={{ color: "#fff" }} />
      </IconButton>
      <IconButton
        sx={{
          position: "absolute",
          right: "0",
          p: 1,
          bgcolor: "rgba(22, 28, 36,0.48)",
          borderRadius: "16px",
          bottom: "50%",
          "&:hover": {
            backgroundColor: "rgba(22, 28, 36,1)",
            transform: "scale(1.09) translate(0px)",
            color: "rgba(255,255,255, 1)",
          },
          color: "rgba(255,255,255, 0.7)",
        }}
        onClick={() => sliderRef.current.slickNext()}
      >
        <ArrowRight sx={{}} />
      </IconButton>
    </Box>
  );
};

export default SliderCustom;
