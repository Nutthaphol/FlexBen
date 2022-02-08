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
import { getAllShopCategory } from "../../../../actions/shopCategory";
import { getAllItem } from "../../../../actions/item";
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
    // boxShadow: "rgb(3 0 71 / 9%) 0px 1px 3px",
    boxShadow: "none",
    backgroundColor: "#F9F9F9",
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
    color: "#333",
  },
  headTitle: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "48px",
  },
}));

const ShopingMall = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { result: shopCategory } = useSelector((state) => state.shopCategory);
  const { result: item } = useSelector((state) => state.item);
  const [checked, setChecked] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    !shopCategory && dispatch(getAllShopCategory());
    dispatch(getAllItem());
  }, [shopCategory]);

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
    <div className={`page  white-bg`}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Container maxWidth="xl">
            <HeaderSearch
              setSearch={setSearch}
              normalText="Shopping"
              hightlightText="Mall"
            />
            <Grid container spacing={4} justifyContent="center">
              {shopCategory && (
                <Grid item xl={2} lg={3} xs={12}>
                  <StoreFilter
                    mainData={shopCategory}
                    handleToggle={handleToggle}
                    checked={checked}
                    title="Category"
                  />
                </Grid>
              )}
              <Grid item xl={10} lg={9} xs={12}>
                {item && (
                  <Grid container spacing={4}>
                    {item
                      .filter(
                        (val) => val.name.toLowerCase().search(search) != -1
                      )
                      .filter((val) => {
                        if (checked.length != 0) {
                          return checked.includes(val.category);
                        } else {
                          return true;
                        }
                      })
                      .map((val, index) => (
                        <Grid item xl={3} md={4} sm={6} xs={12} key={index}>
                          <Box
                            sx={{
                              width: "100%",
                              height: "100%",
                              position: "relative",
                            }}
                          >
                            <ProductCard
                              path="detailItem"
                              image={`${process.env.REACT_APP_URL}image/${val.image[0]}`}
                              secondaryText={val.brand}
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
                )}
              </Grid>
            </Grid>
          </Container>
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
};

export default ShopingMall;
