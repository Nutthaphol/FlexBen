import React from "react";

import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Themplates from "../theme";
import { Paper, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

const theme = createTheme(Themplates);

const useStyles = makeStyles(() => ({
  root: {
    padding: "1.25rem",
    boxShadow: "rgb(3 0 71 / 16%) 0px 1px 3px",
    position: "relative",
    backgroundColor: "#121212",
    color: "#fff",
    backgroundImage:
      "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
    marginBottom: "40px",
  },
  rootW: {
    padding: "1.25rem",
    boxShadow: "rgb(3 0 71 / 16%) 0px 1px 3px",
    position: "relative",
    marginBottom: "40px",
  },
  progress: {
    height: "10px",
    borderRadius: "16px",
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
    },
  },
}));

const PercentCard = (props) => {
  const classes = useStyles();
  const { percent, section, themes, label } = props;
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Paper sx={{ p: "24px", mb: 4 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 2 }}
          >
            <Typography variant="h4">{section}</Typography>
            <Stack direction="row" spacing={2}>
              <Typography variant="h4">{label}</Typography>
              <Typography
                variant="h4"
                sx={{ fontWeight: 400 }}
                color="text.secondary"
              >
                ({percent}%)
              </Typography>
            </Stack>
          </Stack>
          <LinearProgress
            value={percent}
            variant="determinate"
            sx={{ height: 8 }}
          />
        </Paper>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default PercentCard;
