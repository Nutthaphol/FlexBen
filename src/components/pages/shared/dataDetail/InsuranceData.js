import React from "react";

import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";

import { makeStyles } from "@mui/styles";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Box, display } from "@mui/system";
import { Close, Done, DoneAll, Star } from "@mui/icons-material";
import { amber, green, red } from "@mui/material/colors";

const theme = createTheme();
const useStyles = makeStyles(() => ({
  root: {
    padding: "1rem",
    boxShadow: "none",
    border: "1px solid #D0D3D4",
  },
  cardMedia: {
    // position: "flex",
    width: "100%",
    height: "auto",
    maxHeight: "30vh",
    backgroundColor: "white",
    objectFit: "cover",
    borderStyle: "solid",
    borderWidth: "1px 1px",
    marginTop: "1.5rem",
    borderColor: "#D0D3D4",
  },
}));

const InsuranceData = ({ detail }) => {
  const classes = useStyles();
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Card className={classes.root}>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant={"h4"}
                sx={{ fontWeight: "700" }}
                gutterBottom
              >
                {detail.name.toUpperCase()}
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Typography variant="h5" gutterBottom>
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
              image={`${process.env.REACT_APP_URL}image/Insurance/${detail.image}`}
            />
            <Box
              sx={{ marginTop: "20px", marginBottom: "20px", width: "100%" }}
              className={classes.divider}
            >
              <Divider sx={{ width: "100%" }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: "700" }} gutterBottom>
              {detail.highLights}
            </Typography>
            <Typography variant="subtitle1">
              {" "}
              <span style={{ paddingLeft: "2.5rem" }} />
              {detail.description}
            </Typography>
            <Typography variant="h5" gutterBottom sx={{ marginTop: "1rem" }}>
              รายละเอียด
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  {detail.protection != "No" ? (
                    <DoneAll sx={{ color: green[500] }} />
                  ) : (
                    <Close sx={{ color: red[500] }} />
                  )}
                </ListItemIcon>
                <ListItemText primary={detail.protection} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  {detail.maxCoverage != "No" ? (
                    <DoneAll sx={{ color: green[500] }} />
                  ) : (
                    <Close sx={{ color: red[500] }} />
                  )}
                </ListItemIcon>
                <ListItemText primary={detail.maxCoverage} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  {detail.medicalExpenses != "No" ? (
                    <DoneAll sx={{ color: green[500] }} />
                  ) : (
                    <Close sx={{ color: red[500] }} />
                  )}
                </ListItemIcon>
                <ListItemText primary={detail.medicalExpenses} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  {detail.reserve != "No" ? (
                    <DoneAll sx={{ color: green[500] }} />
                  ) : (
                    <Close sx={{ color: red[500] }} />
                  )}
                </ListItemIcon>
                <ListItemText primary={detail.reserve} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  {detail.taxDeductible != "No" ? (
                    <DoneAll sx={{ color: green[500] }} />
                  ) : (
                    <Close sx={{ color: red[500] }} />
                  )}
                </ListItemIcon>
                <ListItemText primary={detail.taxDeductible} />
              </ListItem>
            </List>
            {/* <Typography variant="body2" sx={{ paddingLeft: "20px" }}>
              <Grid container spacing={1} sx={{ padding: "! important" }}>
                <Grid item>
                  {detail.protection != "No" ? (
                    <DoneAll sx={{ color: green[500] }} />
                  ) : (
                    <Close sx={{ color: red[500] }} />
                  )}
                </Grid>
                <Grid item>คุ้มครอง​ : {detail.protection}</Grid>
                <Box sx={{ width: "100%" }} />
                <Grid item>
                  {detail.maxCoverage != "No" ? (
                    <DoneAll sx={{ color: green[500] }} />
                  ) : (
                    <Close sx={{ color: red[500] }} />
                  )}
                </Grid>
                <Grid item>ความคุ้มครองสูงสุด : {detail.maxCoverage}</Grid>
                <Box sx={{ width: "100%" }} />
                <Grid item>
                  {detail.medicalExpenses != "No" ? (
                    <DoneAll sx={{ color: green[500] }} />
                  ) : (
                    <Close sx={{ color: red[500] }} />
                  )}
                </Grid>
                <Grid item>ค่ารักษาพยาบาล : {detail.medicalExpenses}</Grid>
                <Box sx={{ width: "100%" }} />
                <Grid item>
                  {detail.reserve != "No" ? (
                    <DoneAll sx={{ color: green[500] }} />
                  ) : (
                    <Close sx={{ color: red[500] }} />
                  )}
                </Grid>
                <Grid item>สำรองจ่าย : {detail.reserve}</Grid>
                <Box sx={{ width: "100%" }} />
                <Grid item>
                  {detail.taxDeductible != "No" ? (
                    <DoneAll sx={{ color: green[500] }} />
                  ) : (
                    <Close sx={{ color: red[500] }} />
                  )}
                </Grid>
                <Grid item>สำรองจ่าย : {detail.taxDeductible}</Grid>
              </Grid>
            </Typography> */}
            <Typography
              variant="h5"
              gutterBottom
              sx={{ marginTop: "1rem", display: "flex" }}
            >
              เว็บไซต์
            </Typography>
            <Button
              variant="outlined"
              href={detail.site}
              target="_blank"
              size="small"
            >
              www.{detail.name.replace(/\s+/g, "_")}.com
            </Button>
          </CardContent>
        </Card>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default InsuranceData;
