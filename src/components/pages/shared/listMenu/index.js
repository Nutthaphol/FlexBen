import React, { Fragment, useState } from "react";
import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import { NavLink } from "react-router-dom";
import List from "@mui/material/List";
import Collapse from "@mui/material/Collapse";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

const theme = createTheme();

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
  },
  nestedClose: {
    "& .MuiListItemIcon-root": {
      display: "flex",
      justifyContent: "flex-start",
    },
  },
}));

const ListMenu = (props) => {
  const classes = useStyles();
  const [dataListMenu] = useState(props.dataListMenu);
  const [openCollapse, setOpenCollapse] = React.useState(-1);

  const handleClickCollapse = (index) => {
    if (openCollapse === index) {
      setOpenCollapse(-1);
    } else {
      setOpenCollapse(index);
    }
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
                    >
                      <ListItemIcon>{value.listItemIcon}</ListItemIcon>
                      <ListItemText primary={value.listItemText} />
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
                            >
                              <ListItemIcon>
                                {collapse.listItemIcon}
                              </ListItemIcon>
                              <ListItemText primary={collapse.listItemText} />
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
                    key={value.listKey}
                    activeclassname={classes.isActive}
                  >
                    <ListItemIcon>{value.listItemIcon}</ListItemIcon>
                    <ListItemText
                      primary={
                        <Box>
                          {" "}
                          <Typography
                            variant="subtitle1"
                            component="span"
                            sx={{
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              overflow: "hidden",
                            }}
                          >
                            {value.listItemText}
                          </Typography>
                        </Box>
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
