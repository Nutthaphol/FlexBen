import React from "react";

import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Themplates from "../theme";
import { Paper, Typography } from "@mui/material";
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
  const { value, text, themes } = props;
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Paper className={themes == "light" ? classes.rootW : classes.root}>
          <Box sx={{ mb: "20px" }}>
            <Typography variant="h6" component="div">
              {text}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box sx={{ width: "100%", displaty: "flext" }}>
              <LinearProgress
                variant="determinate"
                value={value}
                className={classes.progress}
                sx={{
                  [`& .${linearProgressClasses.bar}`]: {
                    borderRadius: 5,
                  },
                }}
              />
            </Box>
            <Typography
              variant="body1"
              component="div"
              noWrap
              sx={{ minWidth: "50px", ml: "20px" }}
            >
              {value} %
            </Typography>
          </Box>
        </Paper>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default PercentCard;
