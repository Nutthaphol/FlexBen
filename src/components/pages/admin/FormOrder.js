import React, { useState, useEffect, useRef, Fragment } from "react";
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
} from "@mui/icons-material";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { Field, FieldArray, Form, Formik } from "formik";
import { border, Box, width } from "@mui/system";
import { getAllShopCategory } from "../../../actions/shopCategory";

import * as XLSX from "xlsx";
import { getAllDelivery } from "../../../actions/delivery";

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

const columns: GridColDef[] = [
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
];

// data.reduce(
//   (prev, cur, index) =>
//     prev +
//     (cur.divisionNumber +
//       cur.department.reduce(
//         (prev2, cur2) =>
//           prev2 +
//           (cur2.departmentNumber +
//             cur2.section.reduce((prev3, cur3) => prev3 + cur3.sectionNumber))
//       ))
// );

const deliveryTime = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const deliveryCost = [0, 10, 20, 30, 40, 50, 60, 70];

const FormOrder = () => {
  const classes = useStyles();
  const formRef = useRef();
  const dispatch = useDispatch();

  const { result: category } = useSelector((state) => state.shopCategory);
  const { result: delivery } = useSelector((state) => state.delivery);
  const [order, setOrder] = useState({ ...strucOrder });
  const [data, setData] = useState();
  const [external, setExternal] = useState();
  const [dialog, setDialog] = useState(false);

  useEffect(() => {
    dispatch(getAllShopCategory());
    dispatch(getAllDelivery());
  }, []);

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
      const tmpData = data.map((row, index) => {
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
        };
      });
      file = null;
      const perData: GridRowsProp = tmpData;
      setExternal(perData);
      setDialog(true);
    });
  };

  const handleOnClose = () => {
    setDialog(false);
  };

  const handleOnClickDialog = () => {
    setDialog(true);
  };

  const handleOnClickClearFile = () => {
    setExternal(null);
  };

  // const handleOnClickAddOrder = () => {
  //   let order_ = [...order];
  //   order_.push({ ...strucOrder });
  //   order_[order_.length - 1].id = order_[order_.length - 2].id + 1;

  //   setOrder(order_);
  // };
  // const handleOnClickRemoveOrder = (index) => {
  //   let order_ = [...order];
  //   console.log("index", index);
  //   order_.splice(index, 1);
  //   setOrder(order_);
  // };

  return (
    <div className={`page`}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Container maxWidth="xl">
            <Paper className={classes.root}>
              <Typography variant="h4" component="div" gutterBottom>
                เพิ่มรายการสินค้า
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
                {/* <Button
                  startIcon={<Add />}
                  component="label"
                  variant="contained"
                  // style={{ backgroundColor: "#1769aa" }}
                  color="success"
                  onClick={() => handleOnClickAddOrder()}
                >
                  Add Order
                </Button> */}
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
                </Box>
              ) : (
                <Formik
                  initialValues={order}
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
                        {/* <Grid item xs={12}>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Button
                            component="label"
                            variant="contained"
                            color="error"
                            disabled={order.length <= 1 ? true : false}
                            onClick={() => handleOnClickRemoveOrder(index)}
                          >
                            <Clear />
                          </Button> 
                    </Box>
                  </Grid>*/}
                        <Grid item md={10}>
                          <Field
                            component={TextField}
                            name={`name`}
                            // size="small"
                            fullWidth
                            label={`ชื่อสินค้า`}
                          />
                        </Grid>
                        <Grid item>
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
                          {/* <Typography
                      className={classes.typography}
                      variant="p"
                      component="div"
                    >
                      รายละเอียดสินค้า
                    </Typography> */}
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
                        <Grid item xl={4}>
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
                            // size="small"
                            fullWidth
                            type="number"
                            InputProps={{ inputProps: { min: 0 } }}
                            label={`ราคาสินค้าต่อชิ้น (Coin)`}
                          />
                        </Grid>
                        <Grid item xl={4}>
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
                            // size="small"
                            fullWidth
                            type="number"
                            InputProps={{ inputProps: { min: 0 } }}
                            label={`ส่วนลด (%)`}
                          />
                        </Grid>
                        <Grid item xl={4}>
                          <Field
                            component={TextField}
                            name={`netPrice`}
                            value={values.netPrice}
                            // disabled
                            // size="small"
                            fullWidth
                            label={`ราคาสุทธิ (Coin)`}
                          />
                        </Grid>
                        <Grid item xl={8}>
                          <Field
                            component={TextField}
                            name={`brand`}
                            fullWidth
                            label={`แบรนด์`}
                            // size="small" fullWidth label={`Brand`}
                          />
                        </Grid>
                        <Grid item xl={4}>
                          <Field
                            component={TextField}
                            name={`skuCode`}
                            // size="small"
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
                        <Grid item xl={2}>
                          <Field
                            component={TextField}
                            name={`warranty`}
                            // size="small"
                            fullWidth
                            type="number"
                            label={`Warranty`}
                          />
                        </Grid>
                        <Grid item xl={10}>
                          <Field
                            component={TextField}
                            name={`warrantyDetail`}
                            // size="small"
                            fullWidth
                            label={`Warranty Detail`}
                          />
                        </Grid>
                        <Grid item xl={4}>
                          <Field
                            component={Select}
                            formControl={{
                              sx: { width: "100%", size: "small" },
                            }}
                            // size="small"
                            name={`deliveryType`}
                            label={`Delivery Type`}
                          >
                            {delivery &&
                              delivery.map((val, index) => (
                                <MenuItem key={index} value={val.id}>
                                  {val.name}
                                </MenuItem>
                              ))}
                          </Field>
                        </Grid>
                        <Grid item xl={4}>
                          <Field
                            component={Select}
                            formControl={{
                              sx: { width: "100%", size: "small" },
                            }}
                            // size="small"
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
                        <Grid item xl={4}>
                          <Field
                            component={Select}
                            formControl={{
                              sx: { width: "100%", size: "small" },
                            }}
                            // size="small"
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

                      {/* <pre>{JSON.stringify({ values, errors }, null, 4)}</pre> */}
                    </Form>
                  )}
                </Formik>
              )}
            </Paper>

            {/* <Dialog open={dialog} onClose={() => handleOnClose()}>
              <DialogTitle>Data imported</DialogTitle>
              <DialogContent sx={{ width: "700px", midheight: "300px" }}>
                <DataGrid columns={columns} rows={external} />
              </DialogContent>
            </Dialog> */}
          </Container>
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
};

export default FormOrder;
