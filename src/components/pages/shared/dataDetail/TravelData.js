import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";

import { makeStyles } from "@mui/styles";
import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Paper,
  Typography,
  IconButton,
  Dialog,
  DialogContent,
  Icon,
  CardActionArea,
} from "@mui/material";
import { Box, width } from "@mui/system";
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Star,
} from "@mui/icons-material";
import { amber } from "@mui/material/colors";
import Themplates from "../theme";
import reviewService from "../../../../services/review.service";
import Slider from "react-slick";
import ShowImage from "../showImage/ShowImage";
import { getAllDelivery } from "../../../../actions/delivery";
import SlideArrow from "../slideArrow";
import { getAllFacilities } from "../../../../actions/facilities";

const theme = createTheme(Themplates);

const useStyles = makeStyles(() => ({
  root: {
    padding: "1rem",
    boxShadow: "rgb(3 0 71 / 9%) 0px 1px 3px",
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
  headTyphography: {
    fontSize: "24px",
    marginBottom: "24px",
    fontWeight: "400",
  },
}));

const TravelData = (props) => {
  const { detail } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const { result: facilities } = useSelector((state) => state.facilities);

  const [rating, setRating] = useState();
  const [open, setOpen] = useState(false);

  const [slide1, setSlide1] = useState(0);
  const [slide2, setSlide2] = useState(0);

  useEffect(async () => {
    dispatch(getAllFacilities());

    if (rating == null) {
      const review = await reviewService.getAllReviews().then((response) => {
        return response.data;
      });

      const compRating = () => {
        let rating = 0;
        let count = 0;
        if (review) {
          review
            .filter((item) => item.type == "travel")
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
          <Typography
            variant="h5"
            component="div"
            className={classes.headTyphography}
          >
            {detail.name} ({detail.location.province})
          </Typography>
          <Typography variant="subtitle1" component="span">
            <Box component="span" margin="16px" />
            {detail.detail}
          </Typography>
          <br />
          <br />
          <Divider />
          <br />
          <Typography
            variant="h5"
            component="div"
            className={classes.headTyphography}
          >
            สิ่งอำนวนความสะดวก
          </Typography>
          <Grid
            container
            spacing={2}
            alignItems={`center`}
            justifyContent={`center`}
          >
            {facilities &&
              facilities.map((item, index) => (
                <Grid item key={index}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      width: "200px",
                    }}
                  >
                    <Card
                      sx={{
                        height: "50px",
                        //   maxWidth: "160px",
                        width: "100%",
                        borderRadius: "50px",
                        boxShadow: "0px 0px 1px 1px #D0D3D4",
                        // backgroundColor: "#B8E7FF",
                        textAlign: "center",
                        height: "100%",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        component="div"
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          marginRight: "15px",
                          marginLeft: "15px",
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Icon fontSize="small">
                        <img
                          src={`${process.env.PUBLIC_URL}/assets/icons/${item.icon}`}
                          width={`100%`}
                        />
                      </Icon>
                    </Card>
                  </Box>
                </Grid>
              ))}
          </Grid>
          <br />
          <Divider />
          <br />
          <Typography
            variant="h5"
            component="div"
            className={classes.headTyphography}
          >
            ที่อยู่
          </Typography>
          <Typography variant="subtitle1" component="div">
            <Box component="span" margin="16px" />
            {detail.location.houseNO} ถนน{detail.location.road} ตำบล/แขวง
            {detail.location.subDistrict} อำเภอ/เขต{detail.location.district}{" "}
            จังหวัด{detail.location.province} {detail.location.code} <br />{" "}
          </Typography>
          <Typography variant="subtitle1" component="div">
            <Box component="span" margin="16px" />
            ประเทศ{detail.location.country}
          </Typography>
          <Typography variant="subtitle1" component="div">
            <Box component="span" margin="16px" />
            สถานที่ใกล้เคียง:{" "}
            {detail.nearby.map((val, index) => {
              return index == 0 ? val : ", " + val;
            })}
          </Typography>
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
                        sx={{
                          cursor: "pointer",
                          maxHeight: 500,
                          overflow: "auto",
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

export default TravelData;
