import React, { useState, useEffect } from "react";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { Container, Icon, Paper, Typography } from "@mui/material";
import { ShoppingCart, ShoppingCartOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";

const theme = createTheme();

const useStyles = makeStyles(() => ({
  root: {
    boxShadow: "none",
    border: "1px solid #D0D3D4",
    padding: "20px",
  },
}));
const Cart = () => {
  const classes = useStyles();
  const dispath = useDispatch();
  const { value: cartValue } = useSelector((state) => state.cart);

  return (
    <div className={`page`}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Container maxWidth="xl">
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
              <Typography variant="h6" component="span">
                {/* {cartValue.map((e) => {
                  return e.id + "/" + e.type;
                })} */}
              </Typography>
            </Paper>
          </Container>
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
};

export default Cart;
