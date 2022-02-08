import React from "react";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Themplates from "../theme";
import {
  Checkbox,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";

const theme = createTheme(Themplates);

const useStyles = makeStyles(() => ({
  filter: {
    padding: "1.25rem",
    // boxShadow: "rgb(3 0 71 / 9%) 0px 1px 3px",
    boxShadow: "none",
    // backgroundColor: "#F9F9F9",
    // backgroundColor: "#fff",
  },
}));

const StoreFilter = ({ handleToggle, checked, mainData, title }) => {
  const classes = useStyles();
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Paper className={classes.filter} sx={{ bgcolor: "grey.200" }}>
          <Typography variant="h6" component="span" gutterBottom>
            {title}
          </Typography>
          <List
            dense
            sx={{
              width: 1,
            }}
          >
            {mainData &&
              mainData.map((val, index) => (
                <ListItem
                  key={index}
                  secondaryAction={
                    <Checkbox
                      edge="end"
                      onChange={handleToggle(val.id)}
                      checked={checked.indexOf(val.id) !== -1}
                      inputProps={{ "aria-labelledby": index }}
                    />
                  }
                  disablePadding
                >
                  <ListItemText id={index} primary={`${val.name}`} />
                </ListItem>
              ))}
          </List>
        </Paper>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default StoreFilter;
