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
import { getAllShopCategory } from "../../../actions/shopCategory";
import { getAllItem } from "../../../actions/item";
import ProductCard from "../shared/card/ProductCard";
import { Box } from "@mui/system";
import { Search } from "@mui/icons-material";

const theme = createTheme();

const useStyles = makeStyles(() => ({
  root: {},
  filter: {
    padding: "10px",
    boxShadow: "none",
    border: "1px solid #404040",
  },
  main: {
    padding: "10px",
    boxShadow: "none",
    border: "1px solid #404040",
    minHeight: "600px",
  },
  head: {
    padding: "20px",
    boxShadow: "none",
    border: "1px solid #404040",
    display: "flex",
    alignItems: "center",
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
    dispatch(getAllShopCategory());
    dispatch(getAllItem());
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
    <div className={`page`}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Container maxWidth="xl">
            <Grid container spacing={2} justifyContent="center">
              <Grid item xl={12} sx={{ marginButtom: 20 }}>
                <Paper className={classes.head} sx={{}}>
                  <Typography variant="h4">Shopping Mall</Typography>
                  <Box sx={{ flexGrow: 1 }} />
                  {/* <Autocomplete
                    size="small"
                    sx={{ width: "200px" }}
                    options={item}
                    onChange={(e, value) => {
                      console.log("value", value);
                      console.log("e value", e.target.value);
                    }}
                    getOptionLabel={(options) => options.name}
                    renderInput={(params) => (
                      <TextField {...params} label="Search" />
                    )}
                  /> */}
                  <TextField
                    label="Search"
                    size="small"
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment>
                          <IconButton>
                            <Icon>
                              <Search />
                            </Icon>
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Paper>
              </Grid>
              {shopCategory && (
                <Grid item xl={2}>
                  <Paper className={classes.filter}>
                    <Typography variant="h6" gutterBottom>
                      Category
                    </Typography>
                    <List
                      dense
                      sx={{
                        width: "100%",
                      }}
                    >
                      {shopCategory &&
                        shopCategory.map((val, index) => (
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
              <Grid item xl={10}>
                {item && (
                  <Paper className={classes.main}>
                    <Grid container spacing={4}>
                      {item
                        .filter(
                          (item) => item.name.toLowerCase().search(search) != -1
                        )
                        .map((val, index) => (
                          <Grid item lg={3} sx={{ position: "relative" }}>
                            <Box sx={{ width: "100%" }}>
                              <ProductCard
                                path=""
                                image={`${process.env.REACT_APP_URL}image/${val.image}`}
                                head={val.highLights}
                                price={val.price}
                                name={val.name}
                                id={val.id}
                                rating={val.rating}
                                count={val.count}
                              />
                            </Box>
                          </Grid>
                        ))}
                    </Grid>
                  </Paper>
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
