import {
  ArrowLeft,
  ArrowRight,
  KeyboardArrowLeft,
  KeyboardArrowRight,
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
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllInsurance } from "../../actions/insurance";
import SlideArrow from "./shared/slideArrow";
import Slider from "react-slick";
import { getAllUsers, getUserProfile } from "../../actions/user";
import ProductCard from "./shared/card/ProductCard";
import BlockCard from "./shared/card/BlockCard";
import { getAllPackage } from "../../actions/package";
import PackageCard from "./shared/card/PackageCard";
import AddCoinCard from "./shared/card/AddCoinCard";
import { getAllMainCategory } from "../../actions/mainCategory";
import Themplates from "./shared/theme";

const theme = createTheme(Themplates);

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 30,
  },
  paper: {
    margin: "10px",
  },
  slider: {},
  divider: {
    marginTop: "1.25rem",
    marginBottom: "1rem",
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
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 5,
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
            <Grid container className={classes.root}>
              <Grid item xs={12} style={{ display: "flex" }}>
                <Typography variant="h4" gutterBottom>
                  Top Package
                </Typography>
                <Box style={{ flexGrow: 1 }} />
                <Button variant="text" size="small" href="allPackages">
                  see more
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Slider {...setting} className={classes.slider}>
                  {package_ &&
                    package_
                      .filter((item) => item.rating > 4)
                      .map((val, index) => (
                        <PackageCard
                          path="detailPackage"
                          id={val.id}
                          key={index}
                          image={`${process.env.REACT_APP_URL}image/${val.image}`}
                          name={val.name}
                          property={val.property}
                          count={val.count}
                          price={val.price}
                          class_={val.class}
                          rating={val.rating}
                        />
                      ))}
                </Slider>
              </Grid>
              <Grid item xs={12}>
                <Divider className={classes.divider} />
              </Grid>
              <Grid item xs={12} style={{ display: "flex" }}>
                <Typography variant="h4" gutterBottom>
                  Top Insurun
                </Typography>
                <Box style={{ flexGrow: 1 }} />
                <Button variant="text" size="small" href="allInsurance">
                  see more
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Slider {...setting} className={classes.slider}>
                  {insurance &&
                    insurance
                      .filter((item) => item.rating > 4)
                      .map((val, index) => (
                        <ProductCard
                          path="detailInsurance"
                          key={index}
                          image={`${process.env.REACT_APP_URL}image/${val.image}`}
                          head={val.highLights}
                          price={val.price}
                          name={val.name}
                          id={val.id}
                          rating={val.rating}
                          count={val.count}
                          type={val.type}
                        />
                      ))}
                </Slider>
              </Grid>
              <Grid item xs={12}>
                <Divider className={classes.divider} />
              </Grid>

              <Grid item xs={12} style={{ display: "flex" }}>
                <Typography variant="h4" gutterBottom>
                  Personalize Coin
                </Typography>
                <Box style={{ flexGrow: 1 }} />
                <Button variant="text" size="small">
                  see more
                </Button>
              </Grid>
              <Grid item xs={12} sx={{ marginBottom: "10px" }}>
                {users &&
                  users
                    .filter((item) => item.id != currentUser.id)
                    .slice(0, 1)
                    .map((val, index) => (
                      <AddCoinCard key={index} user={val} />
                    ))}
              </Grid>
              <Grid item xs={12}>
                <Divider className={classes.divider} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h4" gutterBottom>
                  Category
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid
                  container
                  spacing={5}
                  sx={{ padding: "1rem" }}
                  justifyContent="center"
                >
                  {mainCategory &&
                    mainCategory.map((val, index) => (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        xl={2}
                        key={index}
                      >
                        <BlockCard name={val.name} />
                      </Grid>
                    ))}
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
};

export default Home;
