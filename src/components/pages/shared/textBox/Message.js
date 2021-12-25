import React, { Fragment } from "react";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { Box, Grid, Icon, Paper, Typography } from "@mui/material";
import Themplates from "../../shared/theme";
import { borderRight } from "@mui/system";

const theme = createTheme(Themplates);

const useStyles = makeStyles(() => ({
  root: {
    padding: "20px",
    textAlign: "center",
    position: "relative",
    backgroundColor: "#368dda",
    // border: "solid",
    borderRadius: "50px",
    boxShadow: "0 4px 8px rgb(0 0 0 / 19%), 0 1px 1px rgb(0 0 0 / 23%)",
  },
  message: {
    color: "#fff",
  },
  arrow: {
    width: "0px",
    height: "0px",
    position: "absolute",
    borderLeft: "20px solid #368dda",
    borderRight: "20px solid transparent",
    borderTop: "20px solid #368dda",
    borderBottom: "20px solid transparent",
    top: "90%",
  },
}));

const Message = ({ message }) => {
  const classes = useStyles();
  return (
    <Fragment>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Box className={classes.root}>
            <Typography
              variant="h6"
              component="div"
              className={classes.message}
            >
              {message.map((val, index) => {
                return `${val}`;
              })}
            </Typography>
            <div className={classes.arrow}></div>
          </Box>
        </ThemeProvider>
      </StyledEngineProvider>
    </Fragment>
  );
};

export default Message;
