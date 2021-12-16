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
} from "@mui/icons-material";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { Field, FieldArray, Form, Formik } from "formik";
import { border, Box, width } from "@mui/system";
import { getAllShopCategory } from "../../../actions/shopCategory";
import "./index.css";

import * as XLSX from "xlsx";
import { getAllDelivery } from "../../../actions/delivery";
import { useDropzone } from "react-dropzone";
import * as Yup from "yup";

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

const strucOrder = {
  name: "",
  quantity: 0,
  detail: "",
  category: -1,
  price: 0,
  discount: 0,
  netPrice: 0,
  brand: "",
  skuCode: "",
  warranty: 0,
  warrantyDetail: "",
  deliveryType: "",
  deliveryTime: "",
  deliveryCost: "",
};

const deliveryType = [
  "Outbound delivery",
  "Outbound delivery without reference",
  "Returns delivery",
  "Replenishment delivery",
  "Outbound deliveries from projects",
  "Outbound delivery for subcontractor",
  "Inbound delivery",
  "WMS outbound delivery",
  "WMS inbound delivery",
  "Replenishment WMS",
  "Customer returns WMS",
  "Delivery for stock transfer",
  "R/2-R/3 Link",
];

const deliveryTime = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const deliveryCost = [0, 10, 20, 30, 40, 50, 60, 70];

const FormLifeStyle = () => {
  const classes = useStyles();
  const formRef = useRef();
  const dispatch = useDispatch();

  const { result: category } = useSelector((state) => state.shopCategory);
  const { result: delivery } = useSelector((state) => state.delivery);
  const [order, setOrder] = useState({ ...strucOrder });
  const [data, setData] = useState();
  const [external, setExternal] = useState();
  const [preview, setPreview] = useState(false);
  const [imagePreview, setImagePreview] = useState();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    dispatch(getAllShopCategory());
    dispatch(getAllDelivery());
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
          quantity: row["quantity"],
          detail: row["detail"],
          category: category
            ? category.find((item) => item.name == row["category"]).id
            : row["category"],
          price: row["price"],
          discount: row["discount"],
          netPrice: row["netPrice"],
          brand: row["brand"],
          skuCode: row["sku code"],
          warranty: row["warranty"],
          warrantyDetail: row["warranty detail"],
          deliveryType: row["delivery type"],
          deliveryTime: row["delivery time"],
          deliveryCost: row["delivery cost"],
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

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 120,
    },
    {
      field: "quantity",
      headerName: "QTY",
      width: 120,
    },
    {
      field: "detail",
      headerName: "Detail",
      width: 120,
    },
    {
      field: "category",
      headerName: "Category",
      width: 120,
    },
    {
      field: "price",
      headerName: "Price",
      width: 120,
    },
    {
      field: "discount",
      headerName: "Discount",
      width: 120,
    },
    {
      field: "netPrice",
      headerName: "Net price",
      width: 120,
    },
    {
      field: "warranty",
      headerName: "Warranty",
      width: 120,
    },
    {
      field: "warrantyDetail",
      headerName: "Warranty detail",
      width: 120,
    },
    {
      field: "deliveryType",
      headerName: "Delivery type",
      width: 120,
    },
    {
      field: "deliveryTime",
      headerName: "Delivery time",
      width: 120,
    },
    {
      field: "deliveryCost",
      headerName: "Delivery cost",
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
    quantity: Yup.number().required().min(1),
    detail: Yup.string().required("Please enter detail"),
    category: Yup.number().required().min(1),
    price: Yup.number().required().min(1),
    discount: Yup.number().required(),
    netPrice: Yup.number().required(),
    brand: Yup.string().required("Please enter brand name"),
    skuCode: Yup.string().required(),
    warranty: Yup.number().required(),
    warrantyDetail: Yup.string().required("Please enter warranty detail"),
    deliveryType: Yup.string().required("Please enter delivery type"),
    deliveryTime: Yup.number().required("Please enter delivery time"),
    deliveryCost: Yup.number().required("Please enter delivery cost"),
  });

  return (
    <div className={`page`}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Container maxWidth="xl">
            <Paper className={classes.root}>
              <Typography variant="h4" component="div" gutterBottom>
                เพิ่มรายการสินค้า Lifestyle
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
                          <Grid
                            item
                            xs={12}
                            xs={12}
                            sx={{ textAlign: "center" }}
                          >
                            <img
                              style={{ maxWidth: "200px", height: "100%" }}
                              src={external
                                .filter((item) => item.id == imagePreview)
                                .map((e) => {
                                  return e.image1;
                                })}
                            />
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            xs={12}
                            sx={{ textAlign: "center" }}
                          >
                            <img
                              style={{ maxWidth: "200px", height: "100%" }}
                              src={external
                                .filter((item) => item.id == imagePreview)
                                .map((e) => {
                                  return e.image2;
                                })}
                            />
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            xs={12}
                            sx={{ textAlign: "center" }}
                          >
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
                  initialValues={order}
                  validationSchema={validate}
                  innerRef={formRef}
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
                        สินค้าและจำนวน
                      </Typography>
                      <Grid
                        container
                        spacing={2}
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Grid item xs={12} sm={7} md={8} lg={10}>
                          <Field
                            component={TextField}
                            name={`name`}
                            fullWidth
                            label={`ชื่อสินค้า`}
                          />
                        </Grid>
                        <Grid item xs={12} sm={5} md={4} lg={2}>
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
                        <Grid item xs={12} md={12}>
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
                      <Grid
                        container
                        spacing={4}
                        alignItems="center"
                        justifyContent="center"
                      >
                        {category &&
                          // console.log("category", category) &&
                          category.map((item, index2) => (
                            <Grid
                              item
                              xl={2}
                              lg={3}
                              md={4}
                              sm={6}
                              xs={12}
                              key={index2}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                  minWidth: "180px",
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
                        variant="p"
                        component="div"
                      >
                        ราคาและสต๊อก
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                          <Field
                            component={TextField}
                            onChange={(e) => {
                              setFieldValue(`price`, e.target.value);
                              setFieldValue(
                                `netPrice`,
                                e.target.value -
                                  (e.target.value * values.discount) / 100
                              );
                            }}
                            name={`price`}
                            fullWidth
                            type="number"
                            InputProps={{ inputProps: { min: 0 } }}
                            label={`ราคาสินค้าต่อชิ้น (Coin)`}
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <Field
                            component={TextField}
                            onChange={(e) => {
                              setFieldValue(`discount`, e.target.value);
                              setFieldValue(
                                `netPrice`,
                                values.price -
                                  (values.price * e.target.value) / 100
                              );
                            }}
                            name={`discount`}
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
                            value={values.netPrice}
                            // disabled

                            fullWidth
                            label={`ราคาสุทธิ (Coin)`}
                          />
                        </Grid>
                        <Grid item xs={12} md={8}>
                          <Field
                            component={TextField}
                            name={`brand`}
                            fullWidth
                            label={`แบรนด์`}
                            fullWidth
                            label={`Brand`}
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <Field
                            component={TextField}
                            name={`skuCode`}
                            // size="mdall"
                            fullWidth
                            label={`SKU Code`}
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
                      >
                        การรับประกันและการจัดส่ง
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={2}>
                          <Field
                            component={TextField}
                            name={`warranty`}
                            fullWidth
                            type="number"
                            label={`Warranty`}
                          />
                        </Grid>
                        <Grid item xs={12} md={10}>
                          <Field
                            component={TextField}
                            name={`warrantyDetail`}
                            fullWidth
                            label={`Warranty Detail`}
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <Field
                            component={Select}
                            formControl={{
                              sx: { width: "100%", size: "small" },
                            }}
                            name={`deliveryType`}
                            label={`Delivery Type`}
                          >
                            {delivery &&
                              delivery.map((val, index) => (
                                <MenuItem key={index} value={val.id}>
                                  {val.name}
                                  {console.log("val", val)}
                                </MenuItem>
                              ))}
                          </Field>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <Field
                            component={Select}
                            formControl={{
                              sx: { width: "100%", size: "small" },
                            }}
                            name={`deliveryTime`}
                            label={`Delivery Time`}
                          >
                            {deliveryTime &&
                              deliveryTime.map((val, index) => (
                                <MenuItem key={index} value={val}>
                                  {val}
                                </MenuItem>
                              ))}
                          </Field>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <Field
                            component={Select}
                            formControl={{
                              sx: { width: "100%", size: "small" },
                            }}
                            name={`deliveryCost`}
                            label={`Delivery Cost`}
                          >
                            {deliveryCost &&
                              deliveryCost.map((val, index) => (
                                <MenuItem key={index} value={val}>
                                  {val}
                                </MenuItem>
                              ))}
                          </Field>
                        </Grid>
                      </Grid>
                      <br />
                      <Divider />
                      <br />
                      <Typography className={classes.typography}>
                        อัพโหลดรูปภาพ
                      </Typography>
                      <Grid container spacing={6}>
                        <Grid item xs={12} lg={6}>
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
                        <Grid item xs={12} lg={6}>
                          <Grid container spacing={2}>
                            {/* {thumbs} */}
                            {files.map((file) => (
                              <Grid item xs={12}>
                                <img
                                  key={file.name}
                                  src={file.preview}
                                  // className={classes.uploadImage}
                                  sx={{ position: "absolute" }}
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

export default FormLifeStyle;
