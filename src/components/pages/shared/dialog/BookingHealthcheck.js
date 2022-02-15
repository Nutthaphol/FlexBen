import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
  createTheme,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  Typography,
  TextField as TextFieldMUI,
  MenuItem,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import { Field, Form, Formik } from "formik";
import { Select, TextField } from "formik-mui";
import { DatePicker } from "formik-mui-lab";
import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Themplates from "../theme";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { getHospitalPackage } from "../../../../actions/hospital";

const theme = createTheme(Themplates);

const timeDefault = [
  "08.30 - 09.30 AM",
  "09.30 - 10.30 AM",
  "10.30 - 11.30 AM",
  "11.30 - 12.30 AM",
  "13.30 - 14.30 AM",
  "14.30 - 15.30 AM",
  "15.30 - 16.30 AM",
];

const collectingType = ["เงินสด", "วางบิล"];

const formDefault = {
  packageId: "",
  prefix: "",
  firstname: "",
  lastname: "",
  phone: "",
  email: "",
  nationalID: "",
  dateBooking: "",
  time: "",
  collectingType: "",
};

const prefix = ["นาย", "นาง", "นางสาว"];

const BookingHealthcheck = (props) => {
  const {
    form,
    setForm,
    hospitalId = false,
    open = false,
    handleClose,
    date = false,
    time = false,
  } = props;
  const dispath = useDispatch();
  const { result: hospitalList } = useSelector((state) => state.hospital);

  useEffect(() => {
    dispath(getHospitalPackage());
    if (!form) {
      let form_ = { ...formDefault };
      form_.packageId = hospitalId;
      form_.dateBooking = date && date;
      form_.time = time && time;
      setForm(form_);
    } else if (form.packageId != hospitalId) {
      let form_ = { ...form };

      setForm(form_);
    }
  }, []);

  const phoneRegExp = /^0\d\d-\d\d\d-\d\d\d\d$/;
  const numberOnly = /^\d+$/;
  const validation = Yup.object().shape({
    prefix: Yup.string().required("Please enter your prefix"),
    firstname: Yup.string().required("Please enter your first name"),
    lastname: Yup.string().required("Please enter your last name"),
    nationalID: Yup.string()
      .required("please enter your national ID")
      .matches(numberOnly, "Enter number only")
      .length(13, "Citizen ID must be exactly 13 characters"),
    phone: Yup.string()
      .required("Please enter Phone")
      .matches(phoneRegExp, "Format 0xx-xxx-xxxx"),
    email: Yup.string().email().required("Please enter your email"),
    date: Yup.date().required("Please enter booking date"),
    time: Yup.string().required("Please enter booking time"),
    collectingType: Yup.string().required("Please select collecting type"),
  });
  return (
    <Fragment>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle
          id={`form booking health of hospital id ${hospitalId}`}
          sx={{
            position: "-webkit-sticky",
            position: "sticky",
          }}
        >
          <Typography variant="h4" component="div" gutterBottom>
            {`Booking`}
          </Typography>
        </DialogTitle>
        <Formik
          initialValues={form}
          validationSchema={validation}
          onSubmit={(values, setSubmitting) => {
            try {
              setForm(values);
              console.log("values", values);
              handleClose();
            } catch (error) {
              console.log("error form order ", error);
            }
          }}
        >
          {({ values, errors, setFieldValue }) => (
            <Form>
              <DialogContent dividers>
                <Grid container spacing={2} sx={{ p: 2, mb: 2 }}>
                  <Grid
                    item
                    xs={12}
                    md={4}
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                    }}
                  >
                    <Typography variant="h5" gutterBottom>
                      ข้อมูลส่วนตัว
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={8}
                    sx={{
                      border: "none",
                      [theme.breakpoints.up("md")]: {
                        borderLeft: `1px solid ${theme.palette.primary.main}`,
                      },
                    }}
                  >
                    <Stack spacing={1}>
                      <Box>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          gutterBottom
                        >
                          คำนำหน้า
                        </Typography>
                        <Field
                          component={Select}
                          name={`prefix`}
                          fullWidth
                          size="small"
                          formControl={{ sx: { width: "100%" } }}
                        >
                          {prefix.map((val, index) => (
                            <MenuItem value={val} key={index + val}>
                              {val}
                            </MenuItem>
                          ))}
                        </Field>
                      </Box>
                      <Box>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          gutterBottom
                        >
                          ชื่อ
                        </Typography>
                        <Field
                          component={TextField}
                          name={`firstname`}
                          fullWidth
                          size="small"
                        />
                      </Box>
                      <Box>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          gutterBottom
                        >
                          สกุล
                        </Typography>
                        <Field
                          component={TextField}
                          name={`lastname`}
                          fullWidth
                          size="small"
                        />
                      </Box>
                      <Box>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          gutterBottom
                        >
                          เบอร์โทรศัพท์
                        </Typography>
                        <Field
                          component={TextField}
                          name={`phone`}
                          fullWidth
                          size="small"
                        />
                      </Box>
                      <Box>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          gutterBottom
                        >
                          E-mail
                        </Typography>
                        <Field
                          component={TextField}
                          name={`email`}
                          fullWidth
                          size="small"
                        />
                      </Box>
                      <Box>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          gutterBottom
                        >
                          เลขบัตรประชาชน
                        </Typography>
                        <Field
                          component={TextField}
                          name={`nationalID`}
                          fullWidth
                          size="small"
                        />
                      </Box>
                    </Stack>
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ p: 2, mb: 2 }}>
                  <Grid
                    item
                    xs={12}
                    md={4}
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                    }}
                  >
                    <Typography variant="h5" gutterBottom>
                      ข้อมูลการจอง
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={8}
                    sx={{
                      border: "none",
                      [theme.breakpoints.up("md")]: {
                        borderLeft: `1px solid ${theme.palette.primary.main}`,
                      },
                    }}
                  >
                    <Stack spacing={1}>
                      <Box>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          gutterBottom
                        >
                          package
                        </Typography>
                        {/* {console.log("hospitalList", hospitalList)} */}
                        <Field
                          component={TextField}
                          name={`packageId`}
                          disabled
                          fullWidth
                          size="small"
                          value={
                            hospitalList &&
                            hospitalList
                              .filter((item) => item.id == values.packageId)
                              .map((val) => val.name)
                          }
                        />
                      </Box>
                      <Box>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          gutterBottom
                        >
                          วันที่
                        </Typography>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <Field
                            component={DatePicker}
                            name={`dateBooking`}
                            inputFormat="dd/MM/yyyy"
                            renderInput={(params) => (
                              <TextFieldMUI
                                {...params}
                                size="small"
                                fullWidth
                              />
                            )}
                          />
                        </LocalizationProvider>
                      </Box>
                      <Box>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          gutterBottom
                        >
                          เวลา
                        </Typography>
                        <Field
                          component={Select}
                          name={`time`}
                          value={values.time}
                          formControl={{
                            sx: {
                              width: 1,
                              p: 0,
                            },
                            size: "small",
                          }}
                        >
                          {timeDefault.map((val, index) => (
                            <MenuItem key={index + val} value={val}>
                              {val}
                            </MenuItem>
                          ))}
                        </Field>
                      </Box>
                      <Box>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          gutterBottom
                        >
                          ประเภทการเก็บเงิน
                        </Typography>
                        <Field
                          name={`collectingType`}
                          component={Select}
                          size="small"
                          formControl={{ sx: { width: "100%" } }}
                        >
                          {collectingType.map((val, index) => (
                            <MenuItem key={(val, index)} value={val}>
                              {val}
                            </MenuItem>
                          ))}
                        </Field>
                      </Box>
                    </Stack>
                  </Grid>
                </Grid>
              </DialogContent>
              <Stack direction="row-reverse" sx={{ p: 2 }}>
                <Button type="submit" variant="contained" color="success">
                  Booking
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Dialog>
    </Fragment>
  );
};

export default BookingHealthcheck;
