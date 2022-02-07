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
  card: {
    position: "relative",
    // height: "320px",
    marginBottom: "2rem",
    backgroundColor: "#121212",
    backgroundImage:
      "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
    boxShadow:
      "rgb(0 0 0 / 50%) 0px 0px 2px 0px, rgb(0 0 0 / 24%) 0px 12px 24px -4px",
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
    paddingBottom: "16px",
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
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Card>
        )}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default Profile;
