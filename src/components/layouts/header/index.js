import React from "react";
import clsx from "clsx";
import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import { Link, withRouter, NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import NotificationsIcon from "@mui/icons-material/Notifications";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../../actions/auth";
import { Button, Grid } from "@mui/material";
import { amber, indigo, red } from "@mui/material/colors";
import {
  AccountBalanceWallet,
  AttachMoney,
  HealthAndSafety,
  MonetizationOn,
} from "@mui/icons-material";

const theme = createTheme();

const drawerWidth = 240;
const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
  },
  appBar: {
    backgroundColor: amber["A700"],
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    backgroundColor: amber["A700"],
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
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
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  grow: {
    flexGrow: 1,
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const { user: currentUser } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const isMenuOpen = Boolean(anchorEl);
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    dispatch(logout());
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem>Notifications</MenuItem>
      <MenuItem component={Link} to="/login" onClick={logOut}>
        Logout
      </MenuItem>
    </Menu>
  );

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: props.open,
            })}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={props.handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, {
                  [classes.hide]: props.open && classes.hide,
                })}
                size="large"
              >
                <MenuIcon />
              </IconButton>
              <Button
                to="/Home"
                component={NavLink}
                style={{ fontSize: "1.5rem", fontWeight: 700, color: "white" }}
                sx={{ display: { xs: "none", sm: "flex" } }}
              >
                Flexible benefit
              </Button>

              <div className={classes.grow} />
              <Typography
                variant="h6"
                gutterBottom
                style={{
                  marginBottom: "0",
                  fontWeight: 500,
                  marginRight: "0.25rem",
                }}
              >
                100
              </Typography>
              <AttachMoney />
              <div style={{ marginRight: 20 }} />
              <Typography
                variant="h6"
                gutterBottom
                style={{
                  marginBottom: "0",
                  fontWeight: 500,
                  marginRight: "0.25rem",
                }}
              >
                100
              </Typography>
              <MonetizationOn />
              <div style={{ display: "flex", marginLeft: 20 }}>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  color="inherit"
                  onClick={(event) => setAnchorEl(event.currentTarget)}
                  size="large"
                >
                  <Badge badgeContent={17} color="secondary">
                    <Avatar
                      alt={currentUser.username}
                      src={`${process.env.REACT_APP_URL}image/profile/${currentUser.image}`}
                    />
                  </Badge>
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
          {renderMenu}
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default withRouter(Header);
