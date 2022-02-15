import React, { useState, useEffect, Fragment, useRef } from "react";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Slider from "react-slick";
import { Box } from "@mui/system";
import { IconButton } from "@mui/material";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";

const SliderPreview = ({ children }) => {
  const sliderRef = useRef(null);

  const settingMainSlide = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 5,
    initialSlide: 1,
    adaptiveHeight: false,
  };
  return (
    <Box>
      <Slider settingMainSlide>{children}</Slider>
    </Box>
  );
};

export default SliderPreview;
