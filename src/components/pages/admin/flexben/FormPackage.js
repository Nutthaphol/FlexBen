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
import Themplates from "../../shared/theme";
import {
  Container,
  Grid,
  IconButton,
  Paper,
  Typography,
  TextField as TextFieldMUI,
  Divider,
  Card,
  CardActionArea,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  ListItem,
  ListItemIcon,
  Icon,
} from "@mui/material";
import { Select, SimpleFileUpload, Switch, TextField } from "formik-mui";
import {
  Add,
  Category,
  CleanHands,
  Clear,
  QueueOutlined,
  Remove,
  AddAPhoto,
  Image,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  CancelRounded,
} from "@mui/icons-material";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { Field, FieldArray, Form, Formik } from "formik";
import { border, Box, width } from "@mui/system";
import { getAllShopCategory } from "../../../../actions/shopCategory";
import "./index.css";

import * as XLSX from "xlsx";
import { getAllDelivery } from "../../../../actions/delivery";
import { useDropzone } from "react-dropzone";
import * as Yup from "yup";
import iconsService from "../../../../services/icons.service";
import { getAllInsurance } from "../../../../actions/insurance";
import { getAllItem } from "../../../../actions/item";
import { getAllTravel } from "../../../../actions/travel";

const theme = createTheme(Themplates);

const useStyles = makeStyles(() => ({
  root: {
    boxShadow: "rgb(3 0 71 / 9%) 0px 1px 3px",
    padding: "1.75rem",
  },
  catPaper: {
    height: "30px",
    padding: "40px",
    borderRight: "50%",
  },
  typography: {
    fontSize: "24px",
    marginBottom: "24px",
    fontWeight: "400",
  },
  placeholder: {
    width: "100%",
    height: "100%",
    display: "flex",
    address: "absolute",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    color: "rgb(99, 115, 129)",
    backgroundColor: "rgb(244, 246, 248)",
    transition: "opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  },
  placeholderImageProfile: {
    color: "rgb(255, 255, 255)",
    backgroundColor: "rgba(22, 28, 36, .50)",
  },
  placeholderLabel: {
    color: "rgb(255, 255, 255)",
  },
}));

const groupPack = {
  name: "",
  icon: "",
  detail: "",
  insuranceId: "",
  insurancePrice: 0,
  lifestyleId: "",
  lifestylePrice: 0,
  travelId: "",
  travelPrice: 0,
  price: "",
  discount: "",
  netPrice: "",
};

const FormPackage = () => {
  const classes = useStyles();
  const formRef = useRef();
  const dispatch = useDispatch();

  const [groupPackage, setGroupPackage] = useState({ ...groupPack });
  const [files, setFiles] = useState([]);
  const [iconsGroup, setIconsGroup] = useState();

  const { result: insurance } = useSelector((state) => state.insurance);
  const { result: item } = useSelector((state) => state.item);
  const { result: travel } = useSelector((state) => state.travel);

  useEffect(async () => {
    dispatch(getAllInsurance());
    dispatch(getAllItem());
    dispatch(getAllTravel());
    if (iconsGroup == null) {
      const res_ = await iconsService.getIconsPackageClass().then((res) => {
        return res.data;
      });
      setIconsGroup(res_.data);
    }
  }, [iconsGroup]);

  const onDrop = useCallback((acceptedFiles) => {
    let formData = new FormData();
    acceptedFiles.map((file) => formData.append("image", file));
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      )
    );
    // setUploads(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpeg, image/png",
    onDrop,
    maxFiles: 3,
  });
  const onKeyDown = (keyEvent) => {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
    }
  };

  const validate = Yup.object().shape({
    name: Yup.string().required("Please enter name"),
    icon: Yup.number().required("Please enter icon"),
    detail: Yup.string().required("Please enter detail"),
    insuranceId: Yup.string().required("Please select insurance order"),
    lifestyleId: Yup.string().required("Please select lifestyle order"),
    travelId: Yup.string().required("Please select travel order"),
    insurancePrice: Yup.number().required().min(1, "price > 0"),
    lifestylePrice: Yup.number().required().min(1, "price > 0"),
    travelPrice: Yup.number().required().min(1, "price > 0"),
    price: Yup.number().required().min(1, "price > 0"),
    discount: Yup.number().required(),
    netPrice: Yup.number().required(),
  });

  return (
    <div className={`page`}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Container maxWidth="xl">
            <Paper className={classes.root}>
              <Typography variant="h4" component="div" gutterBottom>
                Package Admin
              </Typography>
              <br />
              <br />
              <Formik
                initialValues={groupPackage}
                enableReinitialize
                validationSchema={validate}
              >
                {({
                  values,
                  errors,
                  isSubmitting,
                  touched,
                  handleBlur,
                  setFieldValue,
                  setValues,
                }) => (
                  <Form autoComplete="off" onKeyDown={onKeyDown}>
                    <Typography className={classes.typography}>
                      ชื่อ Package
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={10}>
                        <Field
                          component={TextField}
                          name={`name`}
                          fullWidth
                          label={`ชื่อ package`}
                        />
                      </Grid>
                      <Grid item xs={12} md={2}>
                        <Field
                          component={Select}
                          name={`icon`}
                          fullWidth
                          label={`สัญลักษณ์`}
                          formControl={{
                            sx: { width: "100%" },
                          }}
                        >
                          {iconsGroup &&
                            iconsGroup.map((val, index) => (
                              <MenuItem key={index} value={val.id}>
                                <Box
                                  sx={{
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Icon component="span">
                                    <img
                                      src={`${process.env.REACT_APP_URL}icon${val.path}`}
                                      width="100%"
                                    />
                                  </Icon>
                                </Box>
                              </MenuItem>
                            ))}
                        </Field>
                      </Grid>
                    </Grid>
                    <br />
                    <Divider />
                    <br />
                    <Typography className={classes.typography}>
                      เลือก Item ใน Package
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Field
                          component={Select}
                          name={`insuranceId`}
                          onChange={(e) => {
                            setFieldValue(
                              "insurancePrice",
                              insurance
                                ? insurance.find(
                                    (item) => item.id == e.target.value
                                  ).price
                                : 0
                            );
                            setFieldValue(
                              "price",
                              parseFloat(
                                values.price +
                                  (insurance
                                    ? insurance.find(
                                        (item) => item.id == e.target.value
                                      ).price
                                    : 0)
                              )
                            );
                          }}
                          formControl={{
                            sx: { width: "100%" },
                          }}
                          label={`Insurance`}
                        >
                          {insurance &&
                            insurance.map((val, index) => (
                              <MenuItem key={index} value={val.id}>
                                {val.name}
                              </MenuItem>
                            ))}
                        </Field>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          component={TextField}
                          name={`insurancePrice`}
                          fullWidth
                          label={`ราคา`}
                          type="number"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          component={Select}
                          name={`lifestyleId`}
                          onChange={(e) => {
                            setFieldValue(
                              "lifestylePrice",
                              item
                                ? item.find((item) => item.id == e.target.value)
                                    .price
                                : 0
                            );
                            setFieldValue(
                              "price",
                              parseFloat(
                                values.price +
                                  (item
                                    ? item.find(
                                        (item) => item.id == e.target.value
                                      ).price
                                    : 0)
                              )
                            );
                          }}
                          formControl={{
                            sx: { width: "100%" },
                          }}
                          label={`lifestyle`}
                        >
                          {item &&
                            item.map((val, index) => (
                              <MenuItem key={index} value={val.id}>
                                {val.name}
                              </MenuItem>
                            ))}
                        </Field>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          component={TextField}
                          name={`lifestylePrice`}
                          fullWidth
                          label={`ราคา`}
                          type="number"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          component={Select}
                          name={`travelId`}
                          onChange={(e) => {
                            setFieldValue(
                              "travelPrice",
                              travel
                                ? travel.find(
                                    (item) => item.id == e.target.value
                                  ).price
                                : 0
                            );
                            setFieldValue(
                              "price",
                              parseFloat(
                                values.price +
                                  (travel
                                    ? travel.find(
                                        (item) => item.id == e.target.value
                                      ).price
                                    : 0)
                              )
                            );
                          }}
                          formControl={{
                            sx: { width: "100%" },
                          }}
                          label={`Travel`}
                        >
                          {travel &&
                            travel.map((val, index) => (
                              <MenuItem key={index} value={val.id}>
                                {val.name}
                              </MenuItem>
                            ))}
                        </Field>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          component={TextField}
                          name={`travelPrice`}
                          fullWidth
                          label={`ราคา`}
                          type="number"
                        />
                      </Grid>
                    </Grid>
                    <br />
                    <Divider />
                    <br />
                    <Typography className={classes.typography}>
                      รายละเอียด Package
                    </Typography>
                    <Field
                      name={`detail`}
                      component={TextField}
                      fullWidth
                      multiline
                      rows={2}
                      label={`รายละเอียดสินค้า`}
                    />
                    <br />
                    <Divider />
                    <br />
                    <Typography className={classes.typography}>
                      ราคา Package
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={4}>
                        <Field
                          component={TextField}
                          name={`price`}
                          fullWidth
                          type="number"
                          value={values.price}
                          InputProps={{
                            inputProps: { min: 0 },
                          }}
                          label={`ราคาสินค้าต่อชิ้น (Coin)`}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Field
                          component={TextField}
                          onChange={(e) => {
                            setFieldValue(
                              `discount`,
                              parseFloat(e.target.value)
                            );
                            setFieldValue(
                              `netPrice`,
                              parseFloat(
                                values.price -
                                  (values.price * e.target.value) / 100
                              )
                            );
                          }}
                          name={`discount`}
                          value={values.discount || ""}
                          fullWidth
                          type="number"
                          InputProps={{ inputProps: { min: 0 } }}
                          label={`ส่วนลด (%)`}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Field
                          component={TextField}
                          name={`netPrice`}
                          value={values.netPrice || ""}
                          fullWidth
                          label={`ราคาสุทธิ (Coin)`}
                          type="number"
                        />
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
                        ลงทะเบียน
                      </Button>
                    </Box>
                    <pre>{JSON.stringify({ values, errors }, null, 4)}</pre>
                  </Form>
                )}
              </Formik>
            </Paper>
          </Container>
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
};

export default FormPackage;
