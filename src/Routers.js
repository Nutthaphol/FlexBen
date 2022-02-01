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
import FormPackage from "./components/pages/admin/flexben/FormPackage";
import Dashbord from "./components/pages/user/health/Dashbord";
import TreatmentHistory from "./components/pages/user/health/TreatmentHistory";
import HealthHistory from "./components/pages/user/health/HealthHistory";
import TreatmentHistoryDetail from "./components/pages/user/health/TreatmentHistoryDetail";
import TreatmentHistoryDataGrid from "./components/pages/user/health/TreatmentHistoryDataGrid";
import HealthTesting from "./components/pages/user/health/HealthTesting";
import HealthInformation from "./components/pages/admin/health/HealthInformation";
import TreatmentInformation from "./components/pages/admin/health/TreatmentInformation";
import HealthHistoryEmproyee from "./components/pages/admin/health/HealthHistoryEmproyee";
import FormBill from "./components/pages/user/health/FormBill";
import BillHistory from "./components/pages/user/health/BillHistory";
import BillRequestA from "./components/pages/admin/health/BillRequestA";
import BillRequestM from "./components/pages/manager/health/BillRequestM";
import BookingOutsite from "./components/pages/user/health/BookingOutsite";
import FormpackageHealthChrck from "./components/pages/warehouse/FormpackageHealthChrck";

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
          path="*/detailInsurance/:id"
          component={DetailInsurance}
        />
        <UserRoute exact path="*/detailPackage/:id" component={DetailPackage} />
        <UserRoute exact path="/allPackages" component={ListPackage} />
        <UserRoute exact path="/allInsurance" component={ListInsurance} />
        <UserRoute exact path="/shoppingMall" component={ShopingMall} />
        <UserRoute exact path="/travelShop" component={TravelShop} />
        <UserRoute exact path="*/detailItem/:id" component={DetailItem} />
        <UserRoute exact path="*/detailTravel/:id" component={DetailTravel} />
        <UserRoute exact path="/cart" component={Cart} />
        <UserRoute exact path="/history" component={History} />
        <UserRoute exact path="/history" component={History} />
        <UserRoute exact path="/health/Dashboard" component={Dashbord} />
        <UserRoute
          exact
          path="/health/TreatmentHistory/detail"
          component={TreatmentHistoryDetail}
        />
        <UserRoute
          exact
          path="/health/TreatmentHistory/DataGrid"
          component={TreatmentHistoryDataGrid}
        />
        <UserRoute
          exact
          path="/health/TreatmentHistory"
          component={TreatmentHistory}
        />
        <UserRoute
          exact
          path="/health/HealthHistory"
          component={HealthHistory}
        />
        <UserRoute
          exact
          path="*/health/HealthHistory/detail/:id"
          component={HealthTesting}
        />
        <UserRoute exact path="/health/AddBill" component={FormBill} />
        <UserRoute exact path="/health/BillHistory" component={BillHistory} />
        <UserRoute
          exact
          path="/healthcheck/BookingOutsite"
          component={BookingOutsite}
        />

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
        <WarehouseRoute
          exact
          path="/warehouse/FormPackageHealthCheck"
          component={FormpackageHealthChrck}
        />
        <WarehouseRoute
          exact
          path="/warehouse/FormInsurance"
          component={FormInsurance}
        />
        <AdminRoute exact path="/admin/FormPackage" component={FormPackage} />
        <AdminRoute
          exact
          path="/admin/health/HealthInformation"
          component={HealthInformation}
        />
        <AdminRoute
          exact
          path="/admin/health/TreatmentInformation"
          component={TreatmentInformation}
        />
        <AdminRoute
          exact
          path="/admin/health/HealthHistory"
          component={HealthHistoryEmproyee}
        />
        <AdminRoute
          exact
          path="/admin/health/BillRequest"
          component={BillRequestA}
        />

        {/* Manager */}
        <ManagerRoute
          exact
          patch="/manager/health/BillRequest"
          component={BillRequestM}
        />
      </Switch>
    </Container>
  );
}

export default Routers;
