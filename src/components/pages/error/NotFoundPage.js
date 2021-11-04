import React from "react";
import { ThemeProvider, StyledEngineProvider, createTheme } from "@mui/material/styles";
import makeStyles from '@mui/styles/makeStyles';
const useStyles = makeStyles((theme) => ({
  content: {
    display: "flex",
    justifyContent: "center",
  },
}));

const theme = createTheme();

const NotFoundPage = () => {
  const classes = useStyles();
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div className={`page ${classes.content}`}>
          <img
            width={600}
            alt="not found"
            src={`${process.env.PUBLIC_URL}/assets/background/error404.jpg`}
          />
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default NotFoundPage;
