import {
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
} from "@mui/material";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React, { useState, useEffect, Fragment } from "react";
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

// import "../../utils/slick.css";

const theme = createTheme(Themplates);

const useStyles = makeStyles(() => ({
  root: {
    // marginTop: 30,
  },
  paper: {
    // boxShadow: "0 0 1px 1px #D0D3D4",
    // border: "1px solid #ECF8FF",
    boxShadow:
      "rgb(50 50 93 / 2%) 0px 2px 5px -1px, rgb(0 0 0 / 5%) 0px 1px 3px -1px;",
    padding: "1.75rem",
    borderRadius: "16px",
  },
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
    color: "rgb(125, 135, 156)",
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
  const [setting] = useState({
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 1,
    adaptiveHeight: false,
    nextArrow: <SlideArrow Comp={KeyboardArrowRight} />,
    prevArrow: <SlideArrow Comp={KeyboardArrowLeft} />,
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
            <Paper className={classes.paper} sx={{ display: "" }}>
              <Box className={classes.headerText}>
                <Typography
                  variant="h4"
                  className={classes.sectionText}
                  gutterBottom
                >
                  <Inventory2 color="error" /> Top Package
                </Typography>
                <Button
                  variant="text"
                  size="small"
                  href="allPackages"
                  className={classes.buttonView}
                >
                  <Typography
                    component="span"
                    variant="body1"
                  >{`See more >>`}</Typography>
                </Button>
              </Box>

              <Slider {...setting} className={classes.slider}>
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
            </Paper>
            <br />
            <br />
            <Paper className={classes.paper}>
              <Box className={classes.headerText}>
                <Typography
                  variant="h4"
                  className={classes.sectionText}
                  gutterBottom
                >
                  <SelfImprovement color="success" /> Top Insurun
                </Typography>
                <Box style={{ flexGrow: 1 }} />
                <Button
                  variant="text"
                  size="small"
                  href="allInsurance"
                  className={classes.buttonView}
                >
                  <Typography
                    component="span"
                    variant="body1"
                  >{`See more >>`}</Typography>{" "}
                </Button>
              </Box>
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
            </Paper>

            <br />
            <br />
            {currentUser.roles.includes("ROLE_MANAGER") && (
              <Paper className={classes.paper}>
                <Box className={classes.headerText}>
                  <Typography
                    variant="h4"
                    gutterBottom
                    className={classes.sectionText}
                  >
                    <PersonAdd color="info" /> Personalize Coin
                  </Typography>
                  <Box style={{ flexGrow: 1 }} />
                  <Button
                    variant="text"
                    size="small"
                    className={classes.buttonView}
                  >
                    <Typography
                      component="span"
                      variant="body1"
                    >{`See more >>`}</Typography>{" "}
                  </Button>
                </Box>
                {users &&
                  users
                    .filter((item) => item.id != currentUser.id)
                    .slice(0, 1)
                    .map((val, index) => (
                      <Box key={index} className={classes.boxSlider}>
                        <AddCoinCard user={val} />
                      </Box>
                    ))}
              </Paper>
            )}

            <br />
            <br />
            <Paper className={classes.paper}>
              <Typography
                variant="h4"
                gutterBottom
                className={classes.sectionText}
              >
                <Widgets color="error" /> Category
              </Typography>
              <Grid
                container
                spacing={5}
                // sx={{ padding: "1rem" }}
                justifyContent="center"
              >
                {mainCategory &&
                  mainCategory.map((val, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
                      <Box key={index} className={classes.boxSlider}>
                        <CategoryCard categoryText={val.name} icon={val.icon} />
                      </Box>
                    </Grid>
                  ))}
              </Grid>
            </Paper>

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
