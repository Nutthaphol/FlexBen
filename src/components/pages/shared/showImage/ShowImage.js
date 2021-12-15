import React, { Fragment } from "react";

import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { Box } from "@mui/system";

const theme = createTheme();

const ShowImage = ({ data, maxHeight }) => {
  return (
    <Fragment>
      <img src={`${process.env.REACT_APP_URL}image/${data}`} height={400} />
    </Fragment>
  );
};

export default ShowImage;
