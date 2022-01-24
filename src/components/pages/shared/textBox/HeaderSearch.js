import React, { useEffect, useState } from "react";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Themplates from "../theme";
import { Box } from "@mui/system";
import { Search } from "@mui/icons-material";
import { Icon, InputAdornment, TextField, Typography } from "@mui/material";

const theme = createTheme(Themplates);

const useStyles = makeStyles(() => ({
  headTitle: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "48px",
  },
  sectionText: {
    fontWeight: 600,
  },
}));

const HeaderSearch = ({ setSearch, normalText, hightlightText }) => {
  const classes = useStyles();
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Box className={classes.headTitle}>
          <Typography variant="h4" className={classes.sectionText}>
            {normalText}{" "}
            <span style={{ color: "#41ABFF" }}> {hightlightText} </span>
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <TextField
            label="Search"
            size="small"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Icon>
                    <Search />
                  </Icon>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default HeaderSearch;
