import React, { useEffect, useState } from "react";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import {
  Autocomplete,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import PackageCard from "../shared/card/PackageCard";
import { getAllPackage } from "../../../actions/package";
import { Box } from "@mui/system";
import Themplates from "../shared/theme";

const theme = createTheme(Themplates);

const useStyles = makeStyles(() => ({
  root: { padding: "10px", boxShadow: "none", border: "1px solid #D0D3D4" },
}));

const ListPackage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [search, setSearch] = useState(null);
  const [inputAC, setInputAC] = useState("");
  const { result: allPackages } = useSelector((state) => state.package_);

  useEffect(() => {
    dispatch(getAllPackage());
  }, []);

  const labelAutocomp = () => {
    let listLabel = [];
    if (allPackages) {
      for (let i = 0; i < allPackages.length; i++) {
        const label = allPackages[i].name;
        listLabel.push({ label: "Package " + label });
      }
    }

    return listLabel;
  };
  return (
    <div className={`page`}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Container maxWidth="none">
            <Paper className={classes.root} sx={{ display: "flex" }}>
              <Typography variant="h4" sx={{ flexGrow: 1 }}>
                All Packages
              </Typography>
              <Autocomplete
                disablePortal
                size="small"
                onChange={(event, newValue) => {
                  setSearch(newValue);
                }}
                onInputChange={(event, newInputValue) => {
                  setInputAC(newInputValue);
                }}
                id="packages-search"
                options={labelAutocomp()}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField size="small" {...params} label="Packages" />
                )}
              />
            </Paper>
            <Paper className={classes.root} sx={{ marginTop: "20px" }}>
              <Grid container spacing={2}>
                {allPackages &&
                  allPackages
                    .filter((item) => {
                      if (search != null) {
                        console.log("search ", search.label);
                        const word = search.label
                          .replace("Package ", "")
                          .toLocaleLowerCase();
                        return item.name.toLocaleLowerCase().search(word) != -1;
                      } else {
                        return true;
                      }
                    })
                    .map((val, index) => (
                      <Grid
                        item
                        key={index}
                        xl={3}
                        lg={3}
                        md={4}
                        sm={6}
                        xs={12}
                      >
                        <PackageCard
                          path="detailPackage"
                          id={val.id}
                          key={index}
                          image={`${process.env.REACT_APP_URL}image/${val.image}`}
                          name={val.name}
                          property={val.property}
                          count={val.count}
                          price={val.price}
                          class_={val.class}
                          rating={val.rating}
                        />
                      </Grid>
                    ))}
              </Grid>
            </Paper>
          </Container>
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
};

export default ListPackage;
