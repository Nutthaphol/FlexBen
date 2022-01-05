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
  root: {
    position: "relative",
    width: "100%",
    boxShadow: "rgb(3 0 71 / 9%) 0px 1px 3px",
    minHeight: "140px",
    contain: "content",
    padding: 0,
    backgroundColor: "#121212",
    color: "#fff",
    backgroundImage:
      "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
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
    top: "15%",
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
  chartBox: {
    position: "absolute",
    width: "100%",
    bottom: "-30px",
  },

  topBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
}));

const BowTieCard1 = ({
  category,
  imageIcon,
  value,
  unit,
  data,
  stack,
  themes,
}) => {
  //   const [series, setSeries] = useState(data.series);
  //   const [option, setOption] = useState(data.option);
  const chartRef = useRef();
  //   const  = props;
  const classes = useStyles();
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Paper className={classes.root}>
          <Box className={classes.topBox}>
            <Box className={classes.Arrow}>
              <Typography variant="subtitle1" component="div">
                {category && category.toUpperCase()}
              </Typography>
            </Box>
            <Grid container justifyContent="center">
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
                  <Typography
                    variant="h5"
                    className={classes.unit}
                    component="span"
                  >
                    {unit}
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={4}></Grid>
            </Grid>
          </Box>
          <Box className={classes.chartBox}>
            {data && (
              <ReactApexChart
                options={data.option}
                series={data.series}
                type="area"
                height={`110px`}
              />
            )}
          </Box>
        </Paper>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default BowTieCard1;
