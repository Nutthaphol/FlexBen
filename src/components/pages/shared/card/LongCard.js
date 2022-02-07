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
const useStyles = makeStyles(() => ({}));

const theme = createTheme(Themplates);

const LongCard = (props) => {
  const {
    styleTheme = "light",
    colors = "primary",
    icon,
    primaryText = "",
    secondaryText = " ",
    bgcolor,
  } = props;
  const classes = useStyles();

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Paper
          sx={{
            width: 1,
            bgcolor: bgcolor ? bgcolor : "#fff",
            position: "relative",
            p: "24px 0px",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ mr: 4, ml: 6 }}
          >
            <Stack spacing={1} justifyContent="center">
              <Typography variant="h3">{primaryText}</Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {secondaryText}
              </Typography>
            </Stack>
            <Box
              component={Paper}
              elevation={0}
              sx={{
                position: "relative",
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                height: 120,
                width: 120,
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {typeof icon == "object" ? (
                <Box
                  component={icon}
                  sx={{ fontSize: "90px", color: theme.palette[colors].light }}
                />
              ) : (
                <Icon sx={{ fontSize: "110px" }}>
                  <img src={icon} width="100%" />
                </Icon>
              )}
            </Box>
          </Stack>
        </Paper>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default LongCard;
