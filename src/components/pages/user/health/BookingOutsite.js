import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { makeStyles, styled } from "@mui/styles";
import Themplates from "../../shared/theme";
import {
  Button,
  Container,
  Divider,
  Grid,
  Icon,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import frLocale from "date-fns/locale/fr";
import TimePicker from "@mui/lab/TimePicker";
import { Box } from "@mui/system";
import { Search } from "@mui/icons-material";
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs,
} from "react-google-maps";
import { compose, withProps } from "recompose";
import hospitalService from "../../../../services/hospital.service";
import ProductCard from "../../shared/card/ProductCard";

const theme = createTheme(Themplates);

const useStyles = makeStyles(() => ({
  paper: {
    padding: "1.25rem",
    boxShadow: "rgb(3 0 71 / 9%) 0px 1px 3px",
    position: "relative",
    margin: "0px 0 40px",
  },
  mapBackground: {
    padding: "0.25rem",
    boxShadow: "rgb(3 0 71 / 9%) 0px 1px 3px",
    position: "relative",
    margin: "0px 0 40px",
  },
}));

const GoogleMapBooking = compose(
  withProps({
    // googleMapURL:
    //   "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyDfhTFK9gKGYJTSgN7yxkddwu3Lu0wk-ag",
    loadingElement: <div style={{ height: `100%` }} />,
    // containerElement: <div style={{ height: `600px`, width: "100%" }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => (
  <GoogleMap defaultZoom={8} defaultCenter={{ lat: 13.7563, lng: 100.5018 }}>
    {props.isMarkerShown && (
      <Marker position={{ lat: 13.7563, lng: 100.5018 }} />
    )}
  </GoogleMap>
));

const BookingOutsite = () => {
  const classes = useStyles();

  const [hospitalList, setHospitalList] = useState();
  const [selectDate, setSelectDate] = useState();
  const [selectTime, setSelectTime] = useState();

  useEffect(async () => {
    if (!hospitalList) {
      const res = await hospitalService.getAllHospital();
      setHospitalList(res.data);
    }
  }, [hospitalList]);
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div className={`page`}>
          <Container maxWidth="xl">
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              sx={{ marginBottom: "2rem" }}
              spacing={3}
            >
              <Grid item xs={12} md={3} lg={3}>
                <Box sx={{}}>
                  <TextField
                    fullWidth
                    label="Search"
                    size="small"
                    sx={{ bgcolor: "#fff" }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Icon>
                            <Search />
                          </Icon>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={3} lg={3}>
                <Box sx={{}}>
                  <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                    locale={frLocale}
                  >
                    <DatePicker
                      mask={"__/__/____"}
                      value={selectDate}
                      onChange={(newValue) => {
                        setSelectDate(newValue);
                      }}
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
              <Grid item xs={12} md={3} lg={3}>
                <Box sx={{}}>
                  <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                    locale={frLocale}
                  >
                    <TimePicker
                      value={selectTime}
                      onChange={(newValue) => {
                        setSelectTime(newValue);
                      }}
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
                xs={12}
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
                  sx={{ height: "40px" }}
                  disableRipple
                >
                  ค้นหา
                </Button>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              sx={{
                [theme.breakpoints.down("md")]: {
                  flexDirection: "row-reverse",
                },
              }}
            >
              <Grid item xs={12} md={6} xl={8}>
                <Grid container spacing={2}>
                  {hospitalList &&
                    hospitalList.map((val, index) => (
                      <Grid item xs={12} md={6} xl={4} key={val.id}>
                        <ProductCard
                          image={`${process.env.REACT_APP_URL}image/${val.image}`}
                          primaryText={val.name}
                          secondaryText={val.location}
                          currency=" "
                          rating_={val.rating}
                        />
                      </Grid>
                    ))}
                </Grid>
              </Grid>
              <Grid item xs={12} md={6} xl={4} sx={{ minHeight: "1000px" }}>
                <Paper className={classes.mapBackground}>
                  <GoogleMapBooking
                    containerElement={
                      <Box
                        sx={{
                          [theme.breakpoints.down("sm")]: {
                            height: "480px",
                          },
                          [theme.breakpoints.down("md")]: {
                            height: "600px",
                          },
                          [theme.breakpoints.up("md")]: {
                            height: "1000px",
                          },
                          width: "100%",
                        }}
                        // mark={hospitalList}
                        isMarkerShown={false}
                      />
                    }
                  />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default BookingOutsite;
