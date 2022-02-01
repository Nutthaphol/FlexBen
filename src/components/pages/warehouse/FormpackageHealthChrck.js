import React, {
  useState,
  useEffect,
  useRef,
  Fragment,
  useCallback,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Themplates from "../shared/theme";
import * as XLSX from "xlsx";
import * as Yup from "yup";
import {
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import { Field, FieldArray, Form, Formik } from "formik";
import { Select, TextField } from "formik-mui";
import { Box } from "@mui/system";
import {
  Add,
  AddCircle,
  AddCircleOutline,
  Clear,
  Remove,
  RemoveCircleOutline,
} from "@mui/icons-material";

const theme = createTheme(Themplates);

const useStyles = makeStyles(() => ({
  paper: {
    boxShadow: "rgb(3 0 71 / 9%) 0px 1px 3px",
    padding: "1.75rem",
  },
  headerText: {
    fontWeight: "600",
    marginBottom: "40px",
    fontSize: "32px",
  },
  labelField: {
    fontSize: "24px",
    marginBottom: "24px",
    fontWeight: "400",
  },
}));

const dayList = [
  "จันทร์",
  "อังคาร",
  "พุธ",
  "พฤหัสบดี",
  "ศุกร์",
  "เสาร์",
  "อาทิตย์",
];
const FormpackageHealthChrck = () => {
  const classes = useStyles();
  const formRef = useRef();
  const dispatch = useDispatch();

  const [province, setProvince] = useState();
  const [district, setDistrict] = useState();
  const [formData, setFormData] = useState({
    hospitalName: "",
    province: "",
    district: "",
    mapMarker: "",
    packageName: "",
    price: 0,
    detail: [""],
    closedDay: "",
    opening: "",
    closing: "",
    phone: "",
    email: "",
    lineAddress: "",
  });

  useEffect(async () => {
    if (!province && !district) {
      fetchAPI();
    }
  }, [province, district]);

  const fetchAPI = () => {
    fetch(
      "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json"
    )
      .then((response) => response.json())
      .then((result) => {
        setProvince(result);
      });

    fetch(
      "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_amphure.json"
    )
      .then((response) => response.json())
      .then((result) => {
        setDistrict(result);
      });
  };
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validate = Yup.object().shape({
    hospitalName: Yup.string().required("Please enter hospital name"),
    province: Yup.string().required("Please enter province"),
    district: Yup.string().required("Please enter district"),
    // mapMarker: "",
    packageName: Yup.string().required("Please enter package name"),
    price: Yup.number().required().min(1),
    detail: Yup.array().required("Please enter somedetail").min(1),
    closedDay: Yup.string().required("Please select one choice"),
    opening: Yup.string().required("Please enter opening time"),
    closing: Yup.string().required("Please enter closing time"),
    phone: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Please enter closing time"),
    email: Yup.string().email().required("Please enter email"),
    lineAddress: Yup.string().required("Please enter line id"),
  });

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div className={`page`}>
          <Container maxWidth="xl">
            <Paper className={classes.paper}>
              <Typography className={classes.headerText}>
                ฟอร์มตรวจร่างการ
              </Typography>
              <Formik
                initialValues={formData}
                enableReinitialize
                innerRef={formRef}
                validationSchema={validate}
                onSubmit={(values, setSubmitting) => {
                  try {
                    setFormData(values);
                  } catch (error) {
                    console.log("error form order ", error);
                  }
                }}
              >
                {({
                  values,
                  errors,
                  isSubmitting,
                  touched,
                  handleBlur,
                  setFieldValue,
                }) => (
                  <Form autoComplete="off">
                    <Grid container spacing={2}>
                      {/* field hospital name */}
                      <Grid item xs={12}>
                        <Typography className={classes.labelField}>
                          ชื่อโรงพยาบาล
                        </Typography>
                        <Field
                          component={TextField}
                          name={`hospitalName`}
                          fullWidth
                        />
                      </Grid>
                      {/* Province, District and Map marker Field */}
                      <Grid item xs={12} md={6} lg={4}>
                        <Typography className={classes.labelField}>
                          จังหวัด
                        </Typography>
                        <Field
                          component={Select}
                          formControl={{
                            sx: { width: "100%", size: "small" },
                          }}
                          name="province"
                          labelId="province-selected"
                        >
                          {province &&
                            province.map((val, index) => (
                              <MenuItem key={index + val.id} value={val.id}>
                                {val.name_th}
                              </MenuItem>
                            ))}
                        </Field>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Typography className={classes.labelField}>
                          อำเภอ
                        </Typography>

                        <Field
                          component={Select}
                          formControl={{
                            sx: { width: "100%", size: "small" },
                          }}
                          name="district"
                          labelId="district-selected"
                        >
                          {district &&
                            district
                              .filter((item) =>
                                values.province
                                  ? item.province_id == values.province
                                  : true
                              )
                              .map((val, index) => (
                                <MenuItem key={index + val.id} value={val.id}>
                                  {val.name_th}
                                </MenuItem>
                              ))}
                        </Field>
                      </Grid>
                      <Grid item xs={12} md={12} lg={4}>
                        <Typography className={classes.labelField}>
                          Map
                        </Typography>
                        <Field
                          component={TextField}
                          name={`mapMarker`}
                          fullWidth
                        />
                      </Grid>
                      {/* Package name and Price Field */}
                      <Grid item xs={12} md={8}>
                        <Typography className={classes.labelField}>
                          ชื่อ Package
                        </Typography>
                        <Field
                          component={TextField}
                          name={`packageName`}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography className={classes.labelField}>
                          ราคา
                        </Typography>
                        <Field
                          component={TextField}
                          name={`price`}
                          fullWidth
                          type="number"
                        />
                      </Grid>
                      {/* detail Field */}
                      <Grid item xs={12}>
                        <Typography className={classes.labelField}>
                          รายละเอียด
                        </Typography>

                        <FieldArray name={"detail"}>
                          {({ push, remove }) => (
                            <Fragment>
                              {values.detail.map((val, index) => (
                                <Box
                                  sx={{
                                    marginBottom: "16px",
                                  }}
                                  key={index}
                                >
                                  <Field
                                    component={TextField}
                                    name={`detail[${index}]`}
                                    fullWidth
                                    multiline
                                    rows={4}
                                    InputProps={{
                                      endAdornment: (
                                        <Box
                                          sx={{
                                            position: "absolute",
                                            top: 0,
                                            right: 0,
                                            zIndex: 1,
                                          }}
                                        >
                                          <IconButton
                                            color="error"
                                            disabled={
                                              values.detail.length <= 1
                                                ? true
                                                : false
                                            }
                                            onClick={() => remove(index)}
                                          >
                                            <Clear />
                                          </IconButton>
                                        </Box>
                                      ),
                                    }}
                                    label={`รายการที่ ${index + 1}`}
                                  />
                                </Box>
                              ))}
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                  alignItems: "center",
                                }}
                              >
                                <IconButton
                                  color="success"
                                  onClick={() => push("")}
                                >
                                  <AddCircleOutline fontSize="large" />
                                </IconButton>
                              </Box>
                            </Fragment>
                          )}
                        </FieldArray>
                      </Grid>
                      {/* Closed day, opening time and closing time Field  */}
                      <Grid item xs={12} md={6} lg={4}>
                        <Typography className={classes.labelField}>
                          วันปิดทำการ
                        </Typography>
                        {/* <Field
                          component={TextField}
                          name={`closedDay`}
                          fullWidth
                        /> */}
                        <Field
                          component={Select}
                          formControl={{
                            sx: { width: "100%", size: "small" },
                          }}
                          name="closedDay"
                          labelId="closedDay-selected"
                        >
                          {dayList &&
                            dayList.map((val, index) => (
                              <MenuItem key={index + val} value={val}>
                                {val}
                              </MenuItem>
                            ))}
                        </Field>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Typography className={classes.labelField}>
                          เวลาเปิด
                        </Typography>
                        <Field
                          component={TextField}
                          name={`opening`}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Typography className={classes.labelField}>
                          เวลาปิด
                        </Typography>
                        <Field
                          component={TextField}
                          name={`closing`}
                          fullWidth
                        />
                      </Grid>
                      {/* phone, email and line Field */}
                      <Grid item xs={12} md={6} lg={4}>
                        <Typography className={classes.labelField}>
                          เบอร์ติดต่อ
                        </Typography>
                        <Field component={TextField} name={`phone`} fullWidth />
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Typography className={classes.labelField}>
                          E-mail
                        </Typography>
                        <Field component={TextField} name={`email`} fullWidth />
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Typography className={classes.labelField}>
                          Line
                        </Typography>
                        <Field
                          component={TextField}
                          name={`lineAddress`}
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row-reverse",
                        margin: "1.75rem 0",
                      }}
                    >
                      <Button variant="contained" type="submit" color="primary">
                        Submit
                      </Button>
                    </Box>
                    {/* <pre>{JSON.stringify({ values, errors }, null, 4)}</pre> */}
                  </Form>
                )}
              </Formik>
            </Paper>
          </Container>
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default FormpackageHealthChrck;
