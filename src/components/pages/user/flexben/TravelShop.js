import React, { useEffect, useState } from "react";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import {
  Checkbox,
  Container,
  Grid,
  List,
  ListItem,
  Paper,
  Typography,
  ListItemText,
  TextField,
  Autocomplete,
  InputAdornment,
  IconButton,
  Icon,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllTravelCategory } from "../../../../actions/travelCategory";
import { getAllTravel } from "../../../../actions/travel";
import ProductCard from "../../shared/card/ProductCard";
import { Box } from "@mui/system";
import { Search } from "@mui/icons-material";
import Themplates from "../../shared/theme";
import HeaderSearch from "../../shared/textBox/HeaderSearch";
import StoreFilter from "../../shared/storeFilter";
const theme = createTheme(Themplates);

const useStyles = makeStyles(() => ({
  root: {},
  filter: {
    padding: "1.25rem",
    boxShadow: "rgb(3 0 71 / 9%) 0px 1px 3px",
  },
  main: {
    padding: "1.25rem",
    minHeight: "600px",
    boxShadow: "rgb(3 0 71 / 9%) 0px 1px 3px",
  },
  head: {
    padding: "1.25rem",
    display: "flex",
    boxShadow: "rgb(3 0 71 / 9%) 0px 1px 3px",
    justifyContent: "space-between",
  },
  sectionText: {
    fontWeight: 600,
  },
}));

const TravelShop = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { result: travelCategory } = useSelector(
    (state) => state.travelCategory
  );
  const { result: travel } = useSelector((state) => state.travel);
  const [checked, setChecked] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getAllTravelCategory());
    dispatch(getAllTravel());
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
  return (
    <div className={`page white-bg`}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Container maxWidth="xl">
            <HeaderSearch
              setSearch={setSearch}
              normalText="Tourist"
              hightlightText="Attraction"
            />
            <Grid container spacing={4} justifyContent="center">
              {travelCategory && (
                <Grid item xl={2} lg={3} xs={12}>
                  <StoreFilter
                    handleToggle={handleToggle}
                    checked={checked}
                    mainData={travelCategory}
                    title="Category"
                  />
                </Grid>
              )}
              <Grid item xl={10} lg={9} xs={12}>
                {travel && (
                  <Grid container spacing={4}>
                    {travel
                      .filter(
                        (item) => item.name.toLowerCase().search(search) != -1
                      )
                      .filter((val) => {
                        if (checked.length != 0) {
                          return checked.includes(val.category);
                        } else {
                          return true;
                        }
                      })

                      .map((val, index) => (
                        <Grid
                          item
                          lg={4}
                          xl={3}
                          sx={{ position: "relative" }}
                          key={index}
                        >
                          <Box
                            sx={{
                              width: "100%",
                              height: "100%",
                              position: "relative",
                            }}
                          >
                            <ProductCard
                              path="detailTravel"
                              image={`${process.env.REACT_APP_URL}image/${val.image[0]}`}
                              secondaryText={val.location.province}
                              price={val.price}
                              primaryText={val.name}
                              id={val.id}
                              // rating={val.rating}
                              count={val.count}
                              type={val.type}
                            />
                          </Box>
                        </Grid>
                      ))}
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Container>
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
};

export default TravelShop;
