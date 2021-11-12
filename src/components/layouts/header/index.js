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
import SvgIcon from "@mui/material/SvgIcon";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../../actions/auth";
import { Button, Divider, Grid } from "@mui/material";
import { amber, indigo, red } from "@mui/material/colors";
import {
  AccountBalanceWallet,
  AttachMoney,
  HealthAndSafety,
  MonetizationOn,
} from "@mui/icons-material";

const theme = createTheme();

const HeartIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <path d="/public/assets/icons/cardiogram.png" />
    </SvgIcon>
  );
};

// const heart = (props) => {
//   return (
//     <SvgIcon {...props}>
//       <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
//     </SvgIcon>
//   );
// };

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
      id={menuId}
      // keepMounted
      sx={{
        "& .MuiPaper-root": {
          minWidth: 180,
        },
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem component={Link} to="/coinDashboard">
        Wallet
      </MenuItem>
      <MenuItem component={Link} to="/coinDashboard">
        History
      </MenuItem>
      <Divider sx={{ my: 0.5 }} />
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
                to="/home"
                component={NavLink}
                sx={{
                  display: { xs: "none", sm: "flex" },
                  fontSize: "1.75rem",
                  fontWeight: 900,
                  color: "white",
                  textShadow: "2px 4px 3px rgba(0,0,0,0.3)",
                }}
              >
                Flexible benefit
              </Button>
              <Box sx={{ flexGrow: 1 }} />
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
                  <Avatar
                    alt={currentUser.username}
                    src={`${process.env.REACT_APP_URL}image/profile/${currentUser.image}`}
                  />
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
