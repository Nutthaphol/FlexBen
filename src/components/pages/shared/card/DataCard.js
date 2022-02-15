import React from "react";

import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";

import { makeStyles } from "@mui/styles";
import { Card, Icon, Paper, Stack, Typography } from "@mui/material";
import { AutoGraphSharp } from "@mui/icons-material";
import { Box } from "@mui/system";
import { amber } from "@mui/material/colors";
import Themplates from "../theme";

const theme = createTheme(Themplates);

const useStyles = makeStyles(() => ({
  root: {
    padding: "10px",
    minWidth: "270px",
    position: "relative",
    boxShadow: "rgb(3 0 71 / 16%) 0px 1px 3px",
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
  const { section, value, type } = props;

  const classes = useStyles();
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Paper sx={{ p: 2 }}>
          <Stack direction="row" justifyContent="space-between">
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1">{section}</Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Icon fontSize="small">
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/icons/Coin.svg`}
                    width="100%"
                  />
                </Icon>
                <Typography variant="h4">{value}</Typography>
              </Stack>
            </Stack>
            <Box
              sx={{
                flexGrow: 1,
                textAlign: "center",
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  bgcolor: "primary.lighter",
                  borderRadius: "50px",
                  p: 4,
                }}
              >
                <AutoGraphSharp />
              </Paper>
            </Box>
          </Stack>
        </Paper>
        {/* <Card className={classes.root}>
          <AutoGraphSharp className={classes.propsIcons} />
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            {section}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginTop: "20px",
              marginBottom: "20px",
              justifyContent: "center",
            }}
          >
            <Icon fontSize="large">
              <img
                src={`${process.env.PUBLIC_URL}/assets/icons/Coin.svg`}
                width="100%"
              />
            </Icon>
            <Box sx={{ flexGrow: 0.03 }} />
            <Typography variant="h4">{value}</Typography>
          </Box>
        </Card> */}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default DataCard;
