import { Container } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "./components/pages/LoginPage";
import Home from "./components/pages/Home";
import { UnauthorizedPage, NotFoundPage } from "./components/pages/error";
import DetailInsurance from "./components/pages/user/DetailInsurance";
import CoinDashboard from "./components/pages/user/CoinDashboard";
import ListPackage from "./components/pages/user/ListPackage";
import ListInsurance from "./components/pages/user/ListInsurance";
import DetailPackage from "./components/pages/user/DetailPackage";
import ShopingMall from "./components/pages/user/ShopingMall";

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
      </Switch>
    </Container>
  );
}

export default Routers;
