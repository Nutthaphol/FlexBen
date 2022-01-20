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
import { getAllPackage } from "../../../../actions/package";
import { Box } from "@mui/system";
import Themplates from "../../shared/theme";
import ProductCard from "../../shared/card/ProductCard";

const theme = createTheme(Themplates);

const useStyles = makeStyles(() => ({
  root: {
    padding: "1.25rem",
    boxShadow: "rgb(3 0 71 / 9%) 0px 1px 3px",
  },
  sectionText: {
    fontWeight: 600,
  },
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
            <Paper
              className={classes.root}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography variant="h4" className={classes.sectionText}>
                Packages Shop
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
            <br />
            <br />
            <Grid container spacing={3}>
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
                    <Grid item key={index} xl={3} lg={3} md={4} sm={6} xs={12}>
                      <ProductCard
                        path="detailPackage"
                        id={val.id}
                        image={`${process.env.REACT_APP_URL}image/${val.image[0]}`}
                        primaryText={val.name}
                        listDetail={val.property}
                        count={val.count}
                        price={val.price}
                        rating_={val.rating}
                        currency="$"
                      />
                    </Grid>
                  ))}
            </Grid>
          </Container>
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
};

export default ListPackage;
