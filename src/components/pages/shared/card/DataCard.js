import React from "react";

import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";

import { makeStyles } from "@mui/styles";
import { Card, Typography } from "@mui/material";
import { AutoGraphSharp } from "@mui/icons-material";
import { Box } from "@mui/system";
import { amber } from "@mui/material/colors";

const theme = createTheme();

const useStyles = makeStyles(() => ({
  root: {
    padding: "10px",
    width: "100%",
    minWidth: "270px",
    position: "relative",
  },
  propsIcons: {
    position: "absolute",
    width: "100%",
    height: "100%",
    color: "rgb(255, 191, 0,0.4)",
    left: "40%",
    top: "40%",
  },
}));

const DataCard = (props) => {
  const { section, value } = props;

  const classes = useStyles();
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Card className={classes.root}>
          <AutoGraphSharp className={classes.propsIcons} />
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            {section}
          </Typography>
          <Typography
            variant="h2"
            gutterBottom
            sx={{ textAlign: "center", fontWeight: "700" }}
          >
            {value}
          </Typography>
        </Card>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default DataCard;
