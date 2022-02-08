import React from "react";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Themplates from "../../shared/theme";
import {
  Avatar,
  Divider,
  Grid,
  Icon,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import dayjs from "dayjs";
import { useState } from "react";
import { useEffect } from "react";
import treatmentCategorieservice from "../../../../services/treatmentCategory.service";
const theme = createTheme(Themplates);

const useStyles = makeStyles(() => ({
  // root: {
  //   backgroundColor: "#121212",
  //   color: "#fff",
  //   boxShadow: "rgb(3 0 71 / 16%) 0px 1px 3px",
  //   position: "relative",
  //   minHeight: "140px",
  //   minWidth: "250px",
  //   contain: "content",
  // },
  // rootW: {
  //   boxShadow: "rgb(3 0 71 / 16%) 0px 1px 3px",
  //   position: "relative",
  //   minHeight: "140px",
  //   minWidth: "250px",
  //   contain: "content",
  // },
  // mainBox: {
  //   display: "flex",
  //   alignItems: "center",
  // },
  // sectionMessage: {
  //   color: "rgba(255, 255, 255, 0.7)",
  // },
  // sectionMessageW: {
  //   color: "rgba(0, 0, 0, 0.7)",
  // },
  // backgroundCard: {
  //   backgroundColor: " #121212;",
  //   backgroundImage:
  //     "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
  //   borderRadius: "4px",
  // },
  // backgroundCardW: {
  //   backgroundColor: "rgba(0, 0, 0, 0.12)",
  //   borderRadius: "4px",
  // },
  // Arrow: {
  //   boxShadow: "rgb(3 0 100 / 80%) 0px 2px 4px",
  //   height: "120px",
  //   width: "120px",
  //   right: "-60px",
  //   top: "-60px",
  //   position: "absolute",
  //   "-webkit-transform": "rotate(45deg)",
  //   display: "flex",
  //   alignItems: "flex-end",
  //   justifyContent: "center",
  //   color: "white",
  // },
}));

const TreatmentCard = (props) => {
  const {
    themes,
    headerknotText,
    knotColor,
    icon,
    primaryText,
    secondayText,
    date,
    iconColor = false,
    bottomLife,
  } = props;
  const classes = useStyles();
  const [categories, setCategories] = useState();

  useEffect(async () => {
    if (categories == null) {
      const res = await treatmentCategorieservice.getTreatmentCategory();
      setCategories(res);
    }
  }, [categories]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Paper
          sx={{
            border: "1px solid rgba(145, 158, 171, 0.24)",
            borderRadius: "8px",
            position: "relative",
            maxWidth: "280px",
          }}
          elevation={0}
        >
          <Grid container>
            <Grid item xs={4}>
              <Paper
                elevation={0}
                sx={{
                  m: 2,
                  width: 72,
                  height: 72,

                  position: "relative",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  bgcolor: "grey.200",
                }}
              >
                {typeof icon == "object" ? (
                  <Box
                    component={icon}
                    sx={{
                      fontSize: "72px",
                      color: iconColor
                        ? theme.palette[iconColor].dark
                        : "grey.900",
                    }}
                  />
                ) : (
                  <Icon sx={{ fontSize: "52px" }}>
                    <Box component="img" src={icon} sx={{ width: 1 }} />
                  </Icon>
                )}
              </Paper>
            </Grid>
            <Grid item xs={8}>
              <Stack
                justifyContent="center"
                alignItems="center"
                sx={{ height: 1 }}
              >
                <Box textAlign="right">
                  <Typography variant="h6" component="div">
                    {primaryText}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {secondayText}
                  </Typography>
                </Box>
              </Stack>
            </Grid>
          </Grid>
          <Divider />
          <Stack direction="row" justifyContent="space-between">
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ m: 1 }}
            >
              {bottomLife && dayjs(bottomLife).format("DD/MMMM/YYYY")}
            </Typography>
            <Box sx={{ m: 1 }}>
              <Tooltip title="Good doctor">
                <Avatar
                  sx={{ width: 24, height: 24 }}
                  src={`${process.env.REACT_APP_URL}image/profile/${parseInt(
                    Math.random() * (40 - 30) + 30
                  )}.jpg`}
                />
              </Tooltip>
            </Box>
          </Stack>
        </Paper>
        {/* <Paper className={themes == "light" ? classes.rootW : classes.root}>
          <Box
            className={classes.Arrow}
            sx={{
              backgroundColor: knotColor || "red",
            }}
          >
            <Typography variant="subtitle1" component="div">
              {headerknotText ? headerknotText : ""}
            </Typography>
          </Box>
          <Box className={classes.mainBox}>
            <Box
              sx={{
                padding: "10px",
                margin: "8px",
              }}
              className={
                themes == "light"
                  ? classes.backgroundCardW
                  : classes.backgroundCard
              }
            >
              {icon && (
                <Icon
                  sx={{
                    fontSize: "4rem",
                  }}
                >
                  <img src={icon} width="100%" />
                </Icon>
              )}
            </Box>
            <Box sx={{ margin: "0 0 0 20px" }}>
              <Typography
                className={
                  themes == "light"
                    ? classes.sectionMessageW
                    : classes.sectionMessage
                }
              >
                {primaryText && primaryText}
              </Typography>
            </Box>
          </Box>
          <Box className={classes.mainBox}>
            <Box
              sx={{ padding: "4px", margin: "8px" }}
              className={
                themes == "light"
                  ? classes.backgroundCardW
                  : classes.backgroundCard
              }
            >
              <Typography variant="subtitle2">
                {date && dayjs(date).format("DD/MMMM/YYYY")}
              </Typography>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                marginRight: "15px",
              }}
            >
              <Tooltip title="Good doctor">
                <Avatar
                  sx={{ width: 24, height: 24 }}
                  src={`${process.env.REACT_APP_URL}image/profile/${parseInt(
                    Math.random() * (40 - 30) + 30
                  )}.jpg`}
                />
              </Tooltip>
            </Box>
          </Box>
        </Paper> */}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default TreatmentCard;
