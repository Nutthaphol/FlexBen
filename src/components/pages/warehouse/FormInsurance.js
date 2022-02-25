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
  CancelRounded,
  Close,
} from "@mui/icons-material";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { Field, FieldArray, Form, Formik } from "formik";
import { border, Box, width } from "@mui/system";
import { getAllShopCategory } from "../../../actions/shopCategory";
import "./index.css";
import * as Yup from "yup";

import * as XLSX from "xlsx";
import { getAllDelivery } from "../../../actions/delivery";
import { useDropzone } from "react-dropzone";
import { getAllInsuranceCategory } from "../../../actions/insuranceCategory";

const theme = createTheme(Themplates);

const useStyles = makeStyles(() => ({
  root: {
    // boxShadow: "0 0 1px 1px #D0D3D4",
    // border: "1px solid #D0D3D4",
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

const strucInsurance = {
  name: "",
  company: "",
  detail: "",
  category: "",
  protection: [
    {
      name: "",
      condition: "",
    },
  ],
  protectionPeriod: "",
  link: "",
  price: 0,
  discount: 0,
  netPrice: 0,
};

const period = [1, 3, 5, 7, 10, 15, 20, 30];

const FormInsurance = () => {
  const classes = useStyles();
  const formRef = useRef();
  const dispatch = useDispatch();

  const { result: category } = useSelector((state) => state.insuranceCategory);

  const [preview, setPreview] = useState(false);
  const [imagePreview, setImagePreview] = useState();
  const [files, setFiles] = useState([]);
  const [external, setExternal] = useState();
  const [insurance, setInsurance] = useState({ ...strucInsurance });
  const [data, setData] = useState();

  useEffect(() => {
    dispatch(getAllInsuranceCategory());
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

  const handleImportFile = (file) => {
    console.log(file);
    setExternal(null);
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      if (!file) {
        reject();
      }
      fileReader.readAsArrayBuffer(file);
      fileReader.onabort = () => {};
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
    promise.then((data) => {
      const perData = data.map((row, index) => {
        console.log("row", row);

        return {
          id: index + 1,
          name: row["name"],
          company: row["company"],
          detail: row["detail"],
          category: category
            ? category.find((item) => item.id == row["category"]).name
            : row["category"],
          protection: row["protection"].split(","),
          protectionPeriod: row["protectionPeriod"],
          link: row["link"],
          price: row["price"],
          discount: row["discount"],
          netPrice: row["netPrice"],
          image1: row["image1"],
          image2: row["image2"],
          image3: row["image3"],
        };
      });
      file = null;
      setExternal(perData);
    });
  };

  const handleOnClickClearFile = () => {
    setExternal(null);
  };

  const onKeyDown = (keyEvent) => {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
    }
  };

  const columns = [
    {
      field: "name",
      headerName: "ชื่อ",
      width: 120,
    },
    {
      field: "company",
      headerName: "บริษัท",
      width: 120,
    },
    {
      field: "detail",
      headerName: "รายละเอียด",
      width: 120,
    },
    {
      field: "category",
      headerName: "หมวดหมู่",
      width: 120,
    },
    {
      field: "protection",
      headerName: "ความคุ้มครอง",
      width: 360,
    },
    {
      field: "protectionPeriod",
      headerName: "ระยะเวลาคุ้มครอง",
      width: 120,
    },
    {
      field: "link",
      headerName: "เงื่อนไขความคุ้มครอง",
      width: 120,
    },
    {
      field: "price",
      headerName: "ราคาต่อห้อง",
      width: 120,
    },
    {
      field: "discount",
      headerName: "ส่วนลด",
      width: 120,
    },
    {
      field: "netPrice",
      headerName: "ราคาสุทธิ",
      width: 120,
    },
    {
      field: "image",
      headerName: "Image",
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          const api = params.api;
          const thisRow = {};
          //   const api: GridApi = params.api;
          //   const thisRow: Record<string, GridCellValue> = {};
          // c.field !== "__check__" &&
          api
            .getAllColumns()
            .filter((c) => !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );
          const tmp = params.id;
          console.log("thisRow", thisRow);
          console.log("tmp", tmp);
          setImagePreview(params.id);
          setPreview(true);
        };
        return (
          <Button
            onClick={onClick}
            startIcon={<Image />}
            color="warning"
            variant="contained"
            size="small"
            sx={{ textTransform: "none" }}
          >
            See
          </Button>
        );
      },
    },
  ];

  const validate = Yup.object().shape({
    name: Yup.string().required("Please enter name"),
    company: Yup.string().required("Please enter company"),
    detail: Yup.string().required("Please enter detail"),
    category: Yup.number().required().min(1),
    protection: Yup.array().required().min(1),
    protectionPeriod: Yup.string().required("Please enter protectionPeriod"),
    link: Yup.string().required("Please enter link"),
    price: Yup.number().required().min(1),
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
                เพิ่มรายการประกัน Insurance
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
                >
                  Import Excel
                  <input
                    type="file"
                    hidden
                    onChange={(event) => {
                      const file = event.target.files[0];
                      event.target.value = null;
                      handleImportFile(file);
                    }}
                  />
                </Button>
              </Box>
              <br />
              <br />
              {external ? (
                <Box sx={{ height: "600px" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      className={classes.typography}
                      sx={{ marginBottom: 0 }}
                    >
                      File
                    </Typography>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleOnClickClearFile()}
                    >
                      Remove file
                    </Button>
                  </Box>
                  <DataGrid
                    sx={{ height: "80%" }}
                    columns={columns}
                    rows={external}
                  />
                  <br />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button
                      variant="contained"
                      // color="error"
                      // onClick={() => handleOnClickClearFile()}
                      sx={{
                        fontWeight: "600",
                        fontSize: "18px",
                        backgroundColor: "#1769aa",
                      }}
                    >
                      ลงทะเบียน
                    </Button>
                  </Box>
                  <Dialog open={preview} onClose={() => setPreview(false)}>
                    <DialogContent>
                      {external && (
                        <Grid
                          container
                          spacing={2}
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Grid item xs={12} sx={{ textAlign: "center" }}>
                            <img
                              style={{ maxWidth: "200px", height: "100%" }}
                              src={external
                                .filter((item) => item.id == imagePreview)
                                .map((e) => {
                                  return e.image1;
                                })}
                            />
                          </Grid>
                          <Grid item xs={12} sx={{ textAlign: "center" }}>
                            <img
                              style={{ maxWidth: "200px", height: "100%" }}
                              src={external
                                .filter((item) => item.id == imagePreview)
                                .map((e) => {
                                  return e.image2;
                                })}
                            />
                          </Grid>
                          <Grid item xs={12} sx={{ textAlign: "center" }}>
                            <img
                              style={{ maxWidth: "200px", height: "100%" }}
                              src={external
                                .filter((item) => item.id == imagePreview)
                                .map((e) => {
                                  return e.image3;
                                })}
                            />
                          </Grid>
                        </Grid>
                      )}
                    </DialogContent>
                  </Dialog>
                </Box>
              ) : (
                <Formik
                  initialValues={insurance}
                  innerRef={formRef}
                  validationSchema={validate}
                  enableReinitialize
                  onSubmit={(values, setSubmitting) => {
                    try {
                      setData(values);
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
                    <Form autoComplete="off" onKeyDown={onKeyDown}>
                      <Typography
                        className={classes.typography}
                        variant="p"
                        component="div"
                      >
                        รายละเอียด
                      </Typography>
                      <Grid
                        container
                        spacing={2}
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Grid item md={8} xs={12}>
                          <Field
                            component={TextField}
                            name={`name`}
                            // size="small"
                            fullWidth
                            label={`ชื่อประกัน`}
                          />
                        </Grid>
                        <Grid item md={4} xs={12}>
                          <Field
                            component={TextField}
                            name={`company`}
                            // size="small"
                            fullWidth
                            label={`บริษัท`}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            name={`detail`}
                            component={TextField}
                            fullWidth
                            multiline
                            rows={2}
                            label={`รายละเอียดสินค้า`}
                          />
                        </Grid>
                      </Grid>
                      <br />
                      <Divider />
                      <br />
                      <Typography
                        className={classes.typography}
                        variant="p"
                        component="div"
                        gutterBottom
                      >
                        หมวดหมู่
                      </Typography>
                      <Field name={`category`}>
                        {({
                          field, // { name, value, onChange, onBlur }
                          form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                          meta,
                        }) => (
                          <Box>
                            <Grid
                              container
                              spacing={4}
                              alignItems="center"
                              justifyContent="center"
                            >
                              {category &&
                                // console.log("category", category) &&
                                category.map((item, index2) => (
                                  <Grid item key={index2}>
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
                                            boxShadow:
                                              "0px 0px 3px 3px #61CAFF",
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
                                            <Typography
                                              variant="h6"
                                              component="div"
                                            >
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
                                            boxShadow:
                                              "0px 0px 1px 1px #D0D3D4",
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
                                            <Typography
                                              variant="h6"
                                              component="div"
                                              sx={{
                                                color:
                                                  meta.touched &&
                                                  meta.error &&
                                                  "#d32f2f",
                                              }}
                                            >
                                              {item.name}
                                            </Typography>
                                          </CardActionArea>
                                        </Card>
                                      )}
                                    </Box>
                                  </Grid>
                                ))}
                            </Grid>
                            {meta.touched && meta.error && (
                              <Box
                                sx={{
                                  color: "#d32f2f",
                                  fontSize: "0.75rem",
                                  fontWeight: "400",
                                  margin: "3px 0px 0px 14px",
                                  lineHeight: "1.66",
                                }}
                              >
                                {meta.error}
                              </Box>
                            )}
                          </Box>
                        )}
                      </Field>

                      <br />
                      <Divider />
                      <br />
                      <FieldArray name={"protection"}>
                        {({ push, remove }) => (
                          <Fragment>
                            <Typography
                              className={classes.typography}
                              component={`div`}
                            >
                              ความคุ้มครอง
                            </Typography>
                            <Grid container spacing={2} alignItems={`center`}>
                              {values.protection.map((val, index) => (
                                <Fragment key={index}>
                                  <Grid item sm={4} xs={12}>
                                    <Field
                                      component={TextField}
                                      name={`protection[${index}].name`}
                                      fullWidth
                                      label={`หัวข้อความคุมครองที่ (${
                                        index + 1
                                      })`}
                                    />
                                  </Grid>
                                  <Grid item sm={7} xs={12}>
                                    <Field
                                      component={TextField}
                                      name={`protection[${index}].condition`}
                                      fullWidth
                                      label={`เนื้อหาความคุ้มครองที่ (${
                                        index + 1
                                      })`}
                                    />
                                  </Grid>
                                  <Grid item sm={1} xs={12}>
                                    {index != values.protection.length - 1 ? (
                                      <IconButton
                                        color="error"
                                        onClick={() => remove(index)}
                                      >
                                        <Close fontSize="large" />
                                      </IconButton>
                                    ) : (
                                      <IconButton
                                        color="success"
                                        onClick={() =>
                                          push({
                                            name: "",
                                            condition: "",
                                          })
                                        }
                                      >
                                        <Add fontSize="large" />
                                      </IconButton>
                                    )}
                                  </Grid>
                                </Fragment>
                              ))}
                              {/* <Grid item md={1}></Grid> */}
                            </Grid>
                          </Fragment>
                        )}
                      </FieldArray>
                      <br />
                      <Divider />
                      <br />
                      <Typography
                        className={classes.typography}
                        variant="p"
                        component="div"
                        gutterBottom
                      >
                        ระยะเวลาและเงื่อนไขความคุ้มครอง
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item lg={3} sm={4} xs={12}>
                          <Field
                            component={Select}
                            formControl={{
                              sx: { width: "100%", size: "small" },
                            }}
                            // size="small"
                            name={`protectionPeriod`}
                            label={`ระยะเวลาคุ้มครอง`}
                          >
                            {period &&
                              period.map((val, index) => (
                                <MenuItem key={index} value={val}>
                                  {val}
                                </MenuItem>
                              ))}
                          </Field>
                        </Grid>
                        <Grid item lg={9} sm={8} xs={12}>
                          <Field
                            component={TextField}
                            fullWidth
                            name={`link`}
                            label={`ลิงค์รายละเอียด`}
                          />
                        </Grid>
                      </Grid>
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
                        <Grid item md={4} sm={6} xs={12}>
                          <Field
                            component={TextField}
                            name={`price`}
                            fullWidth
                            label={`ราคาต่อห้อง`}
                          />
                        </Grid>
                        <Grid item md={4} sm={6} xs={12}>
                          <Field
                            component={TextField}
                            name={`discount`}
                            fullWidth
                            label={`ส่วนลด`}
                          />
                        </Grid>
                        <Grid item md={4} sm={6} xs={12}>
                          <Field
                            component={TextField}
                            name={`netPrice`}
                            fullWidth
                            label={`ราคาสุทธิ`}
                          />
                        </Grid>
                      </Grid>
                      <br />
                      <Divider />
                      <br />
                      <Typography className={classes.typography}>
                        อัพโหลดรูปภาพ
                      </Typography>
                      <Grid container spacing={6}>
                        <Grid item xs={12}>
                          <Box>
                            <Box {...getRootProps({ className: "dropzone" })}>
                              <Box className="inner-dropzone">
                                <input {...getInputProps()} />
                                <div
                                  className={`placeholder ${
                                    classes.placeholder
                                  } ${
                                    files.length != 0 &&
                                    classes.placeholderImageProfile
                                  }`}
                                >
                                  <AddAPhoto />
                                  <Typography
                                    style={{
                                      marginTop: 8,
                                      backgroundColor: "transparent",
                                    }}
                                    className={`${
                                      files != 0 && classes.placeholderLabel
                                    }`}
                                    variant="body2"
                                  >
                                    Upload Photo
                                  </Typography>
                                </div>
                              </Box>
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Grid container spacing={2}>
                            {/* {thumbs} */}
                            {files.map((file) => (
                              <Grid item>
                                <img
                                  key={file.name}
                                  src={file.preview}
                                  className={classes.uploadImage}
                                  height="144px"
                                />
                              </Grid>
                            ))}
                          </Grid>
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
                          }}
                        >
                          ลงทะเบียน
                        </Button>
                      </Box>
                      {/* <pre>{JSON.stringify({ values, errors }, null, 4)}</pre> */}
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

export default FormInsurance;
