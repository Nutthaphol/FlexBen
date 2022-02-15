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
  ButtonBase,
  Container,
  Divider,
  Grid,
  Icon,
  InputAdornment,
  Paper,
  Stack,
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
import BookingHealthcheck from "../../shared/dialog/BookingHealthcheck";
import { getHospitalPackage } from "../../../../actions/hospital";

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
    loadingElement: <div style={{}} />,
    containerElement: <div style={{ height: `320px`, width: "100%" }} />,
    mapElement: <div style={{ height: "100%", borderRadius: "8px" }} />,
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

  const dispatch = useDispatch();

  const { result: hospitalList } = useSelector((state) => state.hospital);
  // const [hospitalList, setHospitalList] = useState();
  const [selectDate, setSelectDate] = useState();
  const [selectTime, setSelectTime] = useState();
  const [openForm, setOpenForm] = useState({
    open: false,
    hospitalId: -1,
    data: null,
    date: null,
  });

  const [form, setForm] = useState();

  useEffect(async () => {
    dispatch(getHospitalPackage());
    // if (!hospitalList) {
    //   const res = await hospitalService.getAllHospital();
    //   setHospitalList(res.data);
    // }
  }, []);

  const handleOnClickOpenFrom = (e, value) => {
    let openForm_ = { ...openForm };
    openForm_.hospitalId = value.id;
    openForm_.data = value;
    openForm_.open = true;
    openForm_.date = selectDate ? selectDate : "";
    setOpenForm({ ...openForm_ });
  };

  const handleOnClose = () => {
    setOpenForm({ open: false, hospitalId: null, data: null });
  };
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
            <Stack sx={{ mb: 4 }}>
              <Paper
                elevation={2}
                sx={{ p: 1, maxHeight: "320px", position: "relative", mb: 4 }}
              >
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
              <Grid container spacing={4}>
                {hospitalList &&
                  hospitalList.map((val, index) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      lg={3}
                      key={index + val.id}
                    >
                      <ProductCard
                        image={`${process.env.REACT_APP_URL}image/${val.image}`}
                        primaryText={val.name}
                        secondaryText={val.location}
                        currency=" "
                        path="detailHospital"
                        id={val.id}
                        rating_={val.rating}
                        bottomRightType="buttom"
                        element={
                          <Button
                            color="primary"
                            onClick={(e) => handleOnClickOpenFrom(e, val)}
                          >
                            Booking
                          </Button>
                        }
                      />
                    </Grid>
                  ))}
              </Grid>
            </Stack>
            {/* <Grid
              container
              spacing={4}
              sx={{
                [theme.breakpoints.down("md")]: {
                  flexDirection: "row-reverse",
                },
              }}
            >
              <Grid item xs={12} md={6} xl={8}>
                <Grid container spacing={4}>
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
            </Grid> */}
            {openForm.open && (
              <BookingHealthcheck
                open={openForm.open}
                hospitalId={openForm.hospitalId}
                handleClose={handleOnClose}
                date={selectDate ? selectDate : false}
                form={form}
                setForm={setForm}
              />
            )}
          </Container>
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default BookingOutsite;
