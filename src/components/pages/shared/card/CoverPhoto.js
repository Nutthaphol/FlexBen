import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";

import Themplates from "../theme";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";

const theme = createTheme(Themplates);

const useStyles = makeStyles(() => ({
  root: { overflow: "hidden", height: "300px", width: "100%" },
}));

const CoverPhoto = (props) => {
  const { image } = props;
  const classes = useStyles();
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        {image && (
          <Box
            className={classes.root}
            style={{
              backgroundImage: `url(${process.env.REACT_APP_URL}image${image})`,
            }}
          />
        )}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default CoverPhoto;
