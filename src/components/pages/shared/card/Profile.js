import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { makeStyles, styled } from "@mui/styles";
import Themplates from "../theme";
import {
  Avatar,
  Button,
  Card,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
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
  // root: {
  //   padding: "1px",
  //   boxShadow: "rgb(3 0 71 / 16%) 0px 1px 3px",
  //   position: "relative",
  //   margin: "-50px 0 40px",
  //   minHeight: "160pxc",
  //   backgroundColor: "#121212",
  //   color: "#fff",
  //   backgroundImage:
  //     "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
  // },
  // boxProfile: {
  //   width: "180px",
  //   margin: "-80px 0px 0px",
  // },
  // profile: {
  //   // borderRadius: "8px",
  //   borderRadius: "50%",
  // },
  // headText: {
  //   fontWeight: 600,
  // },
  // subText: {
  //   margin: 0,
  //   padding: 0,
  //   lineHight: 0,
  //   color: "rgba(255, 255, 255, 0.7)",
  // },
  // iconsSpace: {
  //   margin: "0 8px 0 0",
  // },
  // textPreData: {
  //   whiteSpace: "nowrap",
  //   overflow: "hidden",
  //   textOverflow: "ellipsis",
  // },
  // frameProfile: {
  //   padding: "10px",
  //   background: "#fff",
  //   borderRadius: "50%",
  //   // borderRadius: "8px",
  //   boxShadow: "rgb(3 0 71 / 9%) 0px 1px 3px",
  //   backgroundColor: "#303030",
  // },
  // buttonOne: {
  //   boxShadow: "rgb(3 0 71 / 9%) 0px 1px 3px",
  //   "&:hover": {
  //     backgroundColor: "#60ABF1 !important",
  //     boxShadow: "rgb(3 0 71 / 20%) 0px 2px 4px",
  //   },
  // },
  // rootW: {
  //   padding: "1px",
  //   boxShadow: "rgb(3 0 71 / 16%) 0px 1px 3px",
  //   position: "relative",
  //   margin: "-50px 0 40px",
  //   minHeight: "160pxc",
  //   // backgroundColor: "#121212",
  //   // color: "#fff",
  //   backgroundImage:
  //     "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
  // },

  // subTextW: {
  //   margin: 0,
  //   padding: 0,
  //   lineHight: 0,
  //   color: "rgba(0, 0, 0, 0.7)",
  // },
  // frameProfileW: {
  //   padding: "10px",
  //   background: "#fff",
  //   borderRadius: "50%",
  //   // borderRadius: "8px",
  //   boxShadow: "rgb(3 0 71 / 9%) 0px 1px 3px",
  //   backgroundColor: "#fff",
  // },
  // imageCover: {
  //   height: "180px",
  //   width: "100%",
  //   borderTopLeftRadius: "4px",
  //   borderTopRightRadius: "4px",
  // },
  card: {
    position: "relative",
    // height: "320px",
    marginBottom: "2rem",
    backgroundColor: "#121212",
    backgroundImage:
      "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
  },
  displayData: {
    width: "100%",
    position: "relative",
    zIndex: 99,
    bottom: 0,
    backgroundColor: "#121212",
    backgroundImage:
      "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
    color: "#fff",
  },
}));

const ProductImgStyle = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

const Profile = (props) => {
  const { profile, lastHealth, themes } = props;
  const classes = useStyles();
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        {profile && (
          <Card className={classes.card}>
            {/* <Box
              sx={{
                [theme.breakpoints.down("md")]: {
                  position: "relative",
                },
                [theme.breakpoints.up("md")]: {
                  position: "absolute",
                },
                display: "block",
                overflow: "hidden",
                inset: 0,
                lineHeight: 0,
              }}
            >
              <ProductImgStyle
                src={`${process.env.REACT_APP_URL}image/${profile.background}`}
              />
            </Box> */}
            <Box sx={{ minHeight: "160px" }}>
              <ProductImgStyle
                src={`${process.env.REACT_APP_URL}image/${profile.background}`}
              />
            </Box>
            <Box className={classes.displayData}>
              <Grid
                container
                sx={{
                  padding: "8px 0",
                  [theme.breakpoints.up("md")]: {
                    pr: "24px",
                  },
                }}
              >
                <Grid item xs={12} md={3}>
                  <Box
                    sx={{
                      position: "relative",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        borderRadius: "50%",
                        padding: "1px",
                        [theme.breakpoints.down("md")]: {
                          position: "relative",
                        },
                        [theme.breakpoints.up("md")]: {
                          position: "absolute",
                        },
                        bgcolor: "grey.100",
                        top: -40,
                      }}
                    >
                      <Avatar
                        sx={{
                          height: 120,
                          width: 120,
                        }}
                        src={`${process.env.REACT_APP_URL}image/profile/${profile.image}`}
                        label={profile.firstname}
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={9}>
                  {/* stack of columns outsite */}
                  <Stack spacing={1}>
                    {/* stack of first line */}
                    <Grid container justifyContent="space-between">
                      {/* stack between element typo and button */}
                      <Grid item xs={12} md={6}>
                        <Stack
                          direction="row"
                          spacing={2}
                          alignItems="flex-end"
                          sx={{
                            flexWrap: "wrap",
                            [theme.breakpoints.down("md")]: {
                              justifyContent: "center",
                            },
                            [theme.breakpoints.up("md")]: {
                              justifyContent: "flex-start",
                            },
                          }}
                        >
                          <Typography variant="h4" sx={{}}>
                            {`${profile.firstname} ${profile.lastname}`}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "grey.500" }}
                          >
                            เลขประจำตัวพนักงาน: {profile.employeeCode}
                          </Typography>
                          {/* stack between element typo and button */}
                        </Stack>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{
                          [theme.breakpoints.up("md")]: {
                            width: 1,
                            display: "flex",
                            justifyContent: "flex-end",
                          },
                          [theme.breakpoints.down("md")]: {
                            width: 1,
                            display: "flex",
                            justifyContent: "center",
                          },
                        }}
                      >
                        <Button
                          size="small"
                          variant="contained"
                          color="primary"
                          sx={{
                            [theme.breakpoints.down("md")]: {
                              m: "8px 0 ",
                              width: 1,
                            },
                          }}
                        >
                          แก้ไขข้อมูลส่วนตัว
                        </Button>
                      </Grid>
                      {/* stack of first line */}
                    </Grid>
                    <Grid container>
                      <Grid item xs={12} md={6} lg={4}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <AccountBox color="primary" />
                          <Typography variant="subtitle2" noWrap>
                            ตำแหน่งงาน: {profile.position}
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Group color="primary" />
                          <Typography variant="subtitle2" noWrap>
                            แผนก: {profile.department}
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Phone color="primary" />
                          <Typography variant="subtitle2" noWrap>
                            เบอร์ติดต่อ: {profile.mobileNumber}
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Group color="primary" />
                          <Typography variant="subtitle2" noWrap>
                            ฝ่าย: {profile.department}
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <HomeWork color="primary" />
                          <Typography variant="subtitle2" noWrap>
                            บริษัท: {profile.company}
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <HistoryToggleOff color="primary" />
                          <Typography variant="subtitle2" noWrap>
                            ผลตรวจล่าสุด:
                            {lastHealth
                              ? dayjs(lastHealth.dateTest).format(
                                  "DD / MMMM / YYYY"
                                )
                              : "-"}
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                    {/* stack of columns outsite */}
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Card>
        )}
        {/* {profile && (
          <Fragment>
            <Paper className={themes == "light" ? classes.rootW : classes.root}>
              <Box
                className={classes.imageCover}
                style={{
                  backgroundImage: `url(${process.env.REACT_APP_URL}image/${profile.background})`,
                }}
              />
              <Box sx={{ padding: "1.25rem" }}>
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
                        <Button
                          className={classes.buttonOne}
                          variant="contained"
                        >
                          แก้ไขข้อมูลส่วนตัว
                        </Button>
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="subtitle2"
                          component="div"
                          gutterBottom
                          className={
                            themes == "light"
                              ? classes.subTextW
                              : classes.subText
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
                          <AccountBox
                            color="info"
                            className={classes.iconsSpace}
                          />
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
                          <HomeWork
                            color="info"
                            className={classes.iconsSpace}
                          />
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
              </Box>
            </Paper>
          </Fragment>
        )} */}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default Profile;
