import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";

import { makeStyles } from "@mui/styles";
import { Star } from "@mui/icons-material";

import ReviewsCard from "../../shared/card/ReviewCard";
import Sticky from "react-stickynode";
import Themplates from "../../shared/theme";
import reviewService from "../../../../services/review.service";
import { Box } from "@mui/system";
import { amber } from "@mui/material/colors";
import hospitalService from "../../../../services/hospital.service";
import {
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  Menu,
  MenuItem,
  Paper,
  Rating,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import BookingHealthcheck from "../../shared/dialog/BookingHealthcheck";

const theme = createTheme(Themplates);

const useStyles = makeStyles(() => ({}));

const timeDefault = [
  "08.30 - 09.30 AM",
  "09.30 - 10.30 AM",
  "10.30 - 11.30 AM",
  "11.30 - 12.30 AM",
  "13.30 - 14.30 AM",
  "14.30 - 15.30 AM",
  "15.30 - 16.30 AM",
];

const DetailHospital = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [id, setId] = useState();
  const [detail, setDetail] = useState();

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(timeDefault[0]);

  const [rating, setRating] = useState();

  const [form, setForm] = useState("");
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const id_ = props.match.params.id;
      setId(id_);
      console.log("fetch id ", id_);
      const data = await hospitalService.getHospitalById(id_);
      setDetail(data.data);
    };

    const fetchReview = async () => {
      const review = await reviewService.getAllReviews().then((response) => {
        return response.data;
      });

      const compRating = () => {
        let rating = 0;
        let count = 0;
        if (review) {
          review
            .filter((item) => item.type == "lifestyle")
            .map((item) => {
              rating = rating + item.rating;
              count++;
            });
          rating = rating / count;
        }
        return rating.toFixed(2);
      };

      const avgRat = compRating();
      setRating(avgRat);
    };

    if (rating == null) {
      fetchReview();
    }

    if (props.match.params.id) {
      fetchData();
    }
  }, [rating]);

  const handleOpenBooking = () => {
    setFormOpen(true);
  };

  const handleCloseBooking = () => {
    setFormOpen(false);
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Box className={`page`}>
          {detail && (
            <Container maxWidth="lg">
              <Grid container spacing={4}>
                <Grid item md={7} lg={8} xs={12}>
                  <Paper sx={{ p: 2, mb: 4 }}>
                    <Stack spacing={2}>
                      <Typography variant="h3" gutterBottom>
                        {detail.name}
                      </Typography>
                      <Box
                        sx={{
                          p: 1,
                          position: "relative",
                          height: "360px",
                        }}
                      >
                        <Box
                          component="img"
                          src={`${process.env.REACT_APP_URL}image/${detail.image}`}
                          sx={{
                            position: "absolute",
                            height: "100%",
                            width: "100%",
                            objectFit: "scale-down",
                          }}
                        />
                      </Box>
                      <Divider />
                      <Box>
                        <Typography variant="h5">{detail.name}</Typography>
                        <Typography variant="body1">
                          <Box component="span" sx={{ mr: 4 }} />
                          {detail.detail}
                        </Typography>
                      </Box>
                      <Divider />
                      <Box>
                        <Typography variant="h5">บริการ</Typography>
                        {detail.services.map((val, index) => (
                          <Typography
                            key={val + index}
                            variant="body1"
                            sx={{ ml: 4 }}
                          >
                            - {val}
                          </Typography>
                        ))}
                      </Box>
                      <Divider />
                      <Box>
                        {" "}
                        <Typography variant="h5">ที่อยู่</Typography>
                        <Typography variant="body1">
                          <Box component="span" sx={{ mr: 4 }} />
                          {detail.location}
                        </Typography>
                        <Typography variant="body1">
                          <Box component="span" sx={{ mr: 4 }} />
                          {detail.phone}
                        </Typography>
                      </Box>
                    </Stack>
                  </Paper>
                  <ReviewsCard type={"package"} />
                </Grid>
                <Grid item md={5} lg={4} xs={12}>
                  <Sticky enabled={true} top={70}>
                    <Paper sx={{ p: 2 }}>
                      <Stack spacing={2}>
                        <Paper
                          elevation={0}
                          sx={{
                            bgcolor: "grey.200",
                            textAlign: "center",
                            p: 2,
                          }}
                        >
                          <Typography
                            variant="h4"
                            sx={{ color: "primary.darker" }}
                          >
                            BOOKING NOW!
                          </Typography>
                        </Paper>
                        <Stack spacing={2}>
                          <Typography noWrap variant="h4">
                            {detail.name}
                          </Typography>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                          >
                            <Rating
                              defaultValue={detail.rating}
                              precision={0.1}
                              readOnly
                            />
                          </Stack>
                        </Stack>
                        <Divider />
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography variant="h5" color="text.secondary">
                            วันที่
                          </Typography>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                              value={date}
                              inputFormat="dd/MM/yyyy"
                              onChange={(value) => {
                                setDate(value);
                                if (form) {
                                  let form_ = { ...form };
                                  form_.dateBooking = value;
                                  setForm(form_);
                                }
                              }}
                              renderInput={(params) => (
                                <TextField {...params} size="small" />
                              )}
                            />
                          </LocalizationProvider>
                        </Stack>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography variant="h5" color="text.secondary">
                            เวลา
                          </Typography>
                          <Select
                            value={time}
                            sx={{ minWidth: "228.5px" }}
                            size="small"
                            onChange={(e) => {
                              setTime(e.target.value);
                              if (form) {
                                let form_ = { ...form };
                                form_.time = e.target.value;
                                setForm(form_);
                              }
                            }}
                          >
                            {timeDefault.map((val, index) => (
                              <MenuItem value={val} key={index + val}>
                                {val}
                              </MenuItem>
                            ))}
                          </Select>
                        </Stack>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => handleOpenBooking()}
                          sx={{ p: 2 }}
                        >
                          <Typography
                            variant="h4"
                            sx={{
                              color: theme.palette.success.contrastText,
                            }}
                          >
                            Booking
                          </Typography>
                        </Button>
                      </Stack>
                    </Paper>
                  </Sticky>
                </Grid>
              </Grid>
              {formOpen && (
                <BookingHealthcheck
                  open={formOpen}
                  handleClose={handleCloseBooking}
                  form={form}
                  setForm={setForm}
                  date={date}
                  time={time}
                  hospitalId={detail.id}
                />
              )}
            </Container>
          )}
        </Box>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default DetailHospital;
