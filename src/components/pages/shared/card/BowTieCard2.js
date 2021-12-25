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
    // minHeight: "140px",
    contain: "content",
    padding: 0,
  },
  Arrow: {
    backgroundColor: "#7da6ee",
    boxShadow: "rgb(3 0 100 / 80%) 0px 2px 4px",
    height: "100px",
    width: "100px",
    left: "-50px",
    top: "-50px",
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
    color: "rgb(34, 86, 127)",
  },
  unit: {
    fontWeight: "700",
    color: "rgba(34, 86, 127, 0.9)",
  },
  ribbon: {
    width: "200px",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    position: "relative",
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
}));

const BowTieCard2 = ({ category, imageIcon, value, unit, typeBow }) => {
  const chartRef = useRef();
  const classes = useStyles();
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Box sx={{ position: "relative" }}>
          <Paper className={classes.root}>
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
            <Box className={classes.content}>
              <Grid container justifyContent="center" sx={{ height: "100%" }}>
                <Grid item sx={{ textAlign: "center" }} xs={4}>
                  <Icon className={classes.iconStyle}>
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/icons/other/${imageIcon}`}
                      width="100%"
                    />
                  </Icon>
                </Grid>
                <Grid item sx={{ textAlign: "center" }} xs={4}>
                  <Typography variant="h2" className={classes.mainText}>
                    {value}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={4}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                    padding: "20px",
                  }}
                >
                  <Typography
                    variant="h5"
                    className={classes.unit}
                    component="span"
                  >
                    {unit}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Box>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default BowTieCard2;
