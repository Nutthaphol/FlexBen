import React, { useEffect, useState, Fragment } from "react";

import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";

import { makeStyles, styled } from "@mui/styles";
import Themplates from "../theme";
import SlideArrow from "../slideArrow";

import Slider from "react-slick";

import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Star,
} from "@mui/icons-material";
import { Box, Card, Dialog, DialogContent } from "@mui/material";

const theme = createTheme(Themplates);

const useStyles = makeStyles(() => ({}));

const MultiImage = ({ listImage }) => {
  const [slide1, setSlide1] = useState(0);
  const [slide2, setSlide2] = useState(0);
  const [open, setOpen] = useState(false);

  const settings1 = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => setSlide1(next),
    afterChange: (current) => setSlide2(current),
  };
  const settings2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: slide1,
    nextArrow: <SlideArrow Comp={KeyboardArrowRight} />,
    prevArrow: <SlideArrow Comp={KeyboardArrowLeft} />,
  };

  const ProductImgStyle = styled("img")({
    top: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    position: "absolute",
    borderRadius: "16px",
  });

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Box>
          <Slider {...settings1} style={{ display: "flex" }}>
            {listImage.map((val, index) => (
              <Box
                key={index}
                display="flex"
                justifyContent="center"
                // sx={{ cursor: "pointer", maxHeight: 400 }}
                sx={{ pt: "480px", position: "relative" }}
                onClick={() => setOpen(true)}
              >
                <ProductImgStyle
                  src={`${process.env.REACT_APP_URL}image/${val}`}
                />
              </Box>
            ))}
          </Slider>
        </Box>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogContent>
            <Box sx={{ padding: "20px" }}>
              {
                <Slider {...settings2} ref={(slider) => slide2 == slider}>
                  {listImage.map((val, index) => (
                    <Box key={index}>
                      <Box
                        display="flex"
                        justifyContent="center"
                        sx={{
                          cursor: "pointer",
                          maxHeight: 500,
                          overflow: "auto",
                        }}
                      >
                        <img
                          style={{
                            overflow: "auto",
                            maxWidth: 720,
                            height: "100%",
                          }}
                          src={`${process.env.REACT_APP_URL}image/${val}`}
                          // height="100%"
                        />
                      </Box>
                    </Box>
                  ))}
                </Slider>
              }
              <br />
            </Box>
          </DialogContent>
        </Dialog>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default MultiImage;
