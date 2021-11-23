import React, { useState, useEffect } from "react";

import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import Slider from "react-slick";
import SlideArrow from "../slideArrow";

import {
  ArrowLeft,
  ArrowRight,
  AssignmentTurnedIn,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Lightbulb,
  LightbulbTwoTone,
} from "@mui/icons-material";

import { makeStyles } from "@mui/styles";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Grid,
  Icon,
  Link,
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Box, display } from "@mui/system";
import { Close, Done, DoneAll, Star } from "@mui/icons-material";
import { amber, green, red } from "@mui/material/colors";
import insuranceService from "../../../../services/insurance.service";

const theme = createTheme();

const useStyles = makeStyles(() => ({
  root: {
    padding: "1rem",
    boxShadow: "none",
    border: "1px solid #404040",
  },
  cardMedia: {
    // position: "flex",
    width: "100%",
    height: "auto",
    maxHeight: "300px",
    backgroundColor: "white",
    objectFit: "cover",
    borderStyle: "solid",
    borderWidth: "1px 1px",
    marginTop: "1.5rem",
  },
  icons: {
    padding: "10px",
    fontSize: "4rem",
    //     border: "2px solid transparent",
    //     background: "linear-gradient(orange, violet)",
    //     borderImage:"linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
    borderRadius: "50%",
  },
}));
const PackageData = (props) => {
  const { detail, review } = props;
  const classes = useStyles();
  const [insurance, setInsurance] = useState();

  useEffect(async () => {
    const res = await insuranceService.getDetailInsurance(
      detail.property[0].isrId
    );
    setInsurance(res.data);
  }, []);

  const makeBold = (item, keyword) => {
    var re = new RegExp(keyword, "g");
    return item.replace(re, "<i>" + keyword + "</i>");
  };
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Card className={classes.root}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              component={"span"}
              variant={"h4"}
              sx={{ fontWeight: "700" }}
              gutterBottom
            >
              PACKAGE {detail.name.toUpperCase()} !
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
            image={`${process.env.REACT_APP_URL}image/${detail.image}`}
          />
          <Box
            sx={{ marginTop: "20px", marginBottom: "20px", width: "100%" }}
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
          <Typography component={"span"} variant="h5" sx={{ fontWeight: 600 }}>
            รายละเอียด
          </Typography>
          <List
          // sx={{ width: "50%" }}
          >
            {detail.property.map((val, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <Icon fontSize="large">
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/icons/${val.icon}`}
                      width="100%"
                    />
                  </Icon>
                }
              >
                <ListItemIcon>
                  <AssignmentTurnedIn color="success" />
                </ListItemIcon>
                <ListItemText
                  primary={val.name}
                  secondary={val.coinValue ? val.coinValue + " Coin" : val.type}
                />
              </ListItem>
            ))}
          </List>
          <Divider />
          {detail.property.map((val, index) => (
            <Box key={index}>
              <Typography
                component={"span"}
                variant="subtitle1"
                sx={{
                  marginTop: "20px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <LightbulbTwoTone
                  fontSize="small"
                  sx={{
                    color: amber[500],
                  }}
                />
                <Box sx={{ flexGrow: 0.01 }} />
                {val.type}
              </Typography>
              {(val.type.toLowerCase() == "insurance") &
              (insurance != undefined) ? (
                <Box sx={{ display: "flex" }}>
                  <Typography component={"span"} variant="subtitle1">
                    <span style={{ marginLeft: "2.5rem" }} />
                    <span style={{ fontWeight: "600" }}>
                      {insurance.name}
                    </span>{" "}
                    {insurance.description}
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ display: "flex" }}>
                  <Typography component={"span"} variant="subtitle1">
                    <span style={{ marginLeft: "2.5rem" }} />
                    <span style={{ fontWeight: "600" }}>{val.name}</span>{" "}
                    {val.description}
                  </Typography>
                </Box>
              )}
              <Divider sx={{ marginTop: "20px" }} />
            </Box>
          ))}
          <br />
        </Card>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default PackageData;
