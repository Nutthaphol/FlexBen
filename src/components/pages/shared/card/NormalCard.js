import React, { useRef } from "react";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Themplates from "../../shared/theme";
import { Icon, Paper, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { alpha } from "@mui/material";

const theme = createTheme(Themplates);

const useStyles = makeStyles(() => ({}));

const NormalCard = (props) => {
  const {
    styleTheme = "light",
    colors = "primary",
    icon,
    primaryText = "",
    secondaryText = " ",
  } = props;
  const classes = useStyles();

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Paper
          sx={{
            width: 1,
            bgcolor: theme.palette[colors].lighter,
            backgroundImage:
              styleTheme == "dark"
                ? "linear-gradient(rgba(0, 0, 0, 0.17), rgba(0, 0, 0, 0.17))"
                : "none",
            p: "40px 0",
            position: "relative",
          }}
        >
          <Stack spacing={1} alignItems="center">
            <Icon
              sx={{
                p: 4,
                borderRadius: "50%",
                backgroundImage: `linear-gradient(135deg, ${alpha(
                  theme.palette[colors].dark,
                  0
                )} 0%, ${alpha(theme.palette[colors].dark, 0.24)} 100%)`,
                color: theme.palette[colors].dark,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box component={icon} sx={{ fontSize: "32px" }} />
            </Icon>
            <Typography
              variant="h3"
              sx={{ color: theme.palette[colors].darker, mt: 4 }}
            >
              {primaryText}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: theme.palette[colors].dark }}
            >
              {secondaryText}
            </Typography>
          </Stack>
        </Paper>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default NormalCard;
