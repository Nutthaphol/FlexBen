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
} from "@mui/material";
import { Box } from "@mui/system";
import { Add, Close, Done, Remove } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { postCart } from "../../../../actions/cart";
import Themplates from "../theme";

const theme = createTheme(Themplates);
const useStyles = makeStyles(() => ({
  root: {
    top: "100px",
    width: "100%",
    height: "auto",
    padding: "1rem",
    boxShadow: "0 0 1px 1px D0D3D4",
    border: "1px solid #D0D3D4",
    // boxShadow:
    //   "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
  },
  iconButton: {
    borderRadius: "4px",
    border: "1px solid #D0D3D4 ",
    marginLeft: "10px",
    marginRight: "10px",
  },
}));

const SalesBox = ({ detail, type }) => {
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
        id: detail.id,
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
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              fontWeight: "600",
              background: "white",
              lineHeight: 1,
              padding: "0 20px",
              marginBottom: "1rem",
              textDecoration: "underline",
            }}
          >
            {" "}
            BUY NOW!
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Typography variant="h6">
              {type == "package" ? "Package " + detail.name : detail.name}
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Typography
              variant="h6"
              sx={{ display: "flex", alignItems: "center" }}
            >
              {type != "package" ? (
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
                "$ "
              )}
              {detail.price}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6">จำนวน</Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                borderRadius: "4px",
                border: "1px solid #D0D3D4 ",
                minWidth: "72px",
                padding: "none",
              }}
            >
              <IconButton
                sx={{
                  padding: 0,
                  borderRadius: 0,
                  borderRight: "1px solid #D0D3D4 ",
                }}
                disabled={count === 1 ? true : false}
                onClick={() => remove()}
              >
                <Remove fontSize="small" />
              </IconButton>
              <Typography
                variant="h6"
                sx={{ flexGrow: 1, textAlign: "center" }}
              >
                {count}
              </Typography>
              <IconButton
                sx={{
                  // border: "1px solid #D0D3D4",
                  padding: 0,
                  borderRadius: 0,
                  borderLeft: "1px solid #D0D3D4 ",
                }}
                size="small"
                onClick={() => add()}
              >
                <Add fontSize="small" />
              </IconButton>
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6">ส่วนลด</Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Typography
              variant="h6"
              sx={{ display: "flex", alignItems: "center" }}
            >
              {detail.discount} %
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6">ค่าขนส่ง</Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Typography
              variant="h6"
              sx={{ display: "flex", alignItems: "center" }}
            >
              {type != "package" ? (
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
                "$ "
              )}
              {detail.deliveryCost}
            </Typography>
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}
          >
            <Typography variant="h6">รวม</Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Typography
              variant="h6"
              sx={{ display: "flex", alignItems: "center" }}
            >
              {type != "package" ? (
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
                "$ "
              )}
              {detail.deliveryCost +
                count * (detail.price - (detail.price * detail.discount) / 100)}
            </Typography>
          </Box>

          <Button
            onClick={handleOnClickOpen}
            sx={{
              marginTop: "1rem",
              padding: "1rem",
              fontSize: "1.25rem",
              fontWeight: "700",
            }}
            fullWidth
            variant="contained"
            color="success"
          >
            Continue ($
            {count * detail.price} )
          </Button>
          <Dialog
            onClose={handleCloseOpen}
            open={open}
            sx={{ margin: "100px" }}
          >
            <DialogTitle sx={{ textAlign: "center" }}>Continue ?</DialogTitle>
            <DialogContent>
              <DialogActions>
                <Button
                  color="secondary"
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    width: "120px",
                  }}
                  onClick={() => {
                    handleOnClickToCart();
                  }}
                >
                  Add to cart
                </Button>
                <Button
                  color="success"
                  variant="contained"
                  sx={{ textTransform: "none", width: "120px" }}
                >
                  Buy now!
                </Button>
              </DialogActions>
            </DialogContent>
          </Dialog>
        </Paper>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default SalesBox;
