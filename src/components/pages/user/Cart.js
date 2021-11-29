import React, { useState, useEffect, Fragment } from "react";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import {
  Avatar,
  Container,
  Divider,
  Icon,
  List,
  ListItem,
  ListItemAvatar,
  Paper,
  Typography,
  ListItemText,
  Grid,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Button,
  IconButton,
} from "@mui/material";
import {
  Delete,
  ShoppingCart,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getAllPackage } from "../../../actions/package";
import { getAllInsurance } from "../../../actions/insurance";
import { getAllItem } from "../../../actions/item";
import { getAllTravel } from "../../../actions/travel";
import itemService from "../../../services/item.service";
import travelService from "../../../services/travel.service";
import insuranceService from "../../../services/insurance.service";
import packageService from "../../../services/package.service";
import { Box } from "@mui/system";
import { postCart } from "../../../actions/cart";
import Sticky from "react-stickynode";

const theme = createTheme();

const useStyles = makeStyles(() => ({
  root: {
    boxShadow: "none",
    border: "1px solid #D0D3D4",
    padding: "20px",
  },
}));
const Cart = (props) => {
  const classes = useStyles();
  const dispath = useDispatch();
  const { cart: cartValue } = useSelector((state) => state.cart);
  const [data, setData] = useState();
  const [number, setNumber] = useState();

  useEffect(async () => {
    const preData = async () => {
      console.log("JSON", JSON.parse(localStorage.getItem("cart")));
      const value = JSON.parse(localStorage.getItem("cart")) || [];
      const data_ = [];

      const preData = value.reduce(
        (prev, cur) =>
          prev
            .map((e) => {
              return e.id;
            })
            .includes(cur.id)
            ? prev
            : prev.concat(cur),
        []
      );

      const countData = value.reduce(
        (prev, cur) => ({ ...prev, [cur.id]: (prev[cur.id] || 0) + 1 }),
        {}
      );

      for (let i = 0; i < preData.length; i++) {
        const type = preData[i].type;
        const id = preData[i].id;
        let tmp;
        if (type == "insurance") {
          tmp = await insuranceService.getDetailInsurance(id).then((res) => {
            return res.data;
          });
        } else if (type == "lifestyle") {
          tmp = await itemService.getDetailItem(id).then((res) => {
            return res.data;
          });
        } else if (type == "travel") {
          tmp = await travelService.getDetailTravel(id).then((res) => {
            return res.data;
          });
        } else if (type == "package") {
          tmp = await packageService.getDetailPackage(id).then((res) => {
            return res.data;
          });
        }
        console.log("type", type);
        console.log("tmp", tmp);
        data_.push(tmp);
      }
      // console.log("preData", preData);
      // console.log("countData", countData);
      setData(data_);
      setNumber(countData);
    };
    // const data_ = await preData();
    preData();

    // setData(data_);
    // console.log("data_", data_);
  }, []);

  const subtotal = (type) => {
    let count = 0;

    data &&
      data
        .filter((item) => item.type?.toLowerCase() == type)
        .map((val) => {
          count += val.number;
        });

    return count;
  };

  const total = (type) => {
    let total_ = 0;
    data &&
      data
        .filter((item) => item.type?.toLowerCase() == type)
        .map((val) => {
          total_ += (val.price || val.total) * val.number;
        });

    return total_;
  };

  const removeData = (index) => {
    let data_ = [...data];
    data_.splice(index, 1);
    cartValue.splice(index, 1);
    localStorage.removeItem("cart");

    dispath(postCart(cartValue));
    setData(data_);
  };

  return (
    <div className={`page`}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          {console.log("render")}
          {data != undefined ? (
            <Container maxWidth="xl">
              {console.log("render true", data)}
              <Paper className={classes.root}>
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  My Cart{" "}
                  <ShoppingCartOutlined
                    fontSize="large"
                    sx={{ marginLeft: "10px" }}
                  />
                </Typography>
              </Paper>
              <br />
              <Grid container spacing={2}>
                <Grid item xl={8}>
                  <Paper className={classes.root}>
                    <List>
                      {console.log("data map", data)}
                      {data.map((val, index) => (
                        <div key={index}>
                          <ListItem
                            secondaryAction={
                              <IconButton
                                onClick={(index) => removeData(index)}
                              >
                                <Delete />
                              </IconButton>
                            }
                          >
                            <ListItemAvatar>
                              <Avatar
                                alt={val.name}
                                src={`${process.env.REACT_APP_URL}image/${val.image}`}
                              />
                            </ListItemAvatar>
                            <ListItemText
                              primary={val.name}
                              secondary={`จำนวน ${number[val.id]}`}
                            />
                          </ListItem>
                          <Divider />
                        </div>
                      ))}
                    </List>
                  </Paper>
                </Grid>
                <Grid item xl={4}>
                  <Sticky enabled={true} top={70}>
                    <Paper className={classes.root}>
                      <Typography variant="h5" sx={{ fontWeight: "600" }}>
                        สรุปรายการสั่งซื้อ
                      </Typography>
                      <Table>
                        <TableBody>
                          {["insurance", "package", "lifestyle", "travel"].map(
                            (val, index) => (
                              <TableRow key={index}>
                                <TableCell sx={{ borderBottom: "none" }}>
                                  <Typography
                                    variant="subtitle2"
                                    component="span"
                                    color="text.secondary"
                                  >
                                    ประเภท {val}({subtotal(val)})
                                  </Typography>
                                </TableCell>
                                <TableCell
                                  align="right"
                                  sx={{
                                    borderBottom: "none",
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <Typography
                                    variant="subtitle1"
                                    component="span"
                                    sx={{ fontWeight: "600" }}
                                  >
                                    {val == "package" && "$"} {total(val)}
                                  </Typography>
                                  {val == "package" ? (
                                    ""
                                  ) : (
                                    <Icon
                                      sx={{
                                        marginRight: "5px",

                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                      fontSize="small"
                                    >
                                      <img
                                        src={`${process.env.PUBLIC_URL}/assets/icons/${val}Coin.svg`}
                                        width="100%"
                                        height="auto"
                                      />
                                    </Icon>
                                  )}
                                </TableCell>
                              </TableRow>
                            )
                          )}
                        </TableBody>
                      </Table>

                      <Button fullWidth variant="contained" color="success">
                        Check out
                      </Button>
                    </Paper>
                  </Sticky>
                </Grid>
              </Grid>
            </Container>
          ) : (
            console.log("data", data)
          )}
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
};

export default Cart;
