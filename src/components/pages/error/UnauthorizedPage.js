import React from "react";
import { ThemeProvider, StyledEngineProvider, createTheme } from "@mui/material/styles";

import makeStyles from '@mui/styles/makeStyles';

const theme = createTheme();

const useStyles = makeStyles((theme) => ({
  content: {
    display: "flex",
    justifyContent: "center",
  },
}));

const UnauthorizedPage = () => {
  const classes = useStyles();
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div className={`page ${classes.content}`}>
          <img
            width={600}
            alt="unauthorized"
            src={`${process.env.PUBLIC_URL}/assets/background/error401.png`}
          />
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default UnauthorizedPage;
