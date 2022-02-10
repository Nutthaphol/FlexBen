import React, { useState } from "react";

import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";

import { makeStyles } from "@mui/styles";
import {
  Button,
  Card,
  CardActions,
  Dialog,
  Grid,
  Icon,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
  Stack,
  Divider,
} from "@mui/material";
import { Box } from "@mui/system";
import { Add, AddShoppingCart, Close, Done, Remove } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { postCart } from "../../../../actions/cart";
import Themplates from "../theme";

const theme = createTheme(Themplates);
const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    height: "auto",
    padding: "1rem",
  },
  iconButton: {
    borderRadius: "4px",
    border: "1px solid #D0D3D4 ",
    marginLeft: "10px",
    marginRight: "10px",
  },
}));

const SalesBox = (props) => {
  const {
    // detail,
    type,
    nameOrder = "",
    discount = 0,
    transportation = 0,
    price = 0,
    id,
    currency = "coin",
  } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [open, setOpen] = useState(false);
  const { cart: cartValue } = useSelector((state) => state.cart);

  const handleOnClickOpen = () => {
    setOpen(true);
  };

  const handleCloseOpen = () => {
    setOpen(false);
  };

  const handleOnClickToCart = () => {
    for (let i = 0; i < count; i++) {
      const value = {
        type: type,
        id: id,
      };
      cartValue.push(value);
    }

    dispatch(postCart(cartValue));
    handleCloseOpen();
  };

  const add = () => {
    setCount(count + 1);
  };

  const remove = () => {
    setCount(count - 1);
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Paper className={classes.root}>
          <Stack spacing={2}>
            <Box sx={{ width: 1, textAlign: "center" }}>
              <Paper sx={{ p: 2, bgcolor: "grey.200" }} elevation={0}>
                <Typography variant="h4" sx={{}} color="primary.darker">
                  BUY NOW!
                </Typography>
              </Paper>
            </Box>
            <Stack spacing={2}>
              <Typography variant="h4">{nameOrder}</Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                {currency == "coin" ? (
                  <Icon
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: theme.typography.h2.fontSize,
                      height: theme.typography.h2.fontSize,
                    }}
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/icons/Coin.svg`}
                      width="100%"
                      height="auto"
                    />
                  </Icon>
                ) : (
                  <Typography variant="h3">{currency}</Typography>
                )}
                <Typography variant="h3">{price}</Typography>
              </Stack>
            </Stack>
            <Divider />
            <Stack
              sx={{ width: 1 }}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="h5"
                color="text.secondary"
                sx={{ fontWeight: 500 }}
              >
                จำนวน
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  borderRadius: "8px",
                  border: "1px solid rgba(145, 158, 171, 0.32)",
                  lineHeight: 0,
                  display: "flex",
                  alignItems: "center",
                  padding: "4px 6px",
                }}
              >
                <IconButton
                  size="small"
                  disabled={count === 1 ? true : false}
                  onClick={() => remove()}
                >
                  <Remove sx={{ fontSize: "16px" }} />
                </IconButton>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ fontWeight: 500 }}
                >
                  {count}
                </Typography>
                <IconButton size="small" onClick={() => add()}>
                  <Add sx={{ fontSize: "16px" }} />
                </IconButton>
              </Stack>
            </Stack>
            <Stack
              sx={{ width: "100%" }}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="h5"
                color="text.secondary"
                sx={{ fontWeight: 500 }}
              >
                ส่วนลด
              </Typography>
              <Typography variant="h5">{discount} %</Typography>
            </Stack>
            <Stack
              sx={{ width: "100%" }}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="h5"
                color="text.secondary"
                sx={{ fontWeight: 500 }}
              >
                ค่าขนส่ง
              </Typography>
              <Typography variant="h5">
                {" "}
                <Stack direction="row" alignItems="center">
                  {currency == "coin" ? (
                    <Icon
                      sx={{
                        marginRight: "5px",

                        display: "flex",
                        alignItems: "center",
                      }}
                      fontSize="small"
                    >
                      <img
                        src={`${process.env.PUBLIC_URL}/assets/icons/Coin.svg`}
                        width="100%"
                        height="auto"
                      />
                    </Icon>
                  ) : (
                    currency
                  )}
                  <Typography variant="h5">{transportation}</Typography>
                </Stack>
              </Typography>
            </Stack>
            <Stack
              sx={{ width: "100%" }}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="h5"
                color="text.secondary"
                sx={{ fontWeight: 500 }}
              >
                รวม
              </Typography>
              <Typography variant="h5">
                {" "}
                <Stack direction="row" alignItems="center">
                  {currency == "coin" ? (
                    <Icon
                      sx={{
                        marginRight: "5px",

                        display: "flex",
                        alignItems: "center",
                      }}
                      fontSize="small"
                    >
                      <img
                        src={`${process.env.PUBLIC_URL}/assets/icons/Coin.svg`}
                        width="100%"
                        height="auto"
                      />
                    </Icon>
                  ) : (
                    currency
                  )}
                  <Typography variant="h5">
                    {transportation +
                      count * (price - (price * discount) / 100)}
                  </Typography>
                </Stack>
              </Typography>
            </Stack>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
              size="large"
              onClick={handleOnClickOpen}
            >
              <Typography variant="h4" sx={{ margin: "6px 0" }}>
                Continue
              </Typography>
            </Button>
          </Stack>
        </Paper>
        <Dialog onClose={handleCloseOpen} open={open} maxWidth="xs" fullWidth>
          <DialogTitle sx={{ textAlign: "center" }}>Continue ?</DialogTitle>
          <DialogContent>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={4}
            >
              <Button
                sx={{ pt: 2, pb: 2 }}
                color="warning"
                variant="contained"
                fullWidth
                onClick={() => {
                  handleOnClickToCart();
                }}
                startIcon={<AddShoppingCart />}
              >
                Add to cart
              </Button>
              <Button
                sx={{ pt: 2, pb: 2 }}
                color="success"
                variant="contained"
                fullWidth
                onClick={() => {
                  handleOnClickToCart();
                }}
              >
                Buy now!
              </Button>
            </Stack>
          </DialogContent>
        </Dialog>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default SalesBox;
