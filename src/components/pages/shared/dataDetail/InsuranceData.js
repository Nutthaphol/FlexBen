import React, { useState, useEffect, Fragment } from "react";

import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";

import { makeStyles } from "@mui/styles";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Paper,
  Dialog,
  DialogContent,
} from "@mui/material";
import { Box, display } from "@mui/system";
import {
  Close,
  Done,
  DoneAll,
  Star,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";
import { amber, green, red } from "@mui/material/colors";
import Themplates from "../theme";
import reviewService from "../../../../services/review.service";
import Slider from "react-slick";
import SlideArrow from "../slideArrow";
const theme = createTheme(Themplates);
const useStyles = makeStyles(() => ({
  root: {
    padding: "1rem",
    boxShadow: "0 0 1px 1px D0D3D4",
    border: "1px solid #D0D3D4",
  },
  cardMedia: {
    // position: "flex",
    width: "100%",
    height: "auto",
    maxHeight: "30vh",
    backgroundColor: "white",
    objectFit: "cover",
    borderStyle: "solid",
    borderWidth: "1px 1px",
    marginTop: "1.5rem",
    borderColor: "#D0D3D4",
  },
}));

const InsuranceData = ({ detail }) => {
  const classes = useStyles();

  const [slide1, setSlide1] = useState(0);
  const [slide2, setSlide2] = useState(0);
  const [rating, setRating] = useState();
  const [open, setOpen] = useState(false);

  useEffect(async () => {
    if (rating == null) {
      const review = await reviewService.getAllReviews().then((response) => {
        return response.data;
      });

      const compRating = () => {
        let rating = 0;
        let count = 0;
        if (review) {
          review
            .filter((item) => item.type == "lifestyle")
            .map((item) => {
              rating = rating + item.rating;
              count++;
            });
          rating = rating / count;
        }
        return rating.toFixed(2);
      };

      const avgRat = compRating();
      setRating(avgRat);
    }
  }, [rating]);

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

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Paper className={classes.root}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant={"h4"} sx={{ fontWeight: "700" }} gutterBottom>
              {detail.name.toUpperCase()}
              <Typography
                variant={"h6"}
                sx={{ fontWeight: "700" }}
                color="text.secondary"
                component="div"
              >
                {detail.company}
              </Typography>
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Typography variant="h5" gutterBottom>
              <Grid container spacing={1}>
                <Grid item>
                  <Star sx={{ color: amber[500] }} />
                </Grid>
                <Grid item>{rating && rating}</Grid>
              </Grid>
            </Typography>
          </Box>
          <Box sx={{ border: "1px solid #D0D3D4", padding: "20px" }}>
            <Slider {...settings1} style={{ display: "flex" }}>
              {detail.image.map((val, index) => (
                <Fragment key={index}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    sx={{ cursor: "pointer", maxHeight: 400 }}
                    onClick={() => setOpen(true)}
                  >
                    <img
                      style={{ overflow: "auto" }}
                      src={`${process.env.REACT_APP_URL}image/${val}`}
                      height={400}
                    />
                  </Box>
                </Fragment>
              ))}
            </Slider>
            <br />
          </Box>
          <br />
          <Divider />
          <br />
          <Typography variant="h5" component="div">
            {detail.name} จาก {detail.company}
          </Typography>
          <Typography variant="subtitle1" component="span">
            <Box component="span" margin="16px" />
            {detail.detail}
          </Typography>
          <br />
          <br />
          <Divider />
          <br />
          <Typography variant="h5" component="div">
            ความคุ้มครอง
          </Typography>
          <List>
            {detail.protection.map((val, index) => (
              <ListItem key={index} secondaryAction={<i>{val.content} </i>}>
                <b>{val.section}:</b>
              </ListItem>
            ))}
          </List>
          <br />
          <Divider />
          <br />
          <Typography variant="h5" component="div">
            เงื่อนไขความคุ้มครอง
          </Typography>
          <Typography
            variant="subtitle1"
            component="span"
            sx={{ display: "flex" }}
          >
            <Box component="span" margin="16px" />
            ระเวลาในการคุ้มครองนาน {detail.protectionPeriod} ปี
            <Box sx={{ flexGrow: 1 }} />
            <Button variant="contained" href={detail.link} target="_blank">
              คลิก เพื่อดูเงื่อนไขโดยละเอียด
            </Button>
          </Typography>
          <br />
          <br />
        </Paper>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogContent>
            <Box sx={{ padding: "20px" }}>
              {
                <Slider
                  {...settings2}
                  style={{ display: "flex" }}
                  ref={(slider) => slide2 == slider}
                >
                  {detail.image.map((val, index) => (
                    <Fragment key={index}>
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        sx={{
                          maxHeight: 500,
                          overflow: "auto",
                          height: "100%",
                        }}
                      >
                        <img
                          style={{ overflow: "auto" }}
                          src={`${process.env.REACT_APP_URL}image/${val}`}
                          height="100%"
                        />
                      </Box>
                    </Fragment>
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

export default InsuranceData;
