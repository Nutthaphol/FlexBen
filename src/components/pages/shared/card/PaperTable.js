import React from "react";

import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";

import { makeStyles } from "@mui/styles";
import { Button, Card, Grid, Paper, Typography } from "@mui/material";
import { amber } from "@mui/material/colors";
import { Adb } from "@mui/icons-material";
import { Box } from "@mui/system";
import Themplates from "../theme";

const theme = createTheme(Themplates);

const useStyles = makeStyles(() => ({
  root: {
    position: "relative",
    padding: "20px",
    maxHeight: "100px",
    display: "flex",
    alignContent: "center",
    justifyContent: "space-between",
    //     overflowX: "auto",
  },
  typeIcon: {
    fontSize: "2rem",
    marginRight: "1rem",
  },
}));

const PaperTable = (props) => {
  const { section, value1, value2, value3 } = props;
  const classes = useStyles();
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Paper className={classes.root}>
          <Grid container justifyContent="center">
            <Grid item xs={3} sx={{ display: "flex" }}>
              <Adb className={classes.typeIcon} />
              <Typography variant="h5" gutterBottom>
                {section}
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Typography variant="h5" gutterBottom>
                {value1}
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Typography variant="h5" gutterBottom>
                {value1}
              </Typography>
            </Grid>

            <Grid
              item
              xs={3}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Grid container spacing={5} justifyContent="flex-end">
                <Grid item xs={6}>
                  {" "}
                  <Button variant="outlined" color="secondary" fullWidth>
                    แลก
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button variant="outlined" color="success" fullWidth>
                    ฝาก
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* <Box sx={{ display: "flex" }}>
            <Adb className={classes.typeIcon} />
            <Typography variant="h5" gutterBottom>
              {section}
            </Typography>
          </Box>
          <Box sx={{ p: 1, flexShrink: 0 }}>
            <Typography variant="h5" gutterBottom>
              {value1}
            </Typography>
          </Box>
          <Box sx={{ p: 1, flexShrink: 0 }}>
            <Typography variant="h5" gutterBottom>
              {value1}
            </Typography>
          </Box>
          <Box sx={{ p: 1, flexShrink: 0, display: "flex" }}>
            <Button variant="outlined" color="secondary" fullWidth>
              แลก
            </Button>
            <Box sx={{ mr: 2 }} />
            <Button variant="outlined" color="success" fullWidth>
              ฝาก
            </Button>
          </Box> */}
        </Paper>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default PaperTable;
