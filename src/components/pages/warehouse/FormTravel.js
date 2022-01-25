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
  Icon,
} from "@mui/material";
import { Select, SimpleFileUpload, Switch, TextField } from "formik-mui";
import * as Yup from "yup";
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

const dataStruc = {
  name: "",
  quantity: 0,
  detail: "",
  category: "",
  // roomSpace: {
  //   size: "",
  //   subroom: "",
  // },
  facilities: [],
  location: {
    houseNO: "",
    road: "",
    subDistrict: "",
    district: "",
    province: "",
    code: "",
    country: "",
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
  const [imagePreview, setImagePreview] = useState();
  const [preview, setPreview] = useState(false);

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

  const { getRootProps, getInputProps } = useDropzone({
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

  const handleImportFile = (file) => {
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
      const preData = data.map((row, index) => {
        return {
          id: index + 1,
          name: row["name"],
          quantity: row["quantity"],
          detail: row["detail"],
          category:
            category &&
            category.find((item) => item.id == row["category"]).name,
          facilities: row["facilities"].split(",").map((e) => {
            return facilities && facilities.find((item) => item.id == e).name;
          }),
          location: row["location"],
          nearby: row["nearby"],
          price: row["price"],
          discount: row["discount"],
          netPrice: row["netPrice"],
          image1: row["image1"],
          image2: row["image2"],
          image3: row["image3"],
        };
      });
      file = null;
      setExternal(preData);
    });
  };

  const handleOnClickClearFile = () => {
    setExternal(null);
  };

  const columns = [
    {
      field: "name",
      headerName: "ชื่อ",
      width: 120,
    },
    {
      field: "quantity",
      headerName: "จำนวน",
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
      field: "facilities",
      headerName: "สิ่งอำนวยความสะดวก",
      width: 120,
    },
    {
      field: "location",
      headerName: "ที่ตั้ง",
      width: 120,
    },
    {
      field: "nearby",
      headerName: "สถานที่ใกล้เคียง",
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
          // const api: GridApi = params.api;
          // const thisRow: Record<string, GridCellValue> = {};

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
    quantity: Yup.number().required().min(1, "quantity > 0"),
    detail: Yup.string().required("quantity must be greater than"),
    category: Yup.number().required().min(1),
    price: Yup.number().required().min(1),
    discount: Yup.number().required(),
    netPrice: Yup.number().required(),
    location: Yup.object().shape({
      houseNO: Yup.string().required("Please enter houseNO"),
      road: Yup.string().required("Please enter road"),
      subDistrict: Yup.string().required("Please enter sub-district"),
      district: Yup.string().required("Please enter district"),
      province: Yup.string().required("Please enter province"),
      code: Yup.string().required("Please enter code"),
      country: Yup.string().required("Please enter country"),
    }),
    facilities: Yup.array().required().min(1),
    nearby: Yup.array().required().min(1),
  });

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
                <Formik initialValues={room} validationSchema={validate}>
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
                          <Field name={`quantity`}>
                            {({
                              field, // { name, value, onChange, onBlur }
                              form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                              meta,
                            }) => (
                              <Box>
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    borderRadius: "4px",
                                    border: `1px solid ${
                                      meta.touched && meta.error
                                        ? "#d32f2f"
                                        : "#D0D3D4"
                                    }`,
                                  }}
                                >
                                  <IconButton
                                    sx={{
                                      borderRight: "1px solid #D0D3D4",
                                      borderRadius: "0px",
                                      height: "100%",
                                      padding: "0 8px",
                                      "&:hover": {
                                        backgroundColor:
                                          "transparent !important",
                                      },
                                    }}
                                    onClick={() => {
                                      setFieldValue(
                                        `quantity`,
                                        field.value - 1
                                      );
                                    }}
                                    disabled={field.value <= 0 ? true : false}
                                  >
                                    <Remove />
                                  </IconButton>
                                  <Typography
                                    sx={{
                                      padding: "16.5px 14px",
                                      color:
                                        meta.touched && meta.error && "#d32f2f",
                                    }}
                                  >
                                    {field.value}
                                  </Typography>
                                  <IconButton
                                    sx={{
                                      borderLeft: "1px solid #D0D3D4",
                                      borderRadius: "0px",
                                      height: "100%",
                                      padding: "0 8px",
                                      "&:hover": {
                                        backgroundColor:
                                          "transparent !important",
                                      },
                                    }}
                                    onClick={() => {
                                      setFieldValue(
                                        `quantity`,
                                        field.value + 1
                                      );
                                    }}
                                  >
                                    <Add />
                                  </IconButton>
                                </Box>
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
                      <FieldArray name={"facilities"}>
                        {({ push, remove }) => (
                          <Fragment>
                            <Typography
                              className={classes.typography}
                              component={`div`}
                            >
                              สิ่งอำนวยความสะดวก
                            </Typography>
                            <Grid
                              container
                              spacing={2}
                              alignItems={`center`}
                              justifyContent={`center`}
                            >
                              {facilities &&
                                facilities.map((item, index) => (
                                  <Grid item key={index}>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        minWidth: "240px",
                                      }}
                                    >
                                      {values.facilities
                                        .map((e) => {
                                          return e.id;
                                        })
                                        .indexOf(item.id) != -1 ? (
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
                                              textAlign: "center",
                                              height: "100%",
                                            }}
                                            onClick={() =>
                                              remove(
                                                values.facilities
                                                  .map((e) => {
                                                    return e.id;
                                                  })
                                                  .indexOf(item.id)
                                              )
                                            }
                                          >
                                            <Typography
                                              variant="h6"
                                              component="div"
                                            >
                                              {item.name}
                                            </Typography>
                                            <Icon>
                                              <img
                                                src={`${process.env.PUBLIC_URL}/assets/icons/${item.icon}`}
                                                width={`100%`}
                                              />
                                            </Icon>
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
                                              textAlign: "center",
                                              height: "100%",
                                            }}
                                            onClick={() =>
                                              push({ id: item.id })
                                            }
                                          >
                                            <Typography
                                              variant="h6"
                                              component="div"
                                            >
                                              {item.name}
                                            </Typography>
                                            <Icon>
                                              <img
                                                src={`${process.env.PUBLIC_URL}/assets/icons/${item.icon}`}
                                                width={`100%`}
                                              />
                                            </Icon>
                                          </CardActionArea>
                                        </Card>
                                      )}
                                    </Box>
                                  </Grid>
                                ))}
                              {/* {values.facilities.map((val, index) => (
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
                              ))} */}
                              {/* <Grid item>
                                <IconButton
                                  color="success"
                                  onClick={() => push("")}
                                >
                                  <Add fontSize="large" />
                                </IconButton>
                              </Grid> */}
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
                        <Grid item md={4}>
                          <Field
                            component={TextField}
                            name={`location.country`}
                            fullWidth
                            label={`ประเทศ`}
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
                      <br />
                      <Divider />
                      <br />
                      <Typography className={classes.typography}>
                        อัพโหลดรูปภาพ
                      </Typography>
                      <Grid container spacing={6}>
                        <Grid item lg={6}>
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
                        <Grid item lg={6}>
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
              )}
            </Paper>
          </Container>
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
};

export default FormTravel;
