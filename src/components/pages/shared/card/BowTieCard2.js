import React, { useRef, useState } from "react";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Themplates from "../../shared/theme";
import { Box, Grid, Icon, Paper, Typography } from "@mui/material";

const theme = createTheme(Themplates);

const useStyles = makeStyles(() => ({
  root: {
    position: "relative",
    width: "100%",
    boxShadow: "rgb(3 0 71 / 9%) 0px 1px 3px",
    contain: "content",
    padding: 0,
    backgroundColor: "#121212",
    color: "#fff",
    backgroundImage:
      "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
    minHeight: "160px",
    alignItems: "center",
    display: "flex",
  },
  rootW: {
    position: "relative",
    width: "100%",
    boxShadow: "rgb(3 0 71 / 9%) 0px 1px 3px",
    contain: "content",
    padding: 0,
    minHeight: "160px",
    alignItems: "center",
    display: "flex",
  },
  Arrow: {
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
  iconStyle: {
    position: "relative",
    fontSize: "4rem",
  },
  mainText: {
    fontWeight: "400",
    color: "#42a5f5",
  },
  unit: {
    fontWeight: "700",
    color: "#0288d1",
  },
  ribbon: {
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
  ribbonText: {
    fontWeight: "600",
    color: "#241a02",
  },
  content: {
    height: "100px",
    display: "flex",
    justifyContent: "center",
  },
  centerBox: {
    display: "flex",
    justifyContent: "center",
  },
}));

const BowTieCard2 = ({
  category,
  imageIcon,
  value,
  unit,
  typeBow,
  longText = false,
  themes = "dark",
}) => {
  const chartRef = useRef();
  const classes = useStyles();
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Box sx={{ position: "relative" }}>
          <Paper className={themes == "light" ? classes.rootW : classes.root}>
            {typeBow == 1 ? (
              <Box className={classes.Arrow}>
                <Typography variant="subtitle1" component="div">
                  {category && category.toUpperCase()}
                </Typography>
              </Box>
            ) : typeBow == 2 ? (
              <Box className={classes.ribbon}>
                <Typography
                  variant="subtitle1"
                  component="div"
                  className={classes.ribbonText}
                >
                  {category && category.toUpperCase()}
                </Typography>
              </Box>
            ) : (
              ""
            )}
            <Box
              className={classes.centerBox}
              sx={{ flexGrow: 1, flexBasis: 0 }}
            >
              <Icon className={classes.iconStyle}>
                <img
                  src={`${process.env.PUBLIC_URL}/assets/icons/other/${imageIcon}`}
                  width="100%"
                />
              </Icon>
            </Box>
            <Box
              className={classes.centerBox}
              sx={{ flexGrow: 1, flexBasis: 0 }}
            >
              <Typography
                variant={longText ? "h4" : "h2"}
                className={classes.mainText}
              >
                {value}
              </Typography>
            </Box>
            <Box
              className={classes.centerBox}
              sx={{ flexGrow: 1, flexBasis: 0 }}
            >
              <Typography
                variant={longText ? "h6" : "h5"}
                className={classes.unit}
                component="span"
              >
                {unit}
              </Typography>
            </Box>
          </Paper>
        </Box>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default BowTieCard2;
