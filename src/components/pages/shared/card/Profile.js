import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Themplates from "../theme";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import {
  AccountBox,
  Group,
  HistoryToggleOff,
  HomeWork,
  Phone,
} from "@mui/icons-material";
import dayjs from "dayjs";

const theme = createTheme(Themplates);

const useStyles = makeStyles(() => ({
  root: {
    padding: "1.25rem",
    boxShadow: "rgb(3 0 71 / 9%) 0px 1px 3px",
    position: "relative",
    margin: "-50px 0 40px",
    minHeight: "160pxc",
    backgroundColor: "#121212",
    color: "#fff",
    backgroundImage:
      "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
  },
  boxProfile: {
    width: "180px",
    margin: "-50px 0px 0px",
  },
  profile: {
    borderRadius: "8px",
  },
  headText: {
    fontWeight: 600,
  },
  subText: {
    margin: 0,
    padding: 0,
    lineHight: 0,
    color: "rgba(255, 255, 255, 0.7)",
  },
  iconsSpace: {
    margin: "0 8px 0 0",
  },
  textPreData: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  frameProfile: {
    padding: "10px",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "rgb(3 0 71 / 9%) 0px 1px 3px",
    backgroundColor: "#303030",
  },
  buttonOne: {
    boxShadow: "rgb(3 0 71 / 9%) 0px 1px 3px",
    "&:hover": {
      boxShadow: "rgb(3 0 71 / 20%) 0px 2px 4px",
    },
  },
  rootW: {
    padding: "1.25rem",
    boxShadow: "rgb(3 0 71 / 9%) 0px 1px 3px",
    position: "relative",
    margin: "-50px 0 40px",
    minHeight: "160pxc",
    // backgroundColor: "#121212",
    // color: "#fff",
    backgroundImage:
      "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
  },

  subTextW: {
    margin: 0,
    padding: 0,
    lineHight: 0,
    color: "rgba(0, 0, 0, 0.7)",
  },
  frameProfileW: {
    padding: "10px",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "rgb(3 0 71 / 9%) 0px 1px 3px",
    backgroundColor: "#fff",
  },
}));

const Profile = (props) => {
  const { profile, lastHealth, themes } = props;
  const classes = useStyles();
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        {profile && (
          <Paper className={themes == "light" ? classes.rootW : classes.root}>
            <Grid container>
              <Grid
                item
                lg={2}
                md={3}
                // sm={6}
                // xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "0 40px",
                }}
              >
                <Box className={classes.boxProfile}>
                  <Box
                    sx={{}}
                    className={
                      themes == "light"
                        ? classes.frameProfileW
                        : classes.frameProfile
                    }
                  >
                    <img
                      src={`${process.env.REACT_APP_URL}image/profile/${profile.image}`}
                      width="100%"
                      className={classes.profile}
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item lg={9} md={8}>
                <Grid
                  container
                  alignItems="flex-end"
                  spacing={2}
                  sx={{ marginBottom: "16px" }}
                >
                  <Grid item>
                    <Typography
                      variant="h5"
                      component="div"
                      gutterBottom
                      className={classes.headText}
                      sx={{ margin: 0 }}
                    >
                      {`${profile.firstname} ${profile.lastname}`}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button className={classes.buttonOne} variant="contained">
                      แก้ไขข้อมูลส่วนตัว
                    </Button>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="subtitle2"
                      component="div"
                      gutterBottom
                      className={
                        themes == "light" ? classes.subTextW : classes.subText
                      }
                    >
                      เลขประจำตัวพนักงาน: {profile.employeeCode}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={2}
                  justifyContent="space-between"
                  sx={{ marginBottom: "14px" }}
                >
                  <Grid item xl={4} lg={3} md={3}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <AccountBox color="info" className={classes.iconsSpace} />
                      <Typography
                        variant="subtitle2"
                        className={classes.textPreData}
                      >
                        ตำแหน่งงาน: {profile.position}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xl={4} lg={3} md={3}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Group color="info" className={classes.iconsSpace} />
                      <Typography
                        variant="subtitle2"
                        className={classes.textPreData}
                      >
                        แผนก: {profile.department}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xl={4} lg={3} md={3}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Phone color="info" className={classes.iconsSpace} />
                      <Typography
                        variant="subtitle2"
                        className={classes.textPreData}
                      >
                        เบอร์ติดต่อ: {profile.mobileNumber}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Grid container spacing={2} justifyContent="space-between">
                  <Grid item xl={4} lg={3} md={3}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Group color="info" className={classes.iconsSpace} />
                      <Typography
                        variant="subtitle2"
                        className={classes.textPreData}
                      >
                        ฝ่าย: {profile.department}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xl={4} lg={3} md={3}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <HomeWork color="info" className={classes.iconsSpace} />
                      <Typography
                        variant="subtitle2"
                        className={classes.textPreData}
                      >
                        บริษัท: {profile.company}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xl={4} lg={3} md={3}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <HistoryToggleOff
                        color="info"
                        className={classes.iconsSpace}
                      />
                      <Typography
                        variant="subtitle2"
                        className={classes.textPreData}
                      >
                        ผลตรวจล่าสุด:{" "}
                        {lastHealth
                          ? dayjs(lastHealth.dateTest).format(
                              "DD / MMMM / YYYY"
                            )
                          : "-"}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        )}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default Profile;
