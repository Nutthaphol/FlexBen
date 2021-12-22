import { Container } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "./components/pages/LoginPage";
import Home from "./components/pages/Home";
import { UnauthorizedPage, NotFoundPage } from "./components/pages/error";
import DetailInsurance from "./components/pages/user/flexben/DetailInsurance";
import CoinDashboard from "./components/pages/user/flexben/CoinDashboard";
import ListPackage from "./components/pages/user/flexben/ListPackage";
import ListInsurance from "./components/pages/user/flexben/ListInsurance";
import DetailPackage from "./components/pages/user/flexben/DetailPackage";
import ShopingMall from "./components/pages/user/flexben/ShopingMall";
import DetailItem from "./components/pages/user/flexben/DetailItem";
import TravelShop from "./components/pages/user/flexben/TravelShop";
import DetailTravel from "./components/pages/user/flexben/DetailTravel";
import Cart from "./components/pages/user/flexben/Cart";
import History from "./components/pages/user/flexben/History";
import FormLifeStyle from "./components/pages/warehouse/FormLifeStyle";
import FormTravel from "./components/pages/warehouse/FormTravel";
import FormInsurance from "./components/pages/warehouse/FormInsurance";
import FormPackage from "./components/pages/admin/FormPackage";
import Dashbord from "./components/pages/user/health/Dashbord";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    padding: 0,
  },
}));

function Routers() {
  const classes = useStyles();
  const { user: currentUser } = useSelector((state) => state.auth);

  const RedirectLogin = () => (
    <Route>
      <Redirect to="/login" />
    </Route>
  );

  const AdminRoute = ({ component: Component, ...rest }) => {
    if (currentUser) {
      return (
        <Route
          {...rest}
          render={(props) =>
            currentUser.roles.includes("ROLE_ADMIN") === true ? (
              <Component {...props} />
            ) : (
              <Redirect to="/unauthorized" />
            )
          }
        />
      );
    } else {
      return <RedirectLogin />;
    }
  };

  const ManagerRoute = ({ component: Component, ...rest }) => {
    if (currentUser) {
      return (
        <Route
          {...rest}
          render={(props) =>
            currentUser.roles.includes("ROLE_MANAGER") === true ? (
              <Component {...props} />
            ) : (
              <Redirect to="/unauthorized" />
            )
          }
        />
      );
    } else {
      return <RedirectLogin />;
    }
  };

  const WarehouseRoute = ({ component: Component, ...rest }) => {
    if (currentUser) {
      return (
        <Route
          {...rest}
          render={(props) =>
            currentUser.roles.includes("ROLE_WAREHOUSE") === true ? (
              <Component {...props} />
            ) : (
              <Redirect to="/unauthorized" />
            )
          }
        />
      );
    } else {
      return <RedirectLogin />;
    }
  };

  const UserRoute = ({ component: Component, ...rest }) => {
    if (currentUser) {
      return (
        <Route
          {...rest}
          render={(props) =>
            currentUser.roles.includes("ROLE_USER") === true ? (
              <Component {...props} />
            ) : (
              <Redirect to="/unauthorized" />
            )
          }
        />
      );
    } else {
      return <RedirectLogin />;
    }
  };

  return (
    <Container className={classes.content} maxWidth={false}>
      <Switch>
        <Route
          exact
          path={["/"]}
          component={() =>
            currentUser ? <Redirect to="/home" /> : <Redirect to="/login" />
          }
        />
        <Route exact path="/login" component={Login} />
        <Route exact path="/unauthorized" component={UnauthorizedPage} />

        <UserRoute exact path="/home" component={Home} />
        <UserRoute exact path="/coinDashboard" component={CoinDashboard} />
        <UserRoute
          exact
          path="/detailInsurance/:id"
          component={DetailInsurance}
        />
        <UserRoute exact path="/detailPackage/:id" component={DetailPackage} />
        <UserRoute exact path="/allPackages" component={ListPackage} />
        <UserRoute exact path="/allInsurance" component={ListInsurance} />
        <UserRoute exact path="/shoppingMall" component={ShopingMall} />
        <UserRoute exact path="/travelShop" component={TravelShop} />
        <UserRoute exact path="/detailItem/:id" component={DetailItem} />
        <UserRoute exact path="/detailTravel/:id" component={DetailTravel} />
        <UserRoute exact path="/cart" component={Cart} />
        <UserRoute exact path="/history" component={History} />
        <UserRoute exact path="/history" component={History} />
        <UserRoute exact path="/Health/Dashboard" component={Dashbord} />

        <WarehouseRoute
          exact
          path="/warehouse/FormLifeStyle"
          component={FormLifeStyle}
        />
        <WarehouseRoute
          exact
          path="/warehouse/FormTravel"
          component={FormTravel}
        />
        <WarehouseRoute
          exact
          path="/warehouse/FormInsurance"
          component={FormInsurance}
        />
        <AdminRoute exact path="/admin/FormPackage" component={FormPackage} />
      </Switch>
    </Container>
  );
}

export default Routers;
