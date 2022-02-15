import {
  ArrowBackIosNew,
  ArrowForwardIos,
  ArrowLeft,
  ArrowRight,
  Inventory2,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  PersonAdd,
  SelfImprovement,
  Widgets,
} from "@mui/icons-material";
import {
  Container,
  Paper,
  Typography,
  Grid,
  Button,
  Divider,
  List,
  ListItem,
  Stack,
  Link,
  IconButton,
} from "@mui/material";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React, { useState, useEffect, Fragment, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllInsurance } from "../../actions/insurance";
import SlideArrow from "./shared/slideArrow";
import Slider from "react-slick";
import { getAllUsers, getUserProfile } from "../../actions/user";
import ProductCard from "./shared/card/ProductCard";
import { getAllPackage } from "../../actions/package";
import AddCoinCard from "./shared/card/AddCoinCard";
import { getAllMainCategory } from "../../actions/mainCategory";
import Themplates from "./shared/theme";
import CategoryCard from "./shared/card/CategoryCard";
import { Link as RouterLink } from "react-router-dom";
import SliderCustom from "./shared/SliderCustom/SliderCustom";

// import "../../utils/slick.css";

const theme = createTheme(Themplates);

const useStyles = makeStyles(() => ({
  root: {
    // marginTop: 30,
  },
  // paper: {
  //   // boxShadow: "0 0 1px 1px #D0D3D4",
  //   // border: "1px solid #ECF8FF",
  //   boxShadow:
  //     "rgb(50 50 93 / 2%) 0px 2px 5px -1px, rgb(0 0 0 / 5%) 0px 1px 3px -1px;",
  //   padding: "1.75rem",
  //   borderRadius: "16px",
  // },
  slider: {
    // width: "700px",
  },
  divider: {
    marginTop: "1.25rem",
    marginBottom: "1rem",
  },
  boxSlider: {
    paddingTop: "15px",
    paddingBottom: "15px",

    "&:hover": {
      // transform: "scale(1.05)",
      // transition: "transform .2s",
    },
  },
  sectionText: {
    fontWeight: 600,
  },
  buttonView: {
    textTransform: "none",
    "&:hover": {
      background: "none",
    },
  },
  headerText: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
}));

const Home = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { result: insurance } = useSelector((state) => state.insurance);
  const { result: mainCategory } = useSelector((state) => state.mainCategory);
  const { result: package_ } = useSelector((state) => state.package_);
  const { user: currentUser } = useSelector((state) => state.auth);
  const { result: users } = useSelector((state) => state.users);
  const sliderRef = useRef(null);
  const [setting] = useState({
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 1,
    adaptiveHeight: false,
    // nextArrow: <SlideArrow Comp={KeyboardArrowRight} />,
    // prevArrow: <SlideArrow Comp={KeyboardArrowLeft} />,
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

  useEffect(() => {
    dispatch(getAllInsurance());
    dispatch(getAllMainCategory());
    dispatch(getAllPackage());
    dispatch(getAllUsers());
    // if (currentUser) {
    //   dispatch(getUserProfile());
    // }
  }, []);

  return (
    <div className={`page`}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Container maxWidth="xl">
            <Stack direction="row" justifyContent="space-between">
              <Stack direction="row" spacing={2} alignItems="center">
                <Inventory2 color="error" />
                <Typography variant="h5" gutterBottom>
                  Top Package
                </Typography>
              </Stack>
              <Link
                to=""
                color="inherit"
                underline="hover"
                component={RouterLink}
              >
                <Typography
                  component="span"
                  variant="body2"
                  color="text.secondary"
                >
                  See more
                </Typography>
              </Link>
            </Stack>
            <SliderCustom>
              {package_ &&
                package_
                  .filter((item) => item.rating > 4)
                  .map((val, index) => (
                    <Box key={index} className={classes.boxSlider}>
                      <ProductCard
                        path="detailPackage"
                        id={val.id}
                        image={`${process.env.REACT_APP_URL}image/${val.image[0]}`}
                        primaryText={val.name}
                        listDetail={val.property}
                        count={val.count}
                        price={val.price}
                        rating_={val.rating}
                        currency="$"
                      />
                    </Box>
                  ))}
            </SliderCustom>

            {/* <Box sx={{ position: "relative" }}>
              <Slider {...setting} className={classes.slider} ref={sliderRef}>
                {package_ &&
                  package_
                    .filter((item) => item.rating > 4)
                    .map((val, index) => (
                      <Box key={index} className={classes.boxSlider}>
                        <ProductCard
                          path="detailPackage"
                          id={val.id}
                          image={`${process.env.REACT_APP_URL}image/${val.image[0]}`}
                          primaryText={val.name}
                          listDetail={val.property}
                          count={val.count}
                          price={val.price}
                          rating_={val.rating}
                          currency="$"
                        />
                      </Box>
                    ))}
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
                  transition:
                    "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;",
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
                  transition:
                    "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;",
                  color: "rgba(255,255,255, 0.7)",
                }}
                onClick={() => sliderRef.current.slickNext()}
              >
                <ArrowRight sx={{}} />
              </IconButton>
            </Box> */}

            <Box sx={{ margin: "32px 0" }} />

            <Stack direction="row" justifyContent="space-between">
              <Stack direction="row" spacing={2} alignItems="center">
                <SelfImprovement color="success" />
                <Typography variant="h5" gutterBottom>
                  Top Insurun
                </Typography>
              </Stack>
              <Link
                to=""
                color="inherit"
                underline="hover"
                component={RouterLink}
              >
                <Typography
                  component="span"
                  variant="body2"
                  color="text.secondary"
                >
                  See more
                </Typography>
              </Link>
            </Stack>

            <SliderCustom>
              {insurance &&
                insurance
                  // .slice(0, 4)
                  .filter((item) => item.popular)
                  .map((val, index) => (
                    <Box className={classes.boxSlider} key={index}>
                      <ProductCard
                        path="detailInsurance"
                        image={`${process.env.REACT_APP_URL}image/${val.image[0]}`}
                        secondaryText={val.company}
                        price={val.price}
                        primaryText={val.name}
                        id={val.id}
                        // rating={val.rating}
                        count={val.count}
                        type={val.type}
                      />
                    </Box>
                  ))}
            </SliderCustom>
            {/* <Box sx={{ position: "relative" }}>
              <Slider {...setting} className={classes.slider}>
                {insurance &&
                  insurance
                    // .slice(0, 4)
                    .filter((item) => item.popular)
                    .map((val, index) => (
                      <Box className={classes.boxSlider} key={index}>
                        <ProductCard
                          path="detailInsurance"
                          image={`${process.env.REACT_APP_URL}image/${val.image[0]}`}
                          secondaryText={val.company}
                          price={val.price}
                          primaryText={val.name}
                          id={val.id}
                          // rating={val.rating}
                          count={val.count}
                          type={val.type}
                        />
                      </Box>
                    ))}
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
                  transition:
                    "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;",
                  color: "rgba(255,255,255, 0.7)",
                }}
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
                  transition:
                    "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;",
                  color: "rgba(255,255,255, 0.7)",
                }}
              >
                <ArrowRight sx={{}} />
              </IconButton>
            </Box> */}

            <Box sx={{ margin: "32px 0" }} />

            {currentUser.roles.includes("ROLE_MANAGER") && (
              <Fragment>
                <Stack direction="row" justifyContent="space-between">
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    sx={{ mb: 2 }}
                  >
                    <PersonAdd color="info" />
                    <Typography variant="h5">Personalize Coin</Typography>
                  </Stack>
                  <Link
                    to=""
                    color="inherit"
                    underline="hover"
                    component={RouterLink}
                  >
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.secondary"
                    >
                      See more
                    </Typography>
                  </Link>
                </Stack>
                {users &&
                  users
                    .filter((item) => item.id != currentUser.id)
                    .slice(0, 1)
                    .map((val, index) => (
                      <Box key={index}>
                        <AddCoinCard user={val} />
                      </Box>
                    ))}
              </Fragment>
            )}

            <Box sx={{ margin: "32px 0" }} />

            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ mb: 2 }}
            >
              <Widgets color="error" />
              <Typography variant="h5">Category</Typography>
            </Stack>
            <Grid container spacing={4} justifyContent="center">
              {mainCategory &&
                mainCategory.map((val, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
                    <CategoryCard categoryText={val.name} icon={val.icon} />
                  </Grid>
                ))}
            </Grid>

            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </Container>
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
};

export default Home;
