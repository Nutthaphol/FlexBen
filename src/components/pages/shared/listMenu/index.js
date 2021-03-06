import React, { Fragment, useState } from "react";
import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import { NavLink, useLocation } from "react-router-dom";
import List from "@mui/material/List";
import Collapse from "@mui/material/Collapse";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import Themplates from "../theme";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { amber } from "@mui/material/colors";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material/";

const theme = createTheme(Themplates);

const useStyles = makeStyles((theme) => ({
  isActive: {
    color: "#3f51b5",
    fontWeight: "700 !important",
  },
  nestedOpen: {
    "& .MuiListItemIcon-root": {
      display: "flex",
      justifyContent: "center",
    },
    "&.MuiButtonBase-root.MuiListItem-root.Mui-selected": {
      backgroundColor: theme.palette.primary.lighter,
    },
  },
  nestedClose: {
    "& .MuiListItemIcon-root": {
      display: "flex",
      justifyContent: "flex-start",
    },
    "&.MuiButtonBase-root.MuiListItem-root.Mui-selected": {
      backgroundColor: theme.palette.primary.lighter,
    },
  },
  selected: {
    "&.MuiButtonBase-root.MuiListItem-root.Mui-selected": {
      backgroundColor: theme.palette.primary.lighter,
    },
  },
  selected2: {
    "&.MuiListItem-root.Mui-selected": {
      backgroundColor: theme.palette.primary.lighter,

      borderLeft: "4px solid",
      borderLeftColor: theme.palette.primary.main,
    },
  },
}));

const ListMenu = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const path = useSelector((state) => state.navigation);
  const [dataListMenu] = useState(props.dataListMenu);
  const [openCollapse, setOpenCollapse] = React.useState(-1);

  const location = useLocation();

  useEffect(() => {
    const path_ = window.location.pathname;
    if (path != path_) {
      dispatch({ type: "CLICK", path: path_ });
    }
  }, [location]);

  const handleClickCollapse = (index) => {
    if (openCollapse === index) {
      setOpenCollapse(-1);
    } else {
      setOpenCollapse(index);
    }
  };

  const handleOnClickSelect = (value) => {
    dispatch({ type: "CLICK", path: value });
    console.log("value", value);
    console.log("path", path);
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <List>
          {dataListMenu.map((value, index) => {
            return (
              <Fragment key={index}>
                {value.collapse ? (
                  <Fragment>
                    <ListItem
                      onClick={() => handleClickCollapse(index)}
                      activeclassname={classes.isActive}
                      key={value.listKey}
                      selected={
                        value.collapse.find(
                          (item) => item.listLink == path.path
                        )
                          ? true
                          : false
                      }
                      className={classes.selected2}
                    >
                      <ListItemIcon>
                        {value.listItemIcon}
                        {!props.open && (
                          <Box
                            component="span"
                            sx={{
                              position: "absolute",
                              right: -2,
                              bottom: 0,
                            }}
                          >
                            {openCollapse === index ? (
                              <ArrowDropUp fontSize="small" />
                            ) : (
                              <ArrowDropDown fontSize="small" />
                            )}
                          </Box>
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography
                            variant="subtitle1"
                            component="span"
                            sx={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {value.listItemText}
                          </Typography>
                        }
                      />
                      {openCollapse === index ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse
                      in={openCollapse === index}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List>
                        {value.collapse.map((collapse) => {
                          return (
                            <ListItem
                              component={NavLink}
                              to={collapse.listLink}
                              button
                              key={collapse.listKey}
                              className={
                                props.open
                                  ? classes.nestedOpen
                                  : classes.nestedClose
                              }
                              activeclassname={classes.isActive}
                              selected={
                                collapse.listLink == path.path ? true : false
                              }
                              onClick={() =>
                                handleOnClickSelect(collapse.listLink)
                              }
                            >
                              <ListItemIcon>
                                {collapse.listItemIcon}
                              </ListItemIcon>
                              <ListItemText
                                primary={
                                  <Typography
                                    variant="subtitle1"
                                    component="span"
                                    sx={{
                                      whiteSpace: "nowrap",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                    }}
                                  >
                                    {collapse.listItemText}
                                  </Typography>
                                }
                              />
                            </ListItem>
                          );
                        })}
                      </List>
                    </Collapse>
                  </Fragment>
                ) : (
                  <ListItem
                    component={NavLink}
                    to={value.listLink}
                    button
                    className={classes.selected}
                    key={value.listKey}
                    activeclassname={{ color: "#fff" }}
                    selected={value.listLink == path.path ? true : false}
                    onClick={() => handleOnClickSelect(value.listLink)}
                  >
                    <ListItemIcon>{value.listItemIcon}</ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          variant="subtitle1"
                          component="span"
                          sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {value.listItemText}
                        </Typography>
                      }
                    />
                  </ListItem>
                )}
              </Fragment>
            );
          })}
        </List>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default ListMenu;
