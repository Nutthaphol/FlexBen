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
  List,
  ListItem,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllPackage } from "../../../../actions/package";
import { Box } from "@mui/system";
import { getAllInsurance } from "../../../../actions/insurance";
import ProductCard from "../../shared/card/ProductCard";
import Themplates from "../../shared/theme";
import { getAllInsuranceCategory } from "../../../../actions/insuranceCategory";

const theme = createTheme(Themplates);

const useStyles = makeStyles(() => ({
  root: {
    padding: "1.25rem",
    boxShadow: "rgb(3 0 71 / 9%) 0px 1px 3px",
  },
  filter: {
    padding: "1.25rem",
    boxShadow: "rgb(3 0 71 / 9%) 0px 1px 3px",
  },
  main: {
    padding: "10px",
    boxShadow: "0 0 1px 1px D0D3D4",
    border: "1px solid #D0D3D4",
    minHeight: "600px",
  },
  head: {
    padding: "1.25rem",
    boxShadow: "rgb(3 0 71 / 9%) 0px 1px 3px",
    display: "flex",
    justifyContent: "space-between",
  },
  sectionText: {
    fontWeight: 600,
  },
  boxMap: {},
}));

const ListInsurance = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [search, setSearch] = useState(null);
  const [inputAC, setInputAC] = useState("");
  const { result: allInsurance } = useSelector((state) => state.insurance);
  const { result: insuranceCategory } = useSelector(
    (state) => state.insuranceCategory
  );
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    dispatch(getAllInsurance());
    dispatch(getAllInsuranceCategory());
  }, []);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

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
            <Grid container spacing={2} justifyContent="center">
              <Grid item xl={12} lg={12} sx={{ marginButtom: 20 }}>
                <Paper className={classes.head}>
                  <Typography variant="h4" className={classes.sectionText}>
                    Insurance Shop
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
              </Grid>
              {insuranceCategory && (
                <Grid item xl={2} lg={3}>
                  <Paper className={classes.filter}>
                    <Typography variant="h6" component="span" gutterBottom>
                      Category
                    </Typography>
                    <List
                      dense
                      sx={{
                        width: "100%",
                      }}
                    >
                      {insuranceCategory &&
                        insuranceCategory.map((val, index) => (
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
                </Grid>
              )}
              <Grid item xl={10} lg={9}>
                <Grid container spacing={3}>
                  {allInsurance &&
                    allInsurance
                      .filter((item) => {
                        if (search != null) {
                          console.log("search ", search.label);
                          const word = search.label
                            .replace("Package ", "")
                            .toLocaleLowerCase();
                          return (
                            item.name.toLocaleLowerCase().search(word) != -1
                          );
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
                          <Box className={classes.boxMap}>
                            <ProductCard
                              path="detailInsurance"
                              image={`${process.env.REACT_APP_URL}image/${val.image[0]}`}
                              secondaryText={val.company}
                              price={val.price}
                              primaryText={val.name}
                              id={val.id}
                              count={val.count}
                              type={val.type}
                            />
                          </Box>
                        </Grid>
                      ))}
                </Grid>
              </Grid>
            </Grid>
            <br />
            <br />
          </Container>
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
};

export default ListInsurance;
