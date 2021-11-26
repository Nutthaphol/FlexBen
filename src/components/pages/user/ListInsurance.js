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
import { getAllInsurance } from "../../../actions/insurance";
import ProductCard from "../shared/card/ProductCard";

const theme = createTheme();

const useStyles = makeStyles(() => ({
  root: { padding: "10px", boxShadow: "none", border: "1px solid #D0D3D4" },
}));

const ListInsurance = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [search, setSearch] = useState(null);
  const [inputAC, setInputAC] = useState("");
  const { result: allInsurance } = useSelector((state) => state.insurance);

  useEffect(() => {
    dispatch(getAllInsurance());
  }, []);

  const labelAutocomp = () => {
    let listLabel = [];
    if (allInsurance) {
      for (let i = 0; i < allInsurance.length; i++) {
        const label = allInsurance[i].name;
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
              <Typography
                variant="h4"
                sx={{ marginBottom: "20px", flexGrow: 1 }}
              >
                All Insurance
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
                {allInsurance &&
                  allInsurance
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
                        xl={2}
                        lg={3}
                        md={4}
                        sm={6}
                        xs={12}
                      >
                        <ProductCard
                          path="detailInsurance"
                          image={`${process.env.REACT_APP_URL}image/insurance/${val.image}`}
                          head={val.highLights}
                          price={val.price}
                          name={val.name}
                          id={val.id}
                          rating={val.rating}
                          count={val.count}
                          type={val.type}
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

export default ListInsurance;
