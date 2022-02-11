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

const theme = createTheme(Themplates);

const time = [
  "08.30 - 09.30 AM",
  "09.30 - 10.30 AM",
  "10.30 - 11.30 AM",
  "11.30 - 12.30 AM",
  "13.30 - 14.30 AM",
  "14.30 - 15.30 AM",
  "15.30 - 16.30 AM",
];

const BookingHealthcheck = (props) => {
  const {
    form,
    setForm,
    hospitalId = false,
    open = false,
    handleClose,
    date,
  } = props;
  // const [form, setForm] = useState();
  const { result: hospitalList } = useSelector((state) => state.hospital);

  useEffect(() => {
    if (!form) {
      setForm({
        packageId: hospitalId,
        fullname: "",
        nationalId: "",
        phone: "",
        date: date,
        time: "",
      });
    }
    if (form.packageId != hospitalId) {
      const tmpForm = { ...form };
      tmpForm.packageId = hospitalId;
      setForm(tmpForm);
    }
  }, []);
  return (
    <Fragment>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle id={`form booking health of hospital id ${hospitalId}`}>
          <Typography variant="h4" component="div" gutterBottom>
            {`Bookink`}
          </Typography>
        </DialogTitle>
        <Formik
          // initialValues={{
          //   packageId: hospitalId,
          //   fullname: "",
          //   nationalId: "",
          //   phone: "",
          //   date: date,
          //   time: "",
          // }}
          initialValues={form}
          onSubmit={(values, setSubmitting) => {
            try {
              setForm(values);
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
                          ชื่อ-สกุล
                        </Typography>
                        <Field
                          component={TextField}
                          name={`fullname`}
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
                          name={`nationalId`}
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
                          package
                        </Typography>
                        {console.log("hospitalList", hospitalList)}
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
                            name={`date`}
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
                          formControl={{
                            sx: {
                              width: 1,
                              p: 0,
                            },
                            size: "small",
                          }}
                        >
                          {time.map((val, index) => (
                            <MenuItem key={index + val} value={val}>
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
