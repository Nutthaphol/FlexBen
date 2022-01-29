import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { makeStyles, styled } from "@mui/styles";
import Themplates from "../../shared/theme";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import frLocale from "date-fns/locale/fr";
import TimePicker from "@mui/lab/TimePicker";
import { Box } from "@mui/system";

const theme = createTheme(Themplates);

const useStyles = makeStyles(() => ({
  paper: {
    padding: "1.25rem",
    boxShadow: "rgb(3 0 71 / 9%) 0px 1px 3px",
    position: "relative",
    margin: "0px 0 40px",
  },
}));

const BookingOutsite = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div className={`page`}>
          <Container maxWidth="xl">
            <Grid container justifyContent="center" alignItems="center">
              <Grid item sx={12} md={3} lg={3}>
                <Box sx={{ margin: "0 16px" }}>
                  <TextField
                    fullWidth
                    label="Search"
                    size="small"
                    sx={{ bgcolor: "#fff" }}
                  />
                </Box>
              </Grid>
              <Grid item sx={12} md={3} lg={3}>
                <Box sx={{ margin: "0 16px" }}>
                  <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                    locale={frLocale}
                  >
                    <DatePicker
                      mask={"__/__/____"}
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          fullWidth
                          sx={{
                            bgcolor: "#fff",
                          }}
                          {...params}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Box>
              </Grid>
              <Grid item sx={12} md={3} lg={3}>
                <Box sx={{ margin: "0 16px" }}>
                  <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                    locale={frLocale}
                  >
                    <TimePicker
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          fullWidth
                          sx={{
                            bgcolor: "#fff",
                          }}
                          {...params}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Box>
              </Grid>
              <Grid
                item
                sx={12}
                md={3}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="contained"
                  color="info"
                  fullWidth
                  size="large"
                  sx={{ height: "40px", margin: "0 16px" }}
                  disableRipple
                >
                  ค้นหา
                </Button>
              </Grid>
            </Grid>
          </Container>
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default BookingOutsite;
