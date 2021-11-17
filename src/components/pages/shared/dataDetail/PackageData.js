import React, { useState } from "react";

import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import Slider from "react-slick";
import SlideArrow from "../slideArrow";

import {
  ArrowLeft,
  ArrowRight,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";

import { makeStyles } from "@mui/styles";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Grid,
  Icon,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import { Box, display } from "@mui/system";
import { Close, Done, DoneAll, Star } from "@mui/icons-material";
import { amber, green, red } from "@mui/material/colors";

const theme = createTheme();

const useStyles = makeStyles(() => ({
  root: {
    padding: "1rem",
  },
  cardMedia: {
    // position: "flex",
    width: "100%",
    height: "auto",
    maxHeight: "300px",
    backgroundColor: "white",
    objectFit: "cover",
    borderStyle: "solid",
    borderWidth: "1px 1px",
    marginTop: "1.5rem",
  },
  icons: {
    padding: "10px",
    fontSize: "4rem",
    //     border: "2px solid transparent",
    //     background: "linear-gradient(orange, violet)",
    //     borderImage:"linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
    borderRadius: "50%",
  },
}));
const PackageData = (props) => {
  const { detail } = props;
  const classes = useStyles();

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Card className={classes.root}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant={"h4"} sx={{ fontWeight: "700" }} gutterBottom>
              PACKAGE {detail.name.toUpperCase()} !
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Typography variant="h5" gutterBottom>
              <Grid container spacing={1}>
                <Grid item>
                  <Star sx={{ color: amber[500] }} />
                </Grid>
                <Grid item>{detail.rating}</Grid>
              </Grid>
            </Typography>
          </Box>
          <CardMedia
            className={classes.cardMedia}
            component="img"
            image={`${process.env.REACT_APP_URL}image/${detail.image}`}
          />
          <Box
            sx={{ marginTop: "20px", marginBottom: "20px", width: "100%" }}
            className={classes.divider}
          >
            <Divider sx={{ width: "100%" }} />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: "700" }} gutterBottom>
            {detail.highLights}
          </Typography>
          <Typography variant="subtitle1">
            {" "}
            <span style={{ paddingLeft: "2.5rem" }} />
            {detail.description}
          </Typography>
          <Grid
            container
            sx={{ marginTop: "10px" }}
            spacing={5}
            justifyContent="center"
          >
            {detail.property.map((val, index) => (
              <Grid item key={index}>
                <Card sx={{ padding: "10px", borderRadius: "10px" }}>
                  <CardMedia sx={{ bgcolor: "#595959", borderRadius: "10px" }}>
                    <Icon className={classes.icons}>
                      <img
                        src={`${process.env.PUBLIC_URL}/assets/icons/LifeStyleCoin.svg`}
                        width="100%"
                      />
                    </Icon>
                  </CardMedia>
                  <CardContent>
                    <Typography variant="subtitle1">{val.type}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Card>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default PackageData;
