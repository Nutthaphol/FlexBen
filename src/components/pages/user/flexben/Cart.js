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
  TableHead,
  TableContainer,
  Dialog,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Stack,
} from "@mui/material";
import {
  Add,
  CheckCircle,
  CheckroomOutlined,
  Delete,
  Remove,
  ShoppingCart,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getAllPackage } from "../../../../actions/package";
import { getAllInsurance } from "../../../../actions/insurance";
import { getAllItem } from "../../../../actions/item";
import { getAllTravel } from "../../../../actions/travel";
import itemService from "../../../../services/item.service";
import travelService from "../../../../services/travel.service";
import insuranceService from "../../../../services/insurance.service";
import packageService from "../../../../services/package.service";
import { Box } from "@mui/system";
import { postCart } from "../../../../actions/cart";
import Sticky from "react-stickynode";
import Themplates from "../../shared/theme";
import { amber, red } from "@mui/material/colors";
import { getUserProfile } from "../../../../actions/user";

const theme = createTheme(Themplates);

const useStyles = makeStyles(() => ({
  root: {
    boxShadow: "rgb(3 0 71 / 9%) 0px 1px 3px",
    padding: "1rem",
  },
  highLights: {
    color: amber[700],
    fontWeight: 600,
    fontSize: "1.25rem",
  },
}));

const Cart = (props) => {
  const classes = useStyles();
  const dispath = useDispatch();
  const { cart: cartValue } = useSelector((state) => state.cart);
  const { user: currentUser } = useSelector((state) => state.auth);
  const { result: userProfile } = useSelector((state) => state.userProfile);
  const [data, setData] = useState();
  const [number, setNumber] = useState();
  const [open, setOpen] = useState(false);

  useEffect(async () => {
    const preData = async () => {
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

        data_.push(tmp);
      }

      setData(data_);
      setNumber(countData);
    };
    preData();

    if (currentUser) {
      dispath(getUserProfile(currentUser.id));
    }
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

  const removeData = (id) => {
    let data_ = [...data];

    const index = data_
      .map((e) => {
        return e.id;
      })
      .indexOf(id);

    const newCart = cartValue.filter((item) => item.id != id);

    localStorage.removeItem("cart");

    dispath(postCart(newCart));

    data_.splice(index, 1);

    setData(data_);
  };

  const addNumber = (id) => {
    const number_ = { ...number };
    number_[id] += 1;
    setNumber(number_);

    const tmp = cartValue.find((item) => item.id == id);
    cartValue.push(tmp);
    localStorage.removeItem("cart");

    dispath(postCart(cartValue));
  };

  const removeNumber = (id) => {
    const number_ = { ...number };
    number_[id] -= 1;
    setNumber(number_);
    console.log("cartValue", cartValue);
    const index = cartValue
      .map((e) => {
        return e.id;
      })
      .indexOf(id);

    cartValue.splice(index, 1);

    localStorage.removeItem("cart");

    dispath(postCart(cartValue));
  };

  const totalList = () => {
    let list_ = 0;
    for (const [key, val] of Object.entries(number)) {
      list_ += val;
    }

    return list_;
  };

  const lastPrice = () => {
    let price = 0;
    for (let i = 0; i < data.length; i++) {
      price += data[i].price * number[data[i].id];
    }
    return price;
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnclickOpen = () => {
    setOpen(true);
  };
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div className={`page`}>
          {data != undefined ? (
            <Container maxWidth="xl">
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ mb: 4 }}
              >
                <Typography variant="h3">Cart</Typography>
                <ShoppingCartOutlined fontSize="large" color="info" />
              </Stack>
              <Grid container spacing={4} justifyContent="space-between">
                <Grid item lg={9} md={8} xs={12}>
                  <Paper sx={{ p: 2, overflow: "scroll" }}>
                    <Table sx={{}}>
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">
                            <Typography variant="h6" component="span">
                              สินค้า
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography variant="h6" component="span">
                              ราคา
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography variant="h6" component="span">
                              จำนวน
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography variant="h6" component="span">
                              ราคารวม
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="h6" component="span">
                              Action
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {number &&
                          data.map((val, index) => (
                            <TableRow key={index}>
                              <TableCell align="center">
                                <ListItem
                                  disablePadding
                                  alignItems="flex-start"
                                >
                                  <ListItemAvatar>
                                    <Avatar
                                      sx={{
                                        width: 64,
                                        height: 64,
                                        marginRight: "10px",
                                      }}
                                      variant="rounded"
                                    >
                                      <img
                                        src={`${process.env.REACT_APP_URL}image/${val.image[0]}`}
                                        width="auto"
                                        height="100%"
                                      />
                                    </Avatar>
                                  </ListItemAvatar>
                                  <ListItemText
                                    sx={{ marginTop: "5px" }}
                                    primary={
                                      <Fragment>
                                        <Typography
                                          variant="h6"
                                          component="span"
                                        >
                                          {val.name}
                                        </Typography>
                                      </Fragment>
                                    }
                                    secondary={
                                      <Fragment>
                                        <Typography
                                          variant="subtitle"
                                          component="span"
                                          color="text.secondary"
                                        >
                                          {val.company ||
                                            (val.location &&
                                              val.location.province) ||
                                            val.brand ||
                                            "Package"}
                                        </Typography>
                                      </Fragment>
                                    }
                                  />
                                </ListItem>
                              </TableCell>
                              <TableCell align="center">
                                <Box
                                  display="flex"
                                  alignItems="center"
                                  justifyContent="center"
                                >
                                  <Icon
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      marginRight: "5px",
                                    }}
                                    fontSize="small"
                                  >
                                    <img
                                      src={`${process.env.PUBLIC_URL}/assets/icons/Coin.svg`}
                                      width="100%"
                                    />
                                  </Icon>
                                  <Typography
                                    variant="subtitle1"
                                    component="span"
                                  >
                                    {val.price}{" "}
                                  </Typography>
                                </Box>
                              </TableCell>
                              <TableCell align="center">
                                <Stack
                                  direction="row"
                                  spacing={1}
                                  sx={{
                                    borderRadius: "8px",
                                    border:
                                      "1px solid rgba(145, 158, 171, 0.32)",
                                    lineHeight: 0,
                                    display: "flex",
                                    alignItems: "center",
                                    padding: "4px 6px",
                                  }}
                                >
                                  <IconButton
                                    size="small"
                                    disabled={
                                      number[val.id] === 1 ? true : false
                                    }
                                    onClick={() => removeNumber(val.id)}
                                  >
                                    <Remove sx={{ fontSize: "16px" }} />
                                  </IconButton>
                                  <Typography
                                    variant="body1"
                                    color="text.secondary"
                                    sx={{ fontWeight: 500 }}
                                  >
                                    {number && number[val.id]}
                                  </Typography>
                                  <IconButton
                                    size="small"
                                    onClick={() => addNumber(val.id)}
                                  >
                                    <Add sx={{ fontSize: "16px" }} />
                                  </IconButton>
                                </Stack>
                              </TableCell>
                              <TableCell align="center">
                                <Box
                                  display="flex"
                                  alignItems="center"
                                  justifyContent="center"
                                >
                                  <Icon
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      marginRight: "5px",
                                    }}
                                    fontSize="small"
                                  >
                                    <img
                                      src={`${process.env.PUBLIC_URL}/assets/icons/Coin.svg`}
                                      width="100%"
                                    />
                                  </Icon>
                                  <Typography
                                    variant="subtitle1"
                                    component="span"
                                  >
                                    {val.price * (number ? number[val.id] : 1)}{" "}
                                  </Typography>
                                </Box>
                              </TableCell>
                              <TableCell align="right">
                                <IconButton onClick={() => removeData(val.id)}>
                                  <Delete fontSize="small" color="error" />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </Paper>
                </Grid>
                <Grid item lg={3} md={4} xs={12}>
                  <Sticky enabled={true} top={70}>
                    <Paper sx={{ p: 2 }}>
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: "600", mb: 2 }}
                      >
                        สรุปรายการสั่งซื้อ
                      </Typography>
                      <Stack spacing={2} sx={{ mb: 4 }}>
                        <Stack direction="row" justifyContent="space-between">
                          <Typography
                            variant="h6"
                            color="text.secondary"
                            component="span"
                          >
                            ทั้งหมด ({number && totalList()})
                          </Typography>
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                          >
                            <Icon
                              sx={{
                                display: "flex",
                                alignItems: "center",
                              }}
                              fontSize="small"
                            >
                              <img
                                src={`${process.env.PUBLIC_URL}/assets/icons/Coin.svg`}
                                width="100%"
                              />
                            </Icon>
                            <Typography variant="h6" component="span">
                              {data && number && lastPrice()}
                            </Typography>
                          </Stack>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                          <Typography
                            variant="h6"
                            color="text.secondary"
                            component="span"
                          >
                            My coin
                          </Typography>
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                          >
                            <Icon
                              sx={{
                                display: "flex",
                                alignItems: "center",
                              }}
                              fontSize="small"
                            >
                              <img
                                src={`${process.env.PUBLIC_URL}/assets/icons/Coin.svg`}
                                width="100%"
                              />
                            </Icon>
                            <Typography variant="h6" component="span">
                              {userProfile && userProfile.coin}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Stack>
                      {/* <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" component="span">
                                ทั้งหมด ({number && totalList()})
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="flex-end"
                              >
                                <Icon
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    marginRight: "5px",
                                  }}
                                  fontSize="small"
                                >
                                  <img
                                    src={`${process.env.PUBLIC_URL}/assets/icons/Coin.svg`}
                                    width="100%"
                                  />
                                </Icon>
                                <Typography
                                  variant="h6"
                                  sx={{ color: amber[700] }}
                                  component="span"
                                >
                                  {data && number && lastPrice()}
                                </Typography>
                              </Box>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table> */}

                      <Button
                        // fullWidth
                        variant="contained"
                        color="success"
                        onClick={handleOnclickOpen}
                        startIcon={<CheckCircle />}
                      >
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

          {userProfile && (
            <Dialog open={open} onClose={handleClose}>
              <Card sx={{ minWidth: "480px" }}>
                <CardContent>
                  <Typography
                    variant="h5"
                    compoennt="div"
                    sx={{ fontWeight: "600" }}
                  >
                    Order confirmation
                  </Typography>
                  <List>
                    <ListItem
                      secondaryAction={
                        <Typography variant="subtitle1" component="span">
                          {number && totalList()} รายการ
                        </Typography>
                      }
                    >
                      <ListItemText
                        primary={
                          <Typography varaint="subtitle1" component="span">
                            รายการสั่งซื้อทั้งหมด
                          </Typography>
                        }
                      />
                    </ListItem>
                    <ListItem
                      secondaryAction={
                        <Typography
                          variant="subtitle1"
                          component="span"
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          {number && lastPrice()}{" "}
                          <Icon
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              marginLeft: "10px",
                            }}
                          >
                            <img
                              width="100%"
                              src={`${process.env.PUBLIC_URL}/assets/icons/Coin.svg`}
                            />
                          </Icon>
                        </Typography>
                      }
                    >
                      <ListItemText
                        primary={
                          <Typography varaint="subtitle1" component="span">
                            ยอดการสั่งซื้อ
                          </Typography>
                        }
                      />
                    </ListItem>
                    <ListItem
                      secondaryAction={
                        <Typography
                          variant="subtitle1"
                          component="span"
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          {userProfile.coin}{" "}
                          <Icon
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              marginLeft: "10px",
                            }}
                          >
                            <img
                              width="100%"
                              src={`${process.env.PUBLIC_URL}/assets/icons/Coin.svg`}
                            />
                          </Icon>
                        </Typography>
                      }
                    >
                      <ListItemText
                        primary={
                          <Typography varaint="subtitle1" component="span">
                            จำนวน Coin ที่มี
                          </Typography>
                        }
                      />
                    </ListItem>
                    <Divider />
                    <ListItem
                      secondaryAction={
                        <Typography
                          // variant="h5"
                          component="span"
                          className={classes.highLights}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {number && userProfile.coin - lastPrice()}{" "}
                          <Icon
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              marginLeft: "10px",
                            }}
                          >
                            <img
                              width="100%"
                              src={`${process.env.PUBLIC_URL}/assets/icons/Coin.svg`}
                            />
                          </Icon>
                        </Typography>
                      }
                    >
                      <ListItemText
                        primary={
                          <Typography
                            // varaint="h5"
                            component="span"
                            className={classes.highLights}
                          >
                            จำนวน Coin คงเหลือ
                          </Typography>
                        }
                      />
                    </ListItem>
                  </List>
                </CardContent>
                <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ minWidth: "120px" }}
                    onClick={handleClose}
                  >
                    Confirm
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ minWidth: "120px" }}
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                </CardActions>
              </Card>
            </Dialog>
          )}
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default Cart;
