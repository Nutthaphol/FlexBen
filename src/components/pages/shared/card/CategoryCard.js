import React, { useState, useEffect, Fragment } from "react";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Themplates from "../theme";
import { Icon, Link, Paper, Typography } from "@mui/material";

const theme = createTheme(Themplates);

const useStyles = makeStyles(() => ({
  root: {
    padding: "1.25rem",
    boxShadow: "rgb(3 0 71 / 16%) 0px 1px 3px",
    position: "relative",
    transition: "box-shadow .3s",
    // "&:hover": {
    //   // transform: "scale(1.05)",
    //   // transition: "transform .2s",
    //   boxShadow: "rgb(3 0 71 / 12%) 0px 0px 24px",
    // },
    // margin: "0px 0 40px",
  },
}));

const CategoryCard = (props) => {
  const classes = useStyles();
  const { categoryText, path = "/", icon } = props;

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Link href={path} underline="none">
          <Paper className={classes.root} sx={{ textAlign: "center" }}>
            <Icon sx={{ fontSize: "4.5rem" }}>
              <img
                src={`${process.env.PUBLIC_URL}/assets/icons${icon}`}
                width="100%"
              />
            </Icon>
            <br />
            <Typography variant="subtitle1" component="div">
              {categoryText}
            </Typography>
          </Paper>
        </Link>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default CategoryCard;
