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
  Close,
} from "@mui/icons-material";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { Field, FieldArray, Form, Formik } from "formik";
import { border, Box, width } from "@mui/system";
import { getAllShopCategory } from "../../../actions/shopCategory";
import "./index.css";
import * as XLSX from "xlsx";
import { getAllDelivery } from "../../../actions/delivery";
import { useDropzone } from "react-dropzone";
import { getAllTravelCategory } from "../../../actions/travelCategory";
import { green } from "@mui/material/colors";
import { getAllFacilities } from "../../../actions/facilities";

const theme = createTheme(Themplates);

const useStyles = makeStyles(() => ({
  root: {
    boxShadow: "0 0 1px 1px #D0D3D4",
    border: "1px solid #D0D3D4",
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

const dataStruc = {
  name: "",
  quantity: 0,
  detail: "",
  category: "",
  roomSpace: {
    size: "",
    subroom: "",
  },
  facilities: [""],
  location: {
    houseNO: "",
    road: "",
    subDistrict: "",
    district: "",
    province: "",
    code: "",
  },
  nearby: [""],
  price: 0,
  discount: 0,
  netPrice: 0,
};

const FormTravel = () => {
  const classes = useStyles();
  const formRef = useRef();
  const dispatch = useDispatch();

  const { result: category } = useSelector((state) => state.travelCategory);
  const { result: facilities } = useSelector((state) => state.facilities);

  const [files, setFiles] = useState([]);
  const [external, setExternal] = useState();
  const [room, setRoom] = useState({ ...dataStruc });

  useEffect(() => {
    dispatch(getAllTravelCategory());
    dispatch(getAllFacilities());
  }, []);

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

  const removeIcon = (
    <IconButton>
      <Remove />
    </IconButton>
  );
  return (
    <div className={`page`}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Container maxWidth="xl">
            <Paper className={classes.root}>
              <Typography variant="h4" component="div" gutterBottom>
                เพิ่มรายการสินค้า Travel
              </Typography>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Button
                  startIcon={<QueueOutlined />}
                  component="label"
                  variant="contained"
                  style={{ backgroundColor: "#1769aa" }}
                >
                  Import Excel
                  <input
                    type="file"
                    hidden
                    // onChange={(event) => {
                    //   const file = event.target.files[0];
                    //   event.target.value = null;
                    //   handleImportFile(file);
                    // }}
                  />
                </Button>
              </Box>
              <br />
              <br />
              {external ? (
                ""
              ) : (
                <Formik initialValues={room}>
                  {({
                    values,
                    errors,
                    isSubmitting,
                    touched,
                    handleBlur,
                    setFieldValue,
                  }) => (
                    <Form autoComplete="off" onKeyDown={onKeyDown}>
                      <Typography
                        className={classes.typography}
                        component="div"
                      >
                        รายละเอียดที่พักและจำนวน
                      </Typography>
                      <Grid
                        container
                        spacing={2}
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Grid item md={10}>
                          <Field
                            component={TextField}
                            name={`name`}
                            fullWidth
                            label={`ชื่อที่พัก`}
                          />
                        </Grid>
                        <Grid item md={2}>
                          <Box
                            sx={{
                              // midwidth: "360px",
                              width: "100%",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                border: "1px solid #D0D3D4",
                                borderRadius: "4px",
                                width: "100%",
                                height: "56px",
                              }}
                            >
                              <IconButton
                                name="quantity"
                                sx={{
                                  borderRight: "1px solid #D0D3D4",
                                  borderRadius: "0px",
                                  height: "100%",
                                }}
                                disabled={values.quantity <= 0 ? true : false}
                                onClick={() => {
                                  setFieldValue(
                                    `quantity`,
                                    values.quantity - 1
                                  );
                                }}
                              >
                                <Remove />
                              </IconButton>
                              <Typography
                                variant="p"
                                component="div"
                                sx={{
                                  minWidth: "80px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                {values.quantity}
                              </Typography>
                              <IconButton
                                name={`quantity`}
                                sx={{
                                  borderLeft: "1px solid #D0D3D4",
                                  borderRadius: "0px",
                                  height: "100%",
                                }}
                                onClick={() => {
                                  setFieldValue(
                                    `quantity`,
                                    values.quantity + 1
                                  );
                                }}
                              >
                                <Add />
                              </IconButton>
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item md={12}>
                          <Field
                            name={`detail`}
                            component={TextField}
                            fullWidth
                            multiline
                            rows={2}
                            label={`รายละเอียด`}
                          />
                        </Grid>
                      </Grid>
                      <br />
                      <Divider />
                      <br />
                      <Typography
                        className={classes.typography}
                        component="div"
                        gutterBottom
                      >
                        หมวดหมู่
                      </Typography>
                      <Grid
                        container
                        spacing={4}
                        alignItems="center"
                        justifyContent="center"
                      >
                        {category &&
                          category.map((item, index) => (
                            <Grid item key={index}>
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                  minWidth: "240px",
                                }}
                              >
                                {values.category == item.id ? (
                                  <Card
                                    sx={{
                                      height: "60px",
                                      //   maxWidth: "160px",
                                      width: "100%",
                                      borderRadius: "50px",
                                      boxShadow: "0px 0px 3px 3px #61CAFF",
                                      // backgroundColor: "#B8E7FF",
                                    }}
                                  >
                                    <CardActionArea
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        height: "100%",
                                      }}
                                      onClick={() =>
                                        setFieldValue(`category`, item.id)
                                      }
                                    >
                                      <Typography variant="h6" component="div">
                                        {item.name}
                                      </Typography>
                                    </CardActionArea>
                                  </Card>
                                ) : (
                                  <Card
                                    sx={{
                                      height: "60px",
                                      //   maxWidth: "160px",
                                      width: "100%",
                                      borderRadius: "50px",
                                      boxShadow: "0px 0px 1px 1px #D0D3D4",
                                    }}
                                  >
                                    <CardActionArea
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        height: "100%",
                                      }}
                                      onClick={() =>
                                        setFieldValue(`category`, item.id)
                                      }
                                    >
                                      <Typography variant="h6" component="div">
                                        {item.name}
                                      </Typography>
                                    </CardActionArea>
                                  </Card>
                                )}
                              </Box>
                            </Grid>
                          ))}
                      </Grid>
                      <br />
                      <Divider />
                      <br />
                      <Typography
                        className={classes.typography}
                        component="div"
                      >
                        ขนาดและยูนิต
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item md={4}>
                          <Field
                            component={TextField}
                            fullWidth
                            name={`roomSpace.size`}
                            label={`ขนาด`}
                            type="number"
                          />
                        </Grid>
                        <Grid item md={8}>
                          <Field
                            component={TextField}
                            fullWidth
                            name={`roomSpace.subroom`}
                            label={`ยูนิต`}
                          />
                        </Grid>
                      </Grid>
                      <br />
                      <Divider />
                      <br />
                      <FieldArray name={"facilities"}>
                        {({ push, remove }) => (
                          <Fragment>
                            <Typography
                              className={classes.typography}
                              component={`div`}
                            >
                              สิ่งอำนวยความสะดวก
                            </Typography>
                            <Grid container spacing={2} alignItems={`center`}>
                              {values.facilities.map((val, index) => (
                                <Grid item md={4} key={index}>
                                  <Field
                                    component={TextField}
                                    name={`facilities[${index}]`}
                                    fullWidth
                                    InputProps={{
                                      endAdornment: (
                                        <IconButton
                                          color="error"
                                          disabled={
                                            values.facilities.length <= 1
                                              ? true
                                              : false
                                          }
                                          onClick={() => remove(index)}
                                        >
                                          <Close />
                                        </IconButton>
                                      ),
                                    }}
                                    label={`อันดับ (${index + 1})`}
                                  />
                                </Grid>
                              ))}
                              <Grid item>
                                <IconButton
                                  color="success"
                                  onClick={() => push("")}
                                >
                                  <Add fontSize="large" />
                                </IconButton>
                              </Grid>
                            </Grid>
                          </Fragment>
                        )}
                      </FieldArray>
                      <br />
                      <Divider />
                      <br />
                      <Typography
                        className={classes.typography}
                        component={`div`}
                      >
                        สถานที่ตั้ง
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item md={4}>
                          <Field
                            component={TextField}
                            name={`location.houseNO`}
                            fullWidth
                            label={`บ้านเลขที่`}
                          />
                        </Grid>
                        <Grid item md={4}>
                          <Field
                            component={TextField}
                            name={`location.road`}
                            fullWidth
                            label={`ถนน`}
                          />
                        </Grid>
                        <Grid item md={4}>
                          <Field
                            component={TextField}
                            name={`location.subDistrict`}
                            fullWidth
                            label={`ตำบล/แขวง`}
                          />
                        </Grid>
                        <Grid item md={4}>
                          <Field
                            component={TextField}
                            name={`location.district`}
                            fullWidth
                            label={`อำเภอ/เขต`}
                          />
                        </Grid>
                        <Grid item md={4}>
                          <Field
                            component={TextField}
                            name={`location.province`}
                            fullWidth
                            label={`จังหวัด`}
                          />
                        </Grid>
                        <Grid item md={4}>
                          <Field
                            component={TextField}
                            name={`location.code`}
                            fullWidth
                            label={`รหัสไปรษณีย์`}
                          />
                        </Grid>
                      </Grid>
                      <br />
                      <Divider />
                      <br />
                      <FieldArray name={"nearby"}>
                        {({ push, remove }) => (
                          <Fragment>
                            <Typography
                              className={classes.typography}
                              component={`div`}
                            >
                              สถานที่ใกล้เคียง
                            </Typography>
                            <Grid container spacing={2} alignItems={`center`}>
                              {values.nearby.map((val, index) => (
                                <Grid item md={4} key={index}>
                                  <Field
                                    component={TextField}
                                    name={`nearby[${index}]`}
                                    fullWidth
                                    InputProps={{
                                      endAdornment: (
                                        <IconButton
                                          color="error"
                                          disabled={
                                            values.nearby.length <= 1
                                              ? true
                                              : false
                                          }
                                          onClick={() => remove(index)}
                                        >
                                          <Close />
                                        </IconButton>
                                      ),
                                    }}
                                    label={`สถานที่ที่ (${index + 1})`}
                                  />
                                </Grid>
                              ))}
                              <Grid item>
                                <IconButton
                                  color="success"
                                  onClick={() => push("")}
                                >
                                  <Add fontSize="large" />
                                </IconButton>
                              </Grid>
                            </Grid>
                          </Fragment>
                        )}
                      </FieldArray>
                      <br />
                      <Divider />
                      <br />
                      <Typography
                        className={classes.typography}
                        component={`div`}
                      >
                        ราคาและส่วนลด
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item md={4}>
                          <Field
                            component={TextField}
                            name={`price`}
                            fullWidth
                            label={`ราคาต่อห้อง`}
                          />
                        </Grid>
                        <Grid item md={4}>
                          <Field
                            component={TextField}
                            name={`discount`}
                            fullWidth
                            label={`ส่วนลด`}
                          />
                        </Grid>
                        <Grid item md={4}>
                          <Field
                            component={TextField}
                            name={`netPrice`}
                            fullWidth
                            label={`ราคาสุทธิ`}
                          />
                        </Grid>
                      </Grid>
                    </Form>
                  )}
                </Formik>
              )}
            </Paper>
          </Container>
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
};

export default FormTravel;
