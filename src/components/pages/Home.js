import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
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
import { getUserProfile } from "../../actions/user";
import HighlightCard from "./shared/card/HighlightCard";
import { getCategory } from "../../actions/category";
import BlockCard from "./shared/card/BlockCard";
import { getAllItem } from "../../actions/item";

const theme = createTheme();

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 30,
  },
  paper: {
    margin: "10px",
  },
  slider: {
    alignItems: "center",
  },
  divider: {
    marginTop: "1.25rem",
    marginBottom: "1rem",
  },
}));

const Home = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { result: insurance } = useSelector((state) => state.insurance);
  const { result: category } = useSelector((state) => state.category);
  const { result: item } = useSelector((state) => state.item);
  const { user: currentUser } = useSelector((state) => state.auth);
  const [setting] = useState({
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 1,
    nextArrow: <SlideArrow icon={<KeyboardArrowRight />} />,
    prevArrow: <SlideArrow icon={<KeyboardArrowLeft />} />,
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
    dispatch(getCategory());
    dispatch(getAllItem());
    // if (currentUser) {
    //   dispatch(getUserProfile());
    // }
  }, []);
  return (
    <div className={`page`}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Container maxWidth="lg">
            <Grid container className={classes.root}>
              <Grid item xs={12} style={{ display: "flex" }}>
                <Typography variant="h4" gutterBottom>
                  Top Insurun
                </Typography>
                <Box style={{ flexGrow: 1 }} />
                <Button variant="text" size="small">
                  see more
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Slider {...setting} className={classes.slider}>
                  {insurance &&
                    insurance
                      .filter((item) => item.rating > 4)
                      .map((val, index) => (
                        <HighlightCard
                          path="detailInsurance"
                          key={index}
                          image={`${process.env.REACT_APP_URL}image/insurance/${val.profileImage}`}
                          head={val.highLights}
                          price={val.price}
                          name={val.name}
                          id={val.id}
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
                  Top Gedget
                </Typography>
                <Box style={{ flexGrow: 1 }} />
                <Button variant="text" size="small">
                  see more
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Slider {...setting} className={classes.slider}>
                  {item &&
                    item
                      .filter((item) => item.rating > 4)
                      .map((val, index) => (
                        <HighlightCard
                          path="detailshopping"
                          key={index}
                          image={`${process.env.REACT_APP_URL}image/${val.image}`}
                          head={val.highLights}
                          price={val.price}
                          name={val.name}
                          id={val.id}
                          rating={val.rating}
                        />
                      ))}
                </Slider>
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
                <Grid container spacing={5} sx={{ padding: "1rem" }}>
                  {category &&
                    category.map((val, index) => (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        xl={2}
                        key={index}
                      >
                        <BlockCard name={val.nameCategory} />
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
