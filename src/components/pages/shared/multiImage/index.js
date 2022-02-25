import React, { useEffect, useState, Fragment, useRef } from "react";

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
  ArrowLeft,
  ArrowRight,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Star,
} from "@mui/icons-material";
import {
  Box,
  Card,
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

const theme = createTheme(Themplates);

const useStyles = makeStyles(() => ({}));

const MultiImage = ({ listImage }) => {
  const [slide, setSlide] = useState(0);
  // const [slide2, setSlide2] = useState(0);
  const [slideDialog, setSlideDialog] = useState(0);
  const [open, setOpen] = useState(false);
  const sliderRef = useRef(null);
  const sliderRef2 = useRef(null);

  const settings1 = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (current) => setSlide(current),
  };
  const settings2 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: slide,
    afterChange: (current) => setSlideDialog(current),
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Box sx={{ position: "relative" }}>
          <Slider {...settings1} ref={sliderRef}>
            {listImage.map((val, index) => (
              <Box
                onClick={() => {
                  setOpen(true);
                  setSlideDialog(slide);
                }}
                key={val + index}
                sx={{
                  height: "360px",
                  position: "relative",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                <Box
                  component="img"
                  src={`${process.env.REACT_APP_URL}image/${val}`}
                  sx={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    objectFit: "scale-down",
                  }}
                />
              </Box>
            ))}
          </Slider>
          <Box
            sx={{
              position: "absolute",
              bottom: "5%",
              right: "5%",
              bgcolor: "rgba(22, 28, 36,0.48)",
              borderRadius: "8px",
              p: "4px",
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <IconButton
                sx={{
                  p: 0,
                  color: "rgba(255,255,255, 0.7)",
                  "&:hover": {
                    color: "rgba(255,255,255,1)",
                  },
                }}
                onClick={() => sliderRef.current.slickPrev()}
              >
                <ArrowLeft />
              </IconButton>
              <Typography
                variant="subtitle2"
                sx={{
                  p: 0,
                  color: "rgba(255,255,255, 1)",
                }}
              >
                {slide + 1}/{listImage.length}
              </Typography>
              <IconButton
                sx={{
                  p: 0,
                  color: "rgba(255,255,255, 0.7)",
                  "&:hover": {
                    color: "rgba(255,255,255,1)",
                  },
                }}
                onClick={() => sliderRef.current.slickNext()}
              >
                <ArrowRight />
              </IconButton>
            </Stack>
          </Box>
        </Box>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogContent sx={{ overflow: "hidden", position: "relative" }}>
            {
              <Slider {...settings2} ref={sliderRef2}>
                {listImage.map((val, index) => (
                  <Box
                    key={index}
                    sx={{
                      height: "480px",
                      position: "relative",
                      borderRadius: "8px",
                      overflowY: "overlay",
                    }}
                  >
                    <Box
                      component="img"
                      src={`${process.env.REACT_APP_URL}image/${val}`}
                      sx={{
                        position: "absolute",
                        height: "auto",
                        width: "100%",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  </Box>
                ))}
              </Slider>
            }
            <Box
              sx={{
                position: "absolute",
                bottom: "5%",
                right: "5%",
                bgcolor: "rgba(22, 28, 36,0.48)",
                borderRadius: "8px",
                p: "4px",
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <IconButton
                  sx={{
                    p: 0,
                    color: "rgba(255,255,255, 0.7)",
                    "&:hover": {
                      color: "rgba(255,255,255,1)",
                    },
                  }}
                  onClick={() => sliderRef2.current.slickPrev()}
                >
                  <ArrowLeft />
                </IconButton>
                <Typography
                  variant="subtitle2"
                  sx={{
                    p: 0,
                    color: "rgba(255,255,255, 1)",
                  }}
                >
                  {slideDialog + 1}/{listImage.length}
                </Typography>
                <IconButton
                  sx={{
                    p: 0,
                    color: "rgba(255,255,255, 0.7)",
                    "&:hover": {
                      color: "rgba(255,255,255,1)",
                    },
                  }}
                  onClick={() => sliderRef2.current.slickNext()}
                >
                  <ArrowRight />
                </IconButton>
              </Stack>
            </Box>
          </DialogContent>
        </Dialog>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default MultiImage;
