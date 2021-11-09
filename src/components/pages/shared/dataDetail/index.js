import React from "react";

import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";

import { makeStyles } from "@mui/styles";
import {
  Button,
  Card,
  CardActions,
  CardMedia,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Close, Done } from "@mui/icons-material";

const theme = createTheme();
const useStyles = makeStyles(() => ({
  root: {
    padding: "1rem",
  },
  cardMedia: {
    position: "flex",
    width: "50%",
    height: "100%",
    //     height: "40vh",
    //     backgroundColor: "white",
    //     width: "100%",
    //     objectFit: "cover",
  },
}));

const DataDetail = ({ detail }) => {
  const classes = useStyles();
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Card className={classes.root}>
          <CardMedia
            className={classes.cardMedia}
            component="img"
            image={`${process.env.REACT_APP_URL}image/Insurance/${detail.image}`}
          />
        </Card>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default DataDetail;
