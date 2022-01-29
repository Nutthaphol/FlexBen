import React, { useEffect, useState, useRef } from "react";

import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";

import { makeStyles } from "@mui/styles";
import {
  Card,
  Container,
  Drawer,
  Grid,
  Paper,
  Typography,
  CardMedia,
  Divider,
  List,
  ListItem,
  Icon,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import SalesBox from "../../shared/salesBox";
import ReviewsCard from "../../shared/card/ReviewCard";
import { Box } from "@mui/system";
import { Star, AssignmentTurnedIn } from "@mui/icons-material";
import { amber, yellow } from "@mui/material/colors";
import packageService from "../../../../services/package.service";
import Sticky from "react-stickynode";
import Themplates from "../../shared/theme";

const theme = createTheme(Themplates);

const useStyles = makeStyles(() => ({
  paper: {
    padding: "1rem",
    // width: "100%",
  },
  header: {
    marginBottom: "1.25rem",
  },
  paragraph: {
    marginRight: "10px",
  },
  root: {
    padding: "1rem",
    boxShadow: "rgb(3 0 71 / 9%) 0px 1px 3px",
  },
  cardMedia: {
    width: "100%",
    height: "auto",
    maxHeight: "300px",
    backgroundColor: "white",
    objectFit: "cover",
    borderStyle: "solid",
    borderWidth: "1px 1px",
    marginTop: "1.5rem",
    borderColor: "#D0D3D4",
  },
  icons: {
    padding: "10px",
    fontSize: "4rem",

    borderRadius: "50%",
  },
}));

const DetailPackage = (props) => {
  const classes = useStyles();
  const [id, setId] = useState();
  const [detail, setDetail] = useState();

  useEffect(async () => {
    const fetchData = async () => {
      const id_ = props.match.params.id;
      setId(id_);
      console.log("fetch id ", id_);
      const data = await packageService.getDetailPackage(id_);
      console.log(data.data);
      setDetail(data.data);
    };

    if (props.match.params.id) {
      fetchData();
    }
  }, []);
  return (
    <div className={`page`}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          {detail && (
            <Container maxWidth="lg" sx={{ display: "flex" }}>
              <Grid container spacing={4}>
                <Grid item lg={8} md={8} xs={12}>
                  <Card className={classes.root}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography
                        component={"span"}
                        variant={"h4"}
                        sx={{ fontWeight: "700" }}
                        gutterBottom
                      >
                        {detail.name.toUpperCase()} !
                      </Typography>
                      <Box sx={{ flexGrow: 1 }} />
                      <Typography component={"span"} variant="h5" gutterBottom>
                        <Grid container spacing={1}>
                          <Grid item>
                            <Star sx={{ color: amber[500] }} />
                          </Grid>
                          <Grid item>{detail.rating}</Grid>
                        </Grid>
                      </Typography>
                    </Box>
                    <CardMedia
                      className={classes.cardMedia}
                      component="img"
                      image={`${process.env.REACT_APP_URL}image/${detail.image[0]}`}
                    />
                    <Box
                      sx={{
                        marginTop: "20px",
                        marginBottom: "20px",
                        width: "100%",
                      }}
                      className={classes.divider}
                    >
                      <Divider sx={{ width: "100%" }} />
                    </Box>
                    <Typography
                      component={"span"}
                      variant="h5"
                      sx={{ fontWeight: 600 }}
                      gutterBottom
                    >
                      {detail.highLights}
                    </Typography>
                    <Typography component={"span"} variant="subtitle1">
                      {" "}
                      <span style={{ paddingLeft: "2.5rem" }} />
                      {detail.description}
                    </Typography>
                    <br />
                    <Typography
                      component={"span"}
                      variant="h5"
                      sx={{ fontWeight: 600 }}
                    >
                      รายละเอียด
                    </Typography>
                    <List
                    // sx={{ width: "50%" }}
                    >
                      {detail.property.map((val, index) => (
                        <ListItem
                          key={index}
                          secondaryAction={
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Typography variant="h5" component="span">
                                {val.limitCoin}
                              </Typography>

                              <Icon
                                fontSize="large"
                                sx={{ marginLeft: "10px" }}
                              >
                                <img
                                  width="100%"
                                  src={`${process.env.PUBLIC_URL}/assets/Icons/Coin.svg`}
                                />
                              </Icon>
                            </Box>
                          }
                        >
                          <ListItemIcon>
                            <AssignmentTurnedIn color="success" />
                          </ListItemIcon>
                          <ListItemText
                            primary={val.name}
                            secondary={
                              val.coinValue ? val.coinValue + " Coin" : val.type
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                    <Divider />
                    <br />
                  </Card>
                  <br />
                  <ReviewsCard type={"package"} />
                </Grid>
                <Grid item lg={4} md={4} xs={12}>
                  <Sticky enabled={true} top={70}>
                    {/* <SalesBox detail={detail} type="package" /> */}
                    <SalesBox
                      nameOrder={detail.name}
                      id={detail.id}
                      price={detail.price}
                      currency="$"
                      type="package"
                    />
                  </Sticky>
                </Grid>
              </Grid>
            </Container>
          )}
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
};

export default DetailPackage;
