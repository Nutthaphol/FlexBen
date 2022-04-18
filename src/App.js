import React, { Fragment, useEffect, useState } from "react";
import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
  styled,
} from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import { useSelector } from "react-redux";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Header, AdminMenu, ManagerMenu, UserMenu } from "./components/layouts";
import clsx from "clsx";
import Routers from "./Routers";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box } from "@mui/system";
import { IconButton, Typography, ListItem, ListItemText } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Themplates from "./components/pages/shared/theme";
import WarehouseMenu from "./components/layouts/menu/warehouse/warehouseMenu";
import ScrollToTop from "./components/pages/shared/scrollToTop/ScrollToTop";

const theme = createTheme(Themplates);

const useStyles = makeStyles((theme) => ({
  "@global": {
    "*::-webkit-scrollbar": {
      width: "4px",
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
    },
  },
}));

const drawerUseStyles = makeStyles(() => ({
  drawerOpen: {
    width: drawerWidth,
    backgroundColor: "#fff",
    zIndex: theme.zIndex.drawer,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7),
  },
  bannerOpen: {
    backgroundImage: `url(${process.env.PUBLIC_URL}/images/background_menu.jpg)`,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  toolbar: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  isActive: {
    backgroundColor: "#e0f5fd",
    color: "#0080ff",
  },
  listItemOpen: {
    width: "100%",
    padding: "4px 16px",
  },
  listItemClose: {
    width: "100%",
    textAlign: "center",
    padding: "4px 4px",
  },
}));

const drawerWidth = 240;

const DrawerContainer = ({ open, setOpen }) => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [isUser, setIsUser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const [isWarehouse, setIsWarehouse] = useState(false);

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (currentUser) {
      setIsUser(currentUser.roles.includes("ROLE_USER"));
      setIsAdmin(currentUser.roles.includes("ROLE_ADMIN"));
      setIsManager(currentUser.roles.includes("ROLE_MANAGER"));
      setIsWarehouse(currentUser.roles.includes("ROLE_WAREHOUSE"));
    }
  }, [currentUser]);

  const classes = drawerUseStyles();
  return (
    <Drawer
      variant="permanent"
      className={clsx({
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.bannerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <div
          style={{
            width: "100%",
            position: "absolute",
            textAlign: "center",
          }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/assets/LOGO SCG.png`}
            width="auto"
            height="64px"
          />
        </div>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeft />
        </IconButton>
      </div>
      <Divider />
      {isUser && <UserMenu open={open} />}
      {isManager && (
        <Fragment>
          <Divider />
          <ListItem
            disablePadding
            className={open ? classes.listItemOpen : classes.listItemClose}
          >
            <ListItemText
              secondary={
                <Typography
                  noWrap
                  variant="body2"
                  component="span"
                  color="text.secondary"
                >
                  Manager
                </Typography>
              }
            />
          </ListItem>
          <ManagerMenu open={open} />
        </Fragment>
      )}
      {isAdmin && (
        <Fragment>
          <Divider />
          <ListItem
            disablePadding
            className={open ? classes.listItemOpen : classes.listItemClose}
          >
            <ListItemText
              secondary={
                <Typography
                  noWrap
                  variant="body2"
                  component="span"
                  color="text.secondary"
                >
                  Admin
                </Typography>
              }
            />
          </ListItem>
          <AdminMenu open={open} />
        </Fragment>
      )}
      {isWarehouse && (
        <Fragment>
          <Divider />
          <ListItem
            disablePadding
            className={open ? classes.listItemOpen : classes.listItemClose}
          >
            <ListItemText
              secondary={
                <Typography
                  noWrap
                  variant="body2"
                  component="span"
                  color="text.secondary"
                >
                  Werehouse
                </Typography>
              }
            />
          </ListItem>
          <WarehouseMenu />
        </Fragment>
      )}
    </Drawer>
  );
};

function App() {
  useStyles();
  const [open, setOpen] = useState();
  const { isLoggedIn } = useSelector((state) => state.auth);

  // useEffect(() => {}, []);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  return (
    <Router>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              display: "flex",
              minHeight: "100%",
              overflow: "hidden",
            }}
          >
            {isLoggedIn && (
              // appbar
              <Header handleDrawerOpen={handleDrawerOpen} open={open} />
            )}
            {/* sidebar */}
            {isLoggedIn && <DrawerContainer open={open} setOpen={setOpen} />}

            {/* load body at top page */}
            <ScrollToTop />

            {/* body */}
            <Box
              sx={{
                flexGrow: 1,
                overflow: "hidden",
                minHeight: "100%",
                p: 0,
              }}
            >
              <Routers />
            </Box>
          </Box>
        </ThemeProvider>
      </StyledEngineProvider>
    </Router>
  );
}

export default App;
