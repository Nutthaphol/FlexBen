import React, {
  useState,
  useEffect,
  Fragment,
  useRef,
  useCallback,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import Themplates from "../../shared/theme";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import {
  Container,
  Grid,
  MenuItem,
  Paper,
  Typography,
  TextField as TextFieldMUI,
  Button,
} from "@mui/material";
import dayjs from "dayjs";
import { Field, Form, Formik } from "formik";
import { Select, TextField } from "formik-mui";
import { DatePicker } from "formik-mui-lab";
import { getTreatmentCategory } from "../../../../actions/treatmentCategory";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DragAndDrop from "../../shared/fileUpload/DragAndDrop";
import { Box } from "@mui/system";
import * as Yup from "yup";

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
const FormBill = () => {
  const classes = useStyles();
  const dispath = useDispatch();
  const formRef = useRef();

  const { result: treatmentCategory } = useSelector(
    (state) => state.treatmentCategory
  );

  const [form, setForm] = useState({
    billname: "",
    category: "",
    date: new Date(),
    detail: "",
    expenses: 0,
    vat: 0,
    finalExpenses: 0,
    image: "",
  });
  const [files, setFiles] = useState([]);

  useEffect(() => {
    dispath(getTreatmentCategory());
  }, []);

  const validate = Yup.object().shape({
    billname: Yup.string().required("Please enter name"),
    category: Yup.number().required("Please select category").min(1),
    detail: Yup.string().required("Please enter detail"),
    expenses: Yup.number().required().min(1),
  });
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div className={`page`}>
          <Container maxWidth="xl">
            <Paper className={classes.paper}>
              <Typography className={classes.headerText}>
                อัพโหลดใบเสร็จ
              </Typography>
              <Formik
                initialValues={form}
                innerRef={formRef}
                validationSchema={validate}
                enableReinitialize
                onSubmit={(values, setSubmitting) => {
                  try {
                    setForm(values);
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
                    <Grid container spacing={4}>
                      <Grid item xs={12}>
                        <Typography className={classes.labelField}>
                          ชื่อรายการ
                        </Typography>
                        <Field
                          component={TextField}
                          name={`billname`}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography className={classes.labelField}>
                          ประเภท
                        </Typography>
                        <Field
                          name={`category`}
                          component={Select}
                          formControl={{
                            sx: { width: "100%", size: "small" },
                          }}
                        >
                          {treatmentCategory &&
                            treatmentCategory.map((val, index) => (
                              <MenuItem key={index} value={val.id}>
                                {val.name}
                              </MenuItem>
                            ))}
                        </Field>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography className={classes.labelField}>
                          วันที่
                        </Typography>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <Field
                            component={DatePicker}
                            name={`date`}
                            inputFormat="dd/MM/yyyy"
                            renderInput={(params) => (
                              <TextFieldMUI {...params} fullWidth />
                            )}
                          />
                        </LocalizationProvider>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography className={classes.labelField}>
                          รายละเอียด
                        </Typography>
                        <Field
                          name={`detail`}
                          component={TextField}
                          fullWidth
                          multiline
                          rows={5}
                        />{" "}
                      </Grid>
                      <Grid item xs={12} lg={4}>
                        <Typography className={classes.labelField}>
                          ค่าใช้จ่าย
                        </Typography>
                        <Field
                          component={TextField}
                          name={`expenses`}
                          value={values.expenses == 0 ? "" : values.expenses}
                          fullWidth
                          type="number"
                          InputProps={{ inputProps: { min: 0 } }}
                        />
                      </Grid>
                      <Grid item xs={12} lg={4}>
                        <Typography className={classes.labelField}>
                          Vat (%)
                        </Typography>
                        <Field
                          component={TextField}
                          name={`vat`}
                          InputProps={{ inputProps: { min: 0 } }}
                          fullWidth
                          type="number"
                        />
                      </Grid>
                      <Grid item xs={12} lg={4}>
                        <Typography className={classes.labelField}>
                          รวม
                        </Typography>
                        <Field
                          component={TextField}
                          name={`finalExpenses`}
                          value={
                            values.finalExpenses == 0
                              ? ""
                              : values.finalExpenses
                          }
                          fullWidth
                          type="number"
                          InputProps={{ inputProps: { min: 0 } }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <DragAndDrop setFiles={setFiles} files={files} />
                      </Grid>
                      <Grid item lg={12}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            height: "100%",
                          }}
                        >
                          {files.map((file) => (
                            <img
                              key={file.name}
                              src={file.preview}
                              className={classes.uploadImage}
                              height="144px"
                            />
                          ))}
                        </Box>
                      </Grid>
                    </Grid>
                    <br />
                    <Box display="flex" justifyContent="flex-end">
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{
                          fontWeight: "600",
                          fontSize: "18px",
                          backgroundColor: "#1769aa",
                        }}
                      >
                        อัพโหลด
                      </Button>
                    </Box>
                    {/* <pre>{JSON.stringify({ values, errors }, null, 4)}</pre> */}
                  </Form>
                )}
              </Formik>
            </Paper>
            <br />
            <br />
            <br />
            <br />
          </Container>
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default FormBill;
