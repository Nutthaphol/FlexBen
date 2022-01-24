import React, { useRef } from "react";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Themplates from "../../shared/theme";
import { Box, Grid, Icon, Paper, Typography } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import { useState } from "react";

const theme = createTheme(Themplates);

const useStyles = makeStyles(() => ({
  rootDark: {
    position: "relative",
    width: "100%",
    boxShadow: "rgb(3 0 71 / 16%) 0px 1px 3px",
    minHeight: "140px",
    contain: "content",
    padding: 0,
    backgroundColor: "#121212",
    color: "#fff",
    backgroundImage:
      "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
  },
  rootLight: {
    position: "relative",
    width: "100%",
    boxShadow: "rgb(3 0 71 / 16%) 0px 1px 3px",
    contain: "content",
    padding: 0,
    minHeight: "160px",
    alignItems: "center",
    display: "flex",
  },
  triangleR: {
    backgroundColor: "#7da6ee",
    boxShadow: "rgb(3 0 100 / 80%) 0px 2px 4px",
    height: "120px",
    width: "120px",
    right: "-60px",
    top: "-60px",
    position: "absolute",
    "-webkit-transform": "rotate(45deg)",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    color: "white",
  },
  triangleL: {
    backgroundColor: "#7da6ee",
    boxShadow: "rgb(3 0 100 / 80%) 0px 2px 4px",
    height: "120px",
    width: "120px",
    left: "-60px",
    top: "-60px",
    position: "absolute",
    "-webkit-transform": "rotate(-45deg)",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    color: "white",
  },
  rectangleR: {
    width: "200px",
    position: "absolute",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    display: "inline-block",
    textAlign: "center",
    padding: "5px",
    backgroundColor: "#FFD72A",
    right: "-0px",
    top: "-0px",
    boxShadow: "rgb(20 70 10 / 60%) 0px 1px 2px",
    marginBottom: "10px",
  },
  rectangleL: {
    width: "200px",
    position: "absolute",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    display: "inline-block",
    textAlign: "center",
    padding: "5px",
    backgroundColor: "#FFD72A",
    left: "-0px",
    top: "-0px",
    boxShadow: "rgb(20 70 10 / 60%) 0px 1px 2px",
    marginBottom: "10px",
  },
  mainData: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  centerBox: {
    display: "flex",
    justifyContent: "center",
    flexGrow: 1,
    flexBasis: 0,
    height: "100%",
  },
  iconStyle: {
    position: "relative",
    fontSize: "4rem",
    padding: "16px",
    borderRadius: "50%",
    background: "rgba(30, 144, 255, 0.2)",
  },
  primaryText: {
    fontWeight: "400",
    color: "#42a5f5",
  },
  secondaryText: {
    fontWeight: "700",
    color: "#0288d1",
  },
  chartBox: {
    // position: "relative",

    position: "absolute",
    width: "100%",
    bottom: "-30px",
    zIndex: "-1",
  },
}));

const BowTieCard = (props) => {
  const {
    themes,
    headerknot,
    headerPosition,
    headerknotText,
    imageIcon,
    primaryText,
    secondaryText,
    backgroundData = false,
    fontSmall = false,
  } = props;

  const chartRef = useRef();
  const classes = useStyles();
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Paper
          className={themes == "dark" ? classes.rootDark : classes.rootLight}
        >
          {headerknot == "triangle" ? (
            <Box
              className={
                headerPosition == "right"
                  ? classes.triangleR
                  : classes.triangleL
              }
            >
              <Typography variant="subtitle1" component="div">
                {headerknotText && headerknotText.toUpperCase()}
              </Typography>
            </Box>
          ) : (
            <Box
              className={
                headerPosition == "right"
                  ? classes.rectangleR
                  : classes.rectangleL
              }
            >
              <Typography
                variant="subtitle1"
                component="div"
                sx={{ fontWeight: "600", color: "#241a02" }}
              >
                {headerknotText && headerknotText.toUpperCase()}
              </Typography>
            </Box>
          )}
          <Box
            className={classes.mainData}
            sx={
              backgroundData
                ? { marginTop: "20px" }
                : { margin: "45px 0 35px 0" }
            }
          >
            <Box className={classes.centerBox}>
              <Icon className={classes.iconStyle}>
                <img
                  src={`${process.env.PUBLIC_URL}/assets/icons/other/${imageIcon}`}
                  width="100%"
                />
              </Icon>
            </Box>
            <Box className={classes.centerBox}>
              <Typography
                variant={fontSmall ? "h4" : "h2"}
                className={classes.primaryText}
              >
                {primaryText}
              </Typography>
            </Box>
            <Box className={classes.centerBox}>
              <Typography
                variant={fontSmall ? "h6" : "h5"}
                className={classes.secondaryText}
                component="div"
              >
                {secondaryText}
              </Typography>
            </Box>
          </Box>
          {backgroundData && (
            <Box sx={{ marginTop: "56px" }}>
              <Box className={classes.chartBox}>
                <ReactApexChart
                  options={backgroundData.option}
                  series={backgroundData.series}
                  type="area"
                  height={`110px`}
                />
              </Box>
            </Box>
          )}
        </Paper>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default BowTieCard;
