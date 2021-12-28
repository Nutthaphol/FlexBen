import React from "react";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { makeStyles, Paper } from "@mui/material";
import Themplates from "../theme";

const theme = createTheme(Themplates);

const useStyles = makeStyles(() => ({}));

const RightTreatment = (props) => {
  const {} = props;
  return (
    <div>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Paper></Paper>
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
};

export default RightTreatment;
