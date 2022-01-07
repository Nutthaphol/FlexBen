import React, { useRef, useState } from "react";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Themplates from "../../shared/theme";
import { IconButton, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Analytics, BarChart, Timeline } from "@mui/icons-material";

const theme = createTheme(Themplates);

const useStyles = makeStyles(() => ({
  root: {
    position: "relative",
    boxShadow: "rgb(3 0 71 / 20%) 0px 1px 4px",
    contain: "content",
    padding: "1rem",
    minHeight: "160px",
    display: "flex",
    flexDirection: "column",
  },
}));

const CardHealthCheckDetail = (props) => {
  const classes = useStyles();

  const { data } = props;
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Paper className={classes.root}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "flex-start",
              flexGrow: 0.5,
            }}
          >
            <Typography variant="h6" component="div" sx={{ fontWeight: "700" }}>
              {data.section}
            </Typography>
            <IconButton
              color="info"
              sx={{
                borderRadius: "4px",
                // border: "1px solid rgb(3 0 71 / 20%)",
                boxShadow: "rgb(3 0 71 / 20%) 0px 1px 4px",
              }}
            >
              <BarChart />
            </IconButton>
          </Box>
          <Box sx={{ textAlign: "center", flexGrow: 1 }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: "800", color: "DarkSlateGray" }}
              color="info"
            >
              {data.value} {data.unit}
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center", flexGrow: 0.5 }}>Status</Box>
        </Paper>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default CardHealthCheckDetail;
