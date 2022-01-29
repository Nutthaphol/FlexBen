import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";

import { makeStyles } from "@mui/styles";

import {
  Box,
  Card,
  Container,
  Drawer,
  Grid,
  Paper,
  Typography,
  Divider,
  Icon,
} from "@mui/material";
import { amber } from "@mui/material/colors";
import { Star } from "@mui/icons-material";
import SalesBox from "../../shared/salesBox";
import ReviewsCard from "../../shared/card/ReviewCard";
import travelService from "../../../../services/travel.service";
import Sticky from "react-stickynode";
import Themplates from "../../shared/theme";
import { getAllFacilities } from "../../../../actions/facilities";
import MultiImage from "../../shared/multiImage";

const theme = createTheme(Themplates);

const useStyles = makeStyles(() => ({
  paper: {
    padding: "1rem",
    // width: "100%",
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
  headTyphography: {
    fontSize: "24px",
    marginBottom: "24px",
    fontWeight: "400",
  },
}));

const DetailTravel = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [id, setId] = useState();
  const [detail, setDetail] = useState();
  const [rating, setRating] = useState();

  const { result: facilities } = useSelector((state) => state.facilities);

  useEffect(async () => {
    dispatch(getAllFacilities());

    const fetchData = async () => {
      const id_ = props.match.params.id;
      setId(id_);
      console.log("fetch id ", id_);
      const data = await travelService.getDetailTravel(id_);
      console.log(data.data);
      setDetail(data.data);
    };

    if (props.match.params.id) {
      fetchData();
    }
  }, []);

  return (
    <div className={`page`}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          {detail && (
            <Container maxWidth="xl" sx={{ display: "flex" }}>
              <Grid container spacing={4}>
                <Grid item lg={8} md={8} xs={12}>
                  {/* use conponent of item  */}
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
                      {detail.location.houseNO} ถนน{detail.location.road}{" "}
                      ตำบล/แขวง
                      {detail.location.subDistrict} อำเภอ/เขต
                      {detail.location.district} จังหวัด
                      {detail.location.province} {detail.location.code} <br />{" "}
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
                  <br />
                  <ReviewsCard type={"travel"} />
                </Grid>
                <Grid item lg={4} md={4} xs={12}>
                  <Sticky enabled={true} top={70}>
                    {/* <SalesBox detail={detail} type="travel" /> */}
                    <SalesBox
                      nameOrder={detail.name}
                      id={detail.id}
                      price={detail.price}
                      discount={detail.discount}
                      transportation={detail.deliveryCost}
                      type="travel"
                    />
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

export default DetailTravel;
