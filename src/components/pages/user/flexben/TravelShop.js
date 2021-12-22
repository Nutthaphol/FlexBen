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
    <div className={`page`}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Container maxWidth="none">
            <Grid container spacing={2} justifyContent="center">
              <Grid item xl={12} lg={12} sx={{ marginButtom: 20 }}>
                <Paper className={classes.head}>
                  <Typography variant="h4" className={classes.sectionText}>
                    Tourist Attraction
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
              {travelCategory && (
                <Grid item xl={2} lg={3}>
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
                      {travelCategory &&
                        travelCategory.map((val, index) => (
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
                {travel && (
                  // <Paper className={classes.main}>
                  <Grid container spacing={3}>
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
                              head={val.location.province}
                              price={val.price}
                              name={val.name}
                              id={val.id}
                              // rating={val.rating}
                              count={val.count}
                              type={val.type}
                            />
                          </Box>
                        </Grid>
                      ))}
                  </Grid>
                  // </Paper>
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