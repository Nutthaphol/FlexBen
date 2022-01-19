import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Themplates from "../../shared/theme";
import CoverPhoto from "../../shared/card/CoverPhoto";
import {
  Box,
  Container,
  Grid,
  Paper,
  Button,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemButton,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  AvatarGroup,
  useMediaQuery,
} from "@mui/material";
import Profile from "../../shared/card/Profile";
import healthServices from "../../../../services/health.services";
import healthCheckService from "../../../../services/healthCheck.service";
import { getAllUsers, getUserProfile } from "../../../../actions/user";
import PercentCard from "../../shared/card/PercentCard";
import TreatmentCard from "../../shared/card/TreatmentCard";
import treatmentCategoryService from "../../../../services/treatmentCategory.service";
import ReactApexChart from "react-apexcharts";
import { getNotification } from "../../../../actions/nofitication";
import dayjs from "dayjs";
import { getAllInsurance } from "../../../../actions/insurance";
import ProductCard from "../../shared/card/ProductCard";
import { minWidth, width } from "@mui/system";
import { Feed, FiberManualRecord } from "@mui/icons-material";
import BowTieCard from "../../shared/card/BowTieCard";

const theme = createTheme(Themplates);

const useStyles = makeStyles(() => ({
  card: {
    padding: "1.25rem",
    boxShadow: "rgb(3 0 71 / 9%) 0px 1px 3px",
    position: "relative",
    margin: "0px 0 40px",
    backgroundColor: "#121212",
    color: "#fff",
    backgroundImage:
      "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
  },
  cardW: {
    padding: "1.25rem",
    boxShadow: "rgb(3 0 71 / 9%) 0px 1px 3px",
    position: "relative",
    margin: "0px 0 40px",
  },

  maxCard: {
    display: "flex",
    alignItems: "center",
    flexFlow: "row wrap",
  },
}));

const TreatmentHistory = (props) => {
  const classes = useStyles();
  const dispath = useDispatch();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { user: currentUser } = useSelector((state) => state.auth);
  const { result: userProfile } = useSelector((state) => state.userProfile);
  const { result: notification } = useSelector((state) => state.notification);
  const { result: allUser } = useSelector((state) => state.users);
  const { result: insurance } = useSelector((state) => state.insurance);

  const [lastHealthCheck, setLastHealCheck] = useState();
  const [countOPD, setCountOPD] = useState(0);
  const [countIPD, setCountIPD] = useState(0);
  const [healthHistory, setHealthHistory] = useState();
  const [notificationState, setNotificationState] = useState({
    open: false,
  });

  const [categories, setCategories] = useState();

  useEffect(() => {
    const setupData = async (userId) => {
      const lastHealthCheck_ = await healthCheckService.getLastHealthCheck(
        userId
      );
      setLastHealCheck(lastHealthCheck_);

      const health_ = await healthServices.getHealthProfile(userId);

      const healthHistory_ = calhealthHstory(health_);
      setHealthHistory(healthHistory_);

      const countOPD_ = calCountOPD(health_.treatment);
      setCountOPD(countOPD_);

      const countIPD_ = calCountIPD(health_.treatment);
      setCountIPD(countIPD_);

      const categories_ = await treatmentCategoryService.getTreatmentCategory();
      setCategories(categories_);
    };
    if (currentUser) {
      dispath(getUserProfile(currentUser.id));
      dispath(getNotification());
      dispath(getAllUsers());
      dispath(getAllInsurance());
      setupData(currentUser.id);
    }
  }, []);

  const calCountOPD = (data) => {
    const treatmentOPD = data.filter(
      (item) => item.rightUser == 1 && item.category == 1
    );

    return treatmentOPD.length;
  };

  const calCountIPD = (data) => {
    const treatmentIPD = data.reduce((prev, curr) => {
      curr.category == 2 &&
        curr.rightUser == 1 &&
        prev
          .map((e) => {
            return e.id;
          })
          .indexOf(curr.id) == -1 &&
        prev.push(curr);
      return prev;
    }, []);

    return treatmentIPD.length;
  };

  const calhealthHstory = (data) => {
    const healthHistory_ = data.treatment.reduce((prev, curr) => {
      prev
        .map((e) => {
          return e.id;
        })
        .indexOf(curr.id) == -1 &&
        curr.rightUser == 1 &&
        prev.push(curr);
      return prev;
    }, []);
    return healthHistory_;
  };

  const calStateDonutCard = (call) => {
    let options;
    let series;

    const baseCategory =
      healthHistory &&
      healthHistory.reduce((prev, curr) => {
        prev.indexOf(curr.category) == -1 && prev.push(curr.category);
        return prev;
      }, []);

    if (healthHistory && call == "options") {
      const listCategory = baseCategory.reduce((prev, curr) => {
        prev.push(
          categories ? categories.find((item) => item.id == curr).name : ""
        );
        return prev;
      }, []);
      options = {
        chart: {
          type: "donut",
          // foreColor: "rgba(255, 255, 255, 0.7)",
          background: "transparant",
          toolbar: { show: false },
        },
        labels: listCategory,
      };
      return options;
    }
    if (healthHistory && call == "series") {
      series = baseCategory.reduce((prev, curr) => {
        prev.push(healthHistory.filter((item) => item.category == curr).length);
        return prev;
      }, []);
      console.log("type series", typeof series);
      return series;
    }
    return "";
  };

  const handleOncCickNoti = (data) => {
    let preNoti = data;
    preNoti.open = true;

    setNotificationState(preNoti);
  };

  const handleOnCloseNoti = () => {
    setNotificationState({ open: false });
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div className={`dashboard-page-light`}>
          {userProfile ? (
            <Box>
              <CoverPhoto image={userProfile.background} />
              <Container maxWidth="xl">
                <Profile
                  profile={userProfile}
                  lastHealth={lastHealthCheck}
                  themes="light"
                />
                <Grid container spacing={2} sx={{ mb: "40px" }}>
                  <Grid item md={6} xs={12}>
                    <BowTieCard
                      themes="light"
                      headerknot="triangle"
                      headerPosition="left"
                      headerknotText="OPD"
                      imageIcon={"OPD.svg"}
                      primaryText={countOPD}
                      secondaryText="ครั้ง"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <BowTieCard
                      themes="light"
                      headerknot="triangle"
                      headerPosition="left"
                      headerknotText="IPD"
                      imageIcon={"IPD.svg"}
                      primaryText={countIPD}
                      secondaryText="ครั้ง"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mb: "40px" }}>
                  <Grid item md={3}>
                    <BowTieCard
                      themes="light"
                      headerknot="rectangle"
                      headerPosition="left"
                      headerknotText="ใช้ไป"
                      imageIcon={"cash-payment.svg"}
                      primaryText="84,248"
                      fontSmall
                      secondaryText="บาท"
                    />
                  </Grid>
                  <Grid item md={3}>
                    <BowTieCard
                      themes="light"
                      headerknot="rectangle"
                      headerPosition="left"
                      headerknotText="เบิกได้"
                      imageIcon={"save-money.svg"}
                      primaryText="150,000"
                      fontSmall
                      secondaryText="บาท"
                    />
                  </Grid>
                  <Grid item md={3}>
                    <BowTieCard
                      themes="light"
                      headerknot="rectangle"
                      headerPosition="left"
                      headerknotText="ส่วนต่าง"
                      imageIcon={"Withdraw-money.svg"}
                      primaryText="65,752"
                      fontSmall
                      secondaryText="บาท"
                    />
                  </Grid>
                  <Grid item md={3}>
                    <BowTieCard
                      themes="light"
                      headerknot="rectangle"
                      headerPosition="left"
                      headerknotText="รอดำเนินการ"
                      imageIcon={"file.svg"}
                      primaryText="2"
                      fontSmall
                      secondaryText="รายการ"
                    />
                  </Grid>
                </Grid>
                <PercentCard value={50} text={"คงเหลือ"} themes="light" />
                <Paper className={classes.cardW}>
                  <Typography variant="h6" component="div">
                    รายงานการรักษาล่าสุด
                  </Typography>
                  <Box className={classes.maxCard}>
                    {healthHistory &&
                      healthHistory.slice(0, 4).map((val, index) => (
                        <Box
                          sx={{ margin: "8px", flexGrow: 1, flexBasis: 1 }}
                          key={index}
                        >
                          <TreatmentCard
                            themes="light"
                            headerknotText={
                              categories &&
                              categories
                                .find((item) => item.id == val.category)
                                .name.toUpperCase()
                            }
                            knotColor={
                              val.category == 1
                                ? "#7da6ee"
                                : val.category == 2
                                ? "#FFD72A"
                                : "red"
                            }
                            icon={`${process.env.PUBLIC_URL}/assets/icons/Treatment-Report/${val.icon}`}
                            primaryText={val.section}
                            date={dayjs(val.date)}
                          />
                        </Box>
                      ))}
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row-reverse",
                    }}
                  >
                    <Button href={`/health/TreatmentHistory/detail`}>
                      View more
                    </Button>
                  </Box>
                </Paper>
                <Grid container spacing={2}>
                  <Grid item lg={5}>
                    <Paper className={classes.cardW} sx={{ height: "450px" }}>
                      <Typography variant="h6" component="div">
                        สถิติการรักษา
                      </Typography>
                      {healthHistory && (
                        <ReactApexChart
                          options={calStateDonutCard("options")}
                          series={calStateDonutCard("series")}
                          type="donut"
                          height="400px"
                        />
                      )}
                    </Paper>
                  </Grid>
                  <Grid item lg={7}>
                    <Paper
                      className={classes.cardW}
                      sx={{
                        height: "450px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography variant="h6" component="div">
                        รายการแจ้งเตือน
                      </Typography>
                      {notification && allUser && (
                        <List sx={{ overflow: "scroll" }}>
                          {notification.map((val, index) => (
                            <Fragment key={index}>
                              <ListItemButton
                                alignItems="flex-start"
                                onClick={() => handleOncCickNoti(val)}
                              >
                                <ListItemAvatar>
                                  <Avatar
                                    src={`${
                                      process.env.REACT_APP_URL
                                    }image/profile/${
                                      allUser.find(
                                        (item) => item.id == val.sender
                                      ).image
                                        ? allUser.find(
                                            (item) => item.id == val.sender
                                          ).image
                                        : ""
                                    }`}
                                  />
                                  {console.log(
                                    "image",
                                    allUser.find(
                                      (item) => item.id == val.sender
                                    ).image
                                  )}
                                </ListItemAvatar>
                                <ListItemText
                                  primary={
                                    <Box
                                      sx={{ display: "flex", width: "100%" }}
                                    >
                                      <Box sx={{ width: "100%" }}>
                                        <Typography variant="body2">
                                          {allUser
                                            .filter(
                                              (item) => item.id == val.sender
                                            )
                                            .slice(0, 1)
                                            .map((e) => {
                                              return `${
                                                e.firstname + " " + e.lastname
                                              }`;
                                            })}
                                        </Typography>
                                      </Box>
                                      <Box
                                        sx={{
                                          display: "flex",
                                          justifyContent: "flex-end",
                                        }}
                                      >
                                        <Typography
                                          variant="body2"
                                          color="text.secondary"
                                        >
                                          {dayjs(val.date).format("DD/MM/YYYY")}
                                        </Typography>
                                      </Box>
                                    </Box>
                                  }
                                  secondary={
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                    >
                                      {val.section}
                                    </Typography>
                                  }
                                />
                              </ListItemButton>
                              <Divider
                                sx={{
                                  backgroundColor: "rgba(255, 255, 255, 0.12)",
                                }}
                              />
                            </Fragment>
                          ))}
                        </List>
                      )}
                    </Paper>
                  </Grid>
                </Grid>
                <Paper className={classes.cardW}>
                  <Typography variant="h6" component="div" gutterBottom>
                    ประกันน่าซื้อเพิ่ม
                  </Typography>
                  <Grid container spacing={3}>
                    {insurance &&
                      insurance.slice(0, 4).map((val, index) => (
                        <Grid item key={index} lg={3} xs={12}>
                          <Box
                            sx={{
                              width: "100%",
                              "&:hover": {
                                transform: "scale(1.05)",
                                transition: "transform .2s",
                              },
                            }}
                          >
                            <ProductCard
                              path="detailInsurance"
                              image={`${process.env.REACT_APP_URL}image/${val.image[0]}`}
                              head={val.highLights}
                              price={val.price}
                              name={val.name}
                              id={val.id}
                              count={val.count}
                              type={val.type}
                            />
                          </Box>
                        </Grid>
                      ))}
                  </Grid>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button>View more</Button>
                  </Box>
                </Paper>
              </Container>
            </Box>
          ) : (
            ""
          )}
        </div>
        <Dialog
          open={notificationState.open}
          onClose={handleOnCloseNoti}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>การแจ้งเตือน</DialogTitle>
          <Divider />
          {notificationState.open && (
            <DialogContent sx={{ marginBottom: "2rem" }}>
              <Typography variant="h6" component="div">
                {notificationState.section}
              </Typography>
              <Box sx={{ margin: "0 1rem" }}>
                <Grid container spacing={3}>
                  <Grid item lg={4} xs={12}>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      gutterBottom
                    >
                      ประชาสัมพันธ์
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        // justifyContent: "flex-start",
                      }}
                    >
                      <AvatarGroup
                        total={notificationState.to.length}
                        spacing={8}
                        sx={{
                          "&.MuiAvatarGroup-root .MuiAvatar-root": {
                            width: 24,
                            height: 24,
                          },
                        }}
                      >
                        {notificationState.to.map((val, index) => (
                          <Avatar
                            src={`${process.env.REACT_APP_URL}image/profile/${
                              allUser.find((item) => item.id == val).image
                                ? allUser.find((item) => item.id == val).image
                                : ""
                            }`}
                            sx={{ width: 24, height: 24 }}
                          />
                        ))}
                      </AvatarGroup>
                    </Box>
                  </Grid>
                  <Grid item lg={4} xs={12}>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      gutterBottom
                    >
                      วันที่ตรวจ
                    </Typography>
                    <Box>
                      <Typography variant="body1">
                        {dayjs(notificationState.date).format("DD-MM-YYYY")}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item lg={4} xs={12}>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      gutterBottom
                    >
                      ประเภท
                    </Typography>
                    <Box sx={{ display: "flex" }}>
                      <FiberManualRecord
                        sx={{
                          color: notificationState.class.find(
                            (item) => item.use == true
                          ).color,
                          marginRight: "4px",
                        }}
                      />
                      <Typography variant="body2">
                        {
                          notificationState.class.find(
                            (item) => item.use == true
                          ).name
                        }
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Divider sx={{ margin: "1rem 0" }} />
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Feed
                  sx={{ color: "rgba(0, 0, 0, 0.6)", marginRight: "4px" }}
                />
                <Typography variant="h6" component="div">
                  รายละเอียด
                </Typography>
              </Box>
              <Typography variant="body2" component="div">
                <span style={{ marginRight: "2rem" }} />
                {notificationState.detail}
              </Typography>
            </DialogContent>
          )}
        </Dialog>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default TreatmentHistory;
