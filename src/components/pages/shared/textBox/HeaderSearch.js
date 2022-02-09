import React, { Fragment, useEffect, useState } from "react";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Themplates from "../theme";
import { Box } from "@mui/system";
import { Search } from "@mui/icons-material";
import {
  Grid,
  Icon,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const theme = createTheme(Themplates);

const useStyles = makeStyles(() => ({
  headTitle: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "48px",
  },
  sectionText: {
    color: "DarkSlateGray",
    fontWeight: 600,
  },
}));

const HeaderSearch = ({
  setSearch,
  normalText,
  hightlightText,
  insertComponent,
}) => {
  const classes = useStyles();
  return (
    <Grid
      container
      spacing={2}
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item xs={12} sm={6}>
        <Typography variant="h3">
          {normalText}{" "}
          <Box component={"span"} sx={{ color: "info.main" }}>
            {" "}
            {hightlightText}{" "}
          </Box>{" "}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={4} md={3}>
        <TextField
          label="Search"
          size="small"
          fullWidth
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          sx={{ marginRight: insertComponent ? "24px" : "0" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Icon>
                  <Search />
                </Icon>
              </InputAdornment>
            ),
            sx: {
              backgroundColor: "#fff",
              // border: "1px solid rgba(65, 171, 255, 0.6)",
              "& .MuiOutlinedInput-notchedOutline": {
                // borderColor: "rgba(65, 171, 255, 0.6)",
                border: "none",
                boxShadow: "rgb(65 171 255 / 16%) 0px 0px 0px 1px",
              },
            },
          }}
        />
      </Grid>
      {insertComponent && (
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="flex-end">
            {insertComponent}
          </Stack>
        </Grid>
      )}
    </Grid>
    //  <Box className={classes.headTitle}>
    //   <Typography variant="h4" className={classes.sectionText}>
    //     {normalText}{" "}
    //     <Box component={"span"} sx={{ color: "info.main" }}>
    //       {" "}
    //       {hightlightText}{" "}
    //     </Box>
    //   </Typography>
    //   <Box sx={{ flexGrow: 1 }} />
    //   <Box sx={{ display: "flex" }}>
    //     <TextField
    //       label="Search"
    //       size="small"
    //       onChange={(e) => {
    //         setSearch(e.target.value);
    //       }}
    //       sx={{ marginRight: insertComponent ? "24px" : "0" }}
    //       InputProps={{
    //         endAdornment: (
    //           <InputAdornment position="end">
    //             <Icon>
    //               <Search />
    //             </Icon>
    //           </InputAdornment>
    //         ),
    //         sx: {
    //           backgroundColor: "#fff",
    //           // border: "1px solid rgba(65, 171, 255, 0.6)",
    //           "& .MuiOutlinedInput-notchedOutline": {
    //             // borderColor: "rgba(65, 171, 255, 0.6)",
    //             border: "none",
    //             boxShadow: "rgb(65 171 255 / 16%) 0px 0px 0px 1px",
    //           },
    //         },
    //       }}
    //     />
    //     {insertComponent && insertComponent}
    //   </Box>
    // </Box>
  );
};

export default HeaderSearch;
