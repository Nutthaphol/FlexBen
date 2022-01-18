import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";

import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";

import { makeStyles } from "@mui/styles";
import { Star } from "@mui/icons-material";

import {
  Card,
  Container,
  Drawer,
  Grid,
  Paper,
  Typography,
  Divider,
} from "@mui/material";

import SalesBox from "../../shared/salesBox";
import ReviewsCard from "../../shared/card/ReviewCard";
import itemService from "../../../../services/item.service";
import Sticky from "react-stickynode";
import Themplates from "../../shared/theme";
import reviewService from "../../../../services/review.service";
import { Box } from "@mui/system";
import { amber } from "@mui/material/colors";
import MultiImage from "../../shared/multiImage";
const theme = createTheme(Themplates);

const useStyles = makeStyles(() => ({
  paper: {
    padding: "1rem",
  },
  header: {
    marginBottom: "1.25rem",
  },
  paragraph: {
    marginRight: "10px",
  },
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
}));

const DetailItem = (props) => {
  const classes = useStyles();
  const [id, setId] = useState();
  const [detail, setDetail] = useState();
  const dispatch = useDispatch();

  const { result: delivery } = useSelector((state) => state.delivery);

  const [rating, setRating] = useState();

  useEffect(async () => {
    const fetchData = async () => {
      const id_ = props.match.params.id;
      setId(id_);
      console.log("fetch id ", id_);
      const data = await itemService.getDetailItem(id_);
      console.log(data.data);
      setDetail(data.data);
    };

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

    if (props.match.params.id) {
      fetchData();
    }
  }, [rating]);

  return (
    <div className={`page`}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          {detail && (
            <Container maxWidth="xl" sx={{ display: "flex" }}>
              <Grid container spacing={4}>
                <Grid item lg={8} md={8} xs={12}>
                  <Paper className={classes.root}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography
                        variant={"h4"}
                        sx={{ fontWeight: "700" }}
                        gutterBottom
                      >
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
                      <MultiImage listImage={detail.image} />
                      <br />
                    </Box>
                    <br />
                    <Divider />
                    <br />
                    <Typography variant="h5" component="div">
                      {detail.name} ({detail.brand})
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
                      การรับประกัน
                    </Typography>
                    <Typography variant="subtitle1" component="span">
                      <Box component="span" margin="16px" />
                      {detail.warranty} ปี: {detail.warrantyDetail}
                    </Typography>
                    <br />
                    <br />
                    <Divider />
                    <br />
                    <Typography variant="h5" component="div">
                      การขนส่ง
                    </Typography>
                    <Typography variant="subtitle1" component="div">
                      <Box component="span" margin="16px" />
                      ระบบขนส่งแบบ{" "}
                      {delivery &&
                        delivery.find((item) => item.id == detail.deliveryType)
                          .name}
                    </Typography>
                    <Typography variant="subtitle1" component="div">
                      <Box component="span" margin="16px" />
                      ใช้ระยะเวลาในการส่ง {detail.deliveryTime} วัน
                    </Typography>
                    <Typography variant="subtitle1" component="div">
                      <Box component="span" margin="16px" />
                      ค่าจัดส่ง {detail.deliveryCost} Coin
                    </Typography>
                  </Paper>
                  <br />
                  <ReviewsCard type={"lifestyle"} />
                </Grid>
                <Grid item lg={4} md={4} xs={12}>
                  <Sticky enabled={true} top={70}>
                    <SalesBox detail={detail} type="lifestyle" />
                  </Sticky>
                </Grid>
              </Grid>
            </Container>
          )}
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
};

export default DetailItem;
