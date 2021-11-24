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
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Close, Done } from "@mui/icons-material";

const theme = createTheme();
const useStyles = makeStyles(() => ({
  root: {
    position: "-webkit-sticky",
    position: "sticky",
    top: "100px",
    width: "100%",
    height: "auto",
    padding: "1rem",
    boxShadow: "none",
    border: "1px solid #D0D3D4",
    // boxShadow:
    //   "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
  },
}));

const SalesBox = ({ detail, type }) => {
  const classes = useStyles();
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Paper className={classes.root} elevation={15}>
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              fontWeight: "600",
              background: "white",
              lineHeight: 1,
              padding: "0 20px",
              marginBottom: "1rem",
              textDecoration: "underline",
            }}
          >
            {" "}
            BUY NOW!
          </Typography>
          <Box sx={{ display: "flex", marginBottom: "1rem" }}>
            <Typography variant="h6">
              {type == "package" ? "Package " + detail.name : detail.name}
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Typography variant="h6">
              {type == "package" ? detail.total : detail.price} $
            </Typography>
          </Box>
          <Button
            sx={{
              marginTop: "1rem",
              padding: "1rem",
              fontSize: "1.25rem",
              fontWeight: "700",
            }}
            fullWidth
            variant="contained"
            color="success"
          >
            Continue ($
            {type == "package" ? detail.total : detail.price} $ )
          </Button>
        </Paper>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default SalesBox;
