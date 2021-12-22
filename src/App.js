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
import {
  IconButton,
  Typography,
  Icon,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { AdminPanelSettings, ChevronLeft, NoteAlt } from "@mui/icons-material";
import { indigo } from "@mui/material/colors";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Themplates from "./components/pages/shared/theme";
import WarehouseMenu from "./components/layouts/menu/warehouse/warehouseMenu";

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
    backgroundImage:
      // "url(" +
      // process.env.PUBLIC_URL +
      // "/images/background_menu.jpg" +
      // ")"
      `url(${process.env.PUBLIC_URL}/images/background_menu.jpg)`,
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
}));

const drawerWidth = 240;

const DrawerContainer = ({ open, setOpen }) => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const [isWarehouse, setIsWarehouse] = useState(false);

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (currentUser) {
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
      <UserMenu open={open} />
      {isManager && (
        <Fragment>
          <Divider />
          <ManagerMenu />
        </Fragment>
      )}
      {isAdmin && (
        <Fragment>
          <Divider />
          <ListItem>
            <ListItemIcon>
              <AdminPanelSettings color="error" />
            </ListItemIcon>
            <ListItemText primary={"admin"} />
          </ListItem>
          <AdminMenu />
        </Fragment>
      )}
      {isWarehouse && (
        <Fragment>
          <Divider />
          <ListItem>
            <ListItemIcon>
              <NoteAlt color="info" />
            </ListItemIcon>
            <ListItemText primary={"Warehouse"} />
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
          <Box style={{ display: "flex" }}>
            {isLoggedIn && (
              <Fragment>
                <Header handleDrawerOpen={handleDrawerOpen} open={open} />
                <DrawerContainer open={open} setOpen={setOpen} />
              </Fragment>
            )}
            <Routers />
          </Box>
        </ThemeProvider>
      </StyledEngineProvider>
    </Router>
  );
}

export default App;
