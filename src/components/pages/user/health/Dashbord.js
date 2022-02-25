import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { makeStyles, styled } from "@mui/styles";
import Themplates from "../../shared/theme";
import {
  Avatar,
  Button,
  Card,
  Container,
  Grid,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Stack,
  Tab,
  Table,
  Tabs,
  Tooltip,
  Typography,
  withStyles,
  alpha,
} from "@mui/material";
import { tooltipClasses } from "@mui/material/Tooltip";
import { Box } from "@mui/system";
import { getAllUsers, getUserProfile } from "../../../../actions/user";
import {
  Accessibility,
  Accessible,
  AccountBox,
  AirlineSeatFlat,
  Circle,
  Email,
  Facebook,
  FitnessCenter,
  Group,
  HistoryToggleOff,
  HomeWork,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  MilitaryTech,
  MonitorWeight,
  Phone,
  PointOfSale,
  Timelapse,
} from "@mui/icons-material";
import healthCheckService from "../../../../services/healthCheck.service";
import dayjs from "dayjs";
import GaugeChart from "react-gauge-chart";
import BowTieCard from "../../shared/card/BowTieCard";
import healthServices from "../../../../services/health.services";
import ReactApexChart from "react-apexcharts";
import Message from "../../shared/textBox/Message";
import TabCustomRight from "../../shared/tabRightTreament";
import rightTreatmentService from "../../../../services/rightTreatment.service";
import Profile from "../../shared/card/Profile";
import CoverPhoto from "../../shared/card/CoverPhoto";
import treatmentCategoryService from "../../../../services/treatmentCategory.service";
import SlideArrow from "../../shared/slideArrow";
import Slider from "react-slick";
import RankCard from "../../shared/card/RankCard";
import NormalCard from "../../shared/card/NormalCard";
import { grey, red, amber, deepOrange } from "@mui/material/colors";

const theme = createTheme(Themplates);

export const TrendRiskHistoryData = {
  series: [
    {
      name: "ป่วยหนัก",
      data: [45, 52, 38, 24, 33, 26, 21, 20, 60, 80, 15, 10],
    },
    {
      name: "ป่วยบ่อย",
      data: [65, 72, 58, 44, 53, 46, 41, 40, 8, 10, 35, 30],
    },
    {
      name: "ป่วย",
      data: [56, 27, 85, 44, 35, 64, 14, 4, 8, 10, 50, 3],
    },
    {
      name: "ป่วยเล็กน้อย",
      data: [45, 62, 48, 34, 43, 36, 31, 30, 18, 20, 25, 20],
    },
    {
      name: "ไม่ป่วยเลย",
      data: [35, 42, 48, 64, 43, 46, 21, 20, 28, 20, 45, 30],
    },
  ],
  categories: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
};

const useStyles = makeStyles(() => ({
  dashboardCard: {
    backgroundColor: "#121212",
    padding: "24px",
    backgroundImage:
      "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
    color: theme.palette.grey[200],
    boxShadow:
      "rgb(0 0 0 / 50%) 0px 0px 2px 0px, rgb(0 0 0 / 24%) 0px 12px 24px -4px",
  },
}));

const colorDip = [
  { color: "#63ff00", meaning: "ไม่มีนัยสำคัญ" },
  { color: "#d6ff00", meaning: "ต่ำ" },
  { color: "#ffff00", meaning: "ปานกลาง" },
  { color: "#ffc100", meaning: "สูง" },
  { color: "#ff0000", meaning: "สูงมาก" },
];

const LABEL_TOTAL = {
  show: true,
  label: "Total",
  color: theme.palette.grey[500],
  ...theme.typography.subtitle1,
};

const LABEL_VALUE = {
  offsetY: 8,
  color: theme.palette.grey[200],
  ...theme.typography.h2,
};

const defaultOption = {
  series: [],
  options: {
    chart: {
      height: 350,
      fontFamily: theme.typography.fontFamily,
      foreColor: theme.palette.grey[600],
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    colors: [
      theme.palette.primary.main,
      theme.palette.chart.yellow[0],
      theme.palette.chart.red[0],
      theme.palette.chart.green[0],
      theme.palette.chart.violet[0],
      theme.palette.chart.blue[0],
    ],
    states: {
      hover: {
        filter: {
          type: "lighten",
          value: 0.04,
        },
      },
      active: {
        filter: {
          type: "darken",
          value: 0.88,
        },
      },
    },
    markers: {
      size: 0,
      strokeColors: theme.palette.background.paper,
    },
    xaxis: {
      type: "datetime",
      tickAmount: 10,
    },
    fill: {
      opacity: 1,
      gradient: {
        type: "vertical",
        shadeIntensity: 0,
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [0, 100],
      },
    },
    dataLabels: { enabled: false },
    grid: {
      show: true,
      strokeDashArray: 3,
      borderColor: theme.palette.grey[600],
    },
    yaxis: {},
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
    },

    stroke: {
      width: 3,
      curve: "smooth",
      lineCap: "round",
    },
    tooltip: {
      theme: "dark",
    },
    legend: {
      show: true,
      fontSize: 13,
      position: "top",
      horizontalAlign: "right",
      markers: {
        radius: 12,
      },
      fontWeight: 600,
      itemMargin: { horizontal: 12 },
      labels: {
        colors: theme.palette.grey[500],
      },
    },
    // plotOptions
    plotOptions: {
      // Bar
      bar: {
        columnWidth: "50%",
        borderRadius: 4,
        rangeBarOverlap: false,
        colors: {
          backgroundBarOpacity: 0.5,
        },
      },
      // Pie + Donut
      pie: {
        donut: {
          size: "90%",
          labels: {
            show: true,
            value: LABEL_VALUE,
            total: LABEL_TOTAL,
          },
        },
      },
      // Radialbar
      radialBar: {
        track: {
          strokeWidth: "100%",
          background: theme.palette.grey[500_16],
        },
        dataLabels: {
          value: LABEL_VALUE,
          total: LABEL_TOTAL,
        },
      },
      // Radar
      radar: {
        polygons: {
          fill: { colors: ["transparent"] },
          strokeColors: theme.palette.divider,
          connectorColors: theme.palette.divider,
        },
      },
      // polarArea
      polarArea: {
        rings: {
          strokeColor: theme.palette.divider,
        },
        spokes: {
          connectorColors: theme.palette.divider,
        },
      },
    },
    responsive: [
      {
        // sm
        breakpoint: theme.breakpoints.values.sm,
        options: {
          plotOptions: { bar: { columnWidth: "40%" } },
        },
      },
      {
        // md
        breakpoint: theme.breakpoints.values.md,
        options: {
          plotOptions: { bar: { columnWidth: "32%" } },
        },
      },
    ],
  },
};

const GroupButtonTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "transparent",
  },
}));

const Dashbord = () => {
  const classes = useStyles();
  const dispath = useDispatch();

  const { user: currentUser } = useSelector((state) => state.auth);
  const { result: userProfile } = useSelector((state) => state.userProfile);
  const { result: allUsers } = useSelector((state) => state.users);
  // ---------------------------------------------------------------------- redux

  const [data, setData] = useState([]);
  // ---------------------------------------------------------------------- react state

  useEffect(() => {
    const setupData = async (userId) => {
      if (data.length == 0) {
        const lasthealthcheck = await healthCheckService.getLastHealthCheck(
          userId
        );
        const health = await healthServices.getHealthProfile(userId);
        const rightTreatment =
          await rightTreatmentService.getAllRightTreatment();
        const categories =
          await treatmentCategoryService.getTreatmentCategory();
        const data_ = {
          lasthealthcheck: lasthealthcheck,
          health: health,
          rightTreatment: rightTreatment,
          categories: categories,
        };
        console.log("data", data_);
        setData(data_);
      }
    };
    if (currentUser) {
      !userProfile && dispath(getUserProfile(currentUser.id));
      !allUsers && dispath(getAllUsers());
      setupData(currentUser.id);
    }
  }, []);

  const setChartDataWeight = () => {
    if (data.health) {
      const option = defaultOption;
      option.xaxis.categories = data.health.exercise.reduce((prev, curr) => {
        prev.push(dayjs(curr.date).format("MMM"));
        return prev;
      }, []);

      const series = [
        {
          name: "Weight",
          data: data.health.exercise.reduce((prev, curr) => {
            prev.push(curr.weight);
            return prev;
          }, []),
        },
      ];
      const value = { series, option };
      return value;
    }
  };

  const setChartDataBMI = () => {
    if (data.health) {
      const option = defaultOption;
      option.xaxis.categories = data.health.exercise.reduce((prev, curr) => {
        prev.push(dayjs(curr.date).format("MMM"));
        return prev;
      }, []);

      const series = [
        {
          name: "BMI",
          data: data.health.exercise.reduce((prev, curr) => {
            prev.push(curr.weight / Math.pow(curr.height / 100, 2).toFixed(1));
            return prev;
          }, []),
        },
      ];
      const value = { series, option };
      return value;
    }
  };

  const setChartDataTrendWeight = (key) => {
    if (data.health && key == "option") {
      let option = { ...defaultOption.options };
      option.xaxis.categories = data.health.exercise.reduce((prev, curr) => {
        prev.push(dayjs(curr.date).format("MMM"));
        return prev;
      }, []);
      option.stroke.width = 3;
      return option;
    }
    if (data.health && key == "series") {
      const series = [
        {
          name: "Weight",
          data: data.health.exercise.reduce((prev, curr) => {
            prev.push(curr.weight);
            return prev;
          }, []),
        },
      ];
      return series;
    }
  };

  const setChartDataTrendExercise = (key) => {
    if (data.health && key == "option") {
      let option = { ...defaultOption.options };
      option.xaxis.categories = data.health.exercise.reduce((prev, curr) => {
        prev.push(dayjs(curr.date).format("MMM"));
        return prev;
      }, []);

      return option;
    }
    if (data.health && key == "series") {
      const series = [
        {
          name: "Exercise-HRS",
          data: data.health.exercise.reduce((prev, curr) => {
            prev.push(curr.time);
            return prev;
          }, []),
        },
      ];
      return series;
    }
  };

  const setChartSensation = (type) => {
    if (type == "options") {
      let option = { ...defaultOption.options };
      option.chart.type = "bar";
      option.xaxis.categories = TrendRiskHistoryData.categories;
      return option;
    }
    if (type == "series") {
      const series = TrendRiskHistoryData.series;
      return series;
    }
  };
  const statusExercise = () => {
    if (data.health) {
      const hrs = data.health.exercise.at(-1).time;

      if (hrs > 30) {
        return "สม่ำเสมอ";
      } else if (hrs > 20) {
        return "บ่อยครั้ง";
      } else if (hrs > 10) {
        return "ค่อนข้างน้อย";
      } else {
        return "น้อยมาก";
      }
    }
  };

  const calhealthHstory = (value) => {
    const healthHistory_ = value.treatment.reduce((prev, curr) => {
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
    let option = { ...defaultOption.options };
    let series;

    let health_;
    if (data.health) {
      health_ = data.health.treatment.reduce((prev, curr) => {
        prev
          .map((e) => {
            return e.id;
          })
          .indexOf(curr.id) == -1 &&
          curr.rightUser == 1 &&
          prev.push(curr);
        return prev;
      }, []);
    }

    const baseCategory =
      health_ &&
      health_.reduce((prev, curr) => {
        prev.indexOf(curr.category) == -1 && prev.push(curr.category);
        return prev;
      }, []);

    if (health_ && call == "options") {
      const listCategory = baseCategory.reduce((prev, curr) => {
        prev.push(
          data.categories
            ? data.categories.find((item) => item.id == curr).name
            : ""
        );
        return prev;
      }, []);
      option.chart.type = "donut";
      option.labels = listCategory;
      console.log("listCategory", listCategory);
      option.stroke = {
        ...{ show: true, width: 0, curve: "smooth", lineCap: "round" },
      };
      option.legend = {
        ...{
          show: true,
          fontSize: 13,
          position: "top",
          horizontalAlign: "center",
          markers: {
            radius: 12,
          },
          fontWeight: 600,
          itemMargin: { horizontal: 12 },
          labels: {
            colors: theme.palette.grey[500],
          },
        },
      };

      return option;
    }
    if (health_ && call == "series") {
      series = baseCategory.reduce((prev, curr) => {
        prev.push(health_.filter((item) => item.category == curr).length);
        return prev;
      }, []);
      console.log("type series", series);
      return series;
    }
    return "";
  };

  const [setting] = useState({
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    adaptiveHeight: false,
    nextArrow: <SlideArrow themes="dark" Comp={KeyboardArrowRight} />,
    prevArrow: <SlideArrow themes="dark" Comp={KeyboardArrowLeft} />,
  });

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div className={`dashboard-page`}>
          {userProfile ? (
            <Box>
              <Container maxWidth="xl">
                <Profile
                  profile={userProfile}
                  // lastHealth={data.lastHealthCheck && data.lastHealthCheck}
                />

                <Grid container spacing={4} sx={{ mb: 4 }}>
                  <Grid item xs={12} md={6}>
                    <Paper className={classes.dashboardCard} square>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ color: "grey.200", mb: 4 }}
                      >
                        ความเสี่ยง
                      </Typography>
                      <Stack alignItems="center" spacing={2}>
                        <Stack
                          direction="row"
                          spacing={2}
                          alignItems="center"
                          justifyContent="center"
                        >
                          {colorDip &&
                            colorDip.map((val, index) => (
                              <Stack
                                direction="row"
                                spacing={1}
                                justifyContent="center"
                                alignItems="center"
                                key={index + val.color}
                              >
                                <Circle
                                  fontSize="small"
                                  sx={{ color: val.color }}
                                />
                                <Typography
                                  variant="body2"
                                  sx={{ color: "gray.200" }}
                                >
                                  {val.meaning}
                                </Typography>
                              </Stack>
                            ))}
                        </Stack>
                        <GaugeChart
                          id="gaugeChartRick"
                          nrOfLevels={5}
                          style={{
                            maxHeight: "480px",
                          }}
                          colors={[
                            "#63ff00",
                            "#d6ff00",
                            "#ffff00",
                            "#ffc100",
                            "#ff0000",
                          ]}
                          animDelay={500}
                          arcPadding={0.01}
                          cornerRadius={4}
                          percent={0.4}
                          hideText
                          needleBaseColor={"#121212"}
                          needleColor={"#007AFD"}
                        />
                      </Stack>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Paper className={classes.dashboardCard} square>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ color: "grey.200", mb: 4 }}
                      >
                        ประวัติสุขภาพ
                      </Typography>
                      <Stack sx={{ mr: 2, ml: 2 }}>
                        <Grid container>
                          <Grid item xs={12} md={4} lg={3}>
                            <Typography
                              variant="h6"
                              component="div"
                              sx={{ color: "primary.main" }}
                            >
                              My family
                            </Typography>
                          </Grid>
                          <Grid item xs={12} md={8} lg={9}>
                            <Box>
                              <List disablePadding>
                                {data.health &&
                                data.health.healthStatus.family.length != 0 ? (
                                  data.health.healthStatus.family
                                    .slice(0, 2)
                                    .map((val, index) => (
                                      <ListItem key={index + val}>
                                        <ListItemAvatar>
                                          <Circle
                                            sx={{ fontSize: "12px" }}
                                            color="secondary"
                                          />
                                        </ListItemAvatar>
                                        <ListItemText primary={val} />
                                      </ListItem>
                                    ))
                                ) : (
                                  <Typography
                                    variant="body1"
                                    sx={{ color: "grey.200" }}
                                  >
                                    ไม่มีข้อมูล
                                  </Typography>
                                )}
                              </List>
                            </Box>
                          </Grid>
                        </Grid>
                        <Grid container>
                          <Grid item xs={12} md={4} lg={3}>
                            <Typography
                              variant="h6"
                              component="div"
                              sx={{ color: "primary.main" }}
                            >
                              Myself
                            </Typography>
                          </Grid>
                          <Grid item xs={12} md={8} lg={9}>
                            <Box>
                              <br />
                              <List disablePadding>
                                {data.health &&
                                data.health.healthStatus.employee.length !=
                                  0 ? (
                                  data.health.healthStatus.employee
                                    .slice(0, 2)
                                    .map((val, index) => (
                                      <ListItem
                                        key={index + val}
                                        disablePadding
                                      >
                                        <ListItemAvatar>
                                          <Circle
                                            sx={{ fontSize: "12px" }}
                                            color="secondary"
                                          />
                                        </ListItemAvatar>
                                        <ListItemText primary={val} />
                                      </ListItem>
                                    ))
                                ) : (
                                  <ListItem>
                                    <Typography
                                      variant="body1"
                                      sx={{ color: "grey.200" }}
                                    >
                                      ไม่มีข้อมูล
                                    </Typography>
                                  </ListItem>
                                )}
                              </List>
                            </Box>
                          </Grid>
                        </Grid>
                      </Stack>
                    </Paper>
                  </Grid>
                </Grid>

                <Grid container spacing={4} sx={{ mb: 4 }}>
                  <Grid item xs={12} md={6} lg={3}>
                    <NormalCard
                      styleTheme="dark"
                      icon={MonitorWeight}
                      primaryText={
                        data.health
                          ? data.health.exercise.at(-1).weight.toFixed(1) +
                            " KM."
                          : "-"
                      }
                      secondaryText={"Weight"}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={3}>
                    <NormalCard
                      styleTheme="dark"
                      icon={Accessibility}
                      primaryText={
                        data.health
                          ? (
                              data.health.exercise.at(-1).weight /
                              Math.pow(
                                data.health.exercise.at(-1).height / 100,
                                2
                              )
                            ).toFixed(1)
                          : "-"
                      }
                      secondaryText={"BMI"}
                      colors="success"
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={3}>
                    <NormalCard
                      styleTheme="dark"
                      icon={FitnessCenter}
                      primaryText={statusExercise()}
                      secondaryText={"การออกกำลังกาย"}
                      colors="error"
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={3}>
                    <NormalCard
                      styleTheme="dark"
                      icon={Timelapse}
                      primaryText={
                        data.health && data.health.exercise.at(-1).time
                      }
                      secondaryText={"เวลาออกกำลังกาย"}
                      colors="warning"
                    />
                  </Grid>
                </Grid>

                {data.health && (
                  <Grid container sx={{ mb: 4 }} spacing={4}>
                    <Grid item xs={12} md={6}>
                      <Paper className={classes.dashboardCard}>
                        <Typography
                          variant="h6"
                          component="div"
                          sx={{ color: "grey.200", mb: 4 }}
                        >
                          Trend นำ้หนัก
                        </Typography>

                        <ReactApexChart
                          options={setChartDataTrendWeight("option")}
                          series={setChartDataTrendWeight("series")}
                          type="line"
                          height="360px"
                        />
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Paper className={classes.dashboardCard}>
                        <Typography
                          variant="h6"
                          component="div"
                          sx={{ color: "grey.200", mb: 4 }}
                        >
                          Trend การออกกำลังกาย
                        </Typography>

                        <ReactApexChart
                          options={setChartDataTrendExercise("option")}
                          series={setChartDataTrendExercise("series")}
                          type="line"
                          height="360px"
                        />
                      </Paper>
                    </Grid>
                  </Grid>
                )}

                <Paper className={classes.dashboardCard} sx={{ mb: 4 }}>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ color: "grey.200", mb: 4 }}
                  >
                    ความรู้สึกทางร่างกายของเราเอง
                  </Typography>
                  <ReactApexChart
                    options={setChartSensation("options")}
                    series={setChartSensation("series")}
                    height="360px"
                    type="bar"
                  />
                </Paper>

                {currentUser.roles.includes("ROLE_ADMIN") === true ? (
                  <Fragment>
                    <Grid container spacing={4} sx={{ mb: 4 }}>
                      <Grid item lg={3} md={6} xs={12}>
                        <NormalCard
                          styleTheme="dark"
                          icon={Group}
                          colors="primary"
                          primaryText={allUsers && allUsers.length + " คน"}
                          secondaryText="จำนวนพนักงาน"
                        />
                      </Grid>
                      <Grid item lg={3} md={6} xs={12}>
                        <NormalCard
                          styleTheme="dark"
                          icon={Accessible}
                          colors="secondary"
                          primaryText={"2.5 ล้านบาท"}
                          secondaryText="(OPD) บาท"
                        />
                      </Grid>
                      <Grid item lg={3} md={6} xs={12}>
                        <NormalCard
                          styleTheme="dark"
                          icon={AirlineSeatFlat}
                          colors="warning"
                          primaryText={"2.5 ล้านบาท"}
                          secondaryText="(IPD) บาท"
                        />
                      </Grid>
                      <Grid item lg={3} md={6} xs={12}>
                        <NormalCard
                          styleTheme="dark"
                          icon={PointOfSale}
                          colors="error"
                          primaryText={"5 ล้านบาท"}
                          secondaryText="รวมค่าใช้จ่าย"
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={4} sx={{ mb: 4 }}>
                      <Grid item xs={12} lg={5}>
                        <Paper
                          className={classes.dashboardCard}
                          sx={{ height: "450px" }}
                        >
                          <Typography
                            variant="h6"
                            component="div"
                            sx={{ color: "grey.200", mb: 4 }}
                          >
                            สถิติการรักษา
                          </Typography>
                          {data.health && (
                            <ReactApexChart
                              options={calStateDonutCard("options")}
                              series={calStateDonutCard("series")}
                              type="donut"
                              height="400px"
                            />
                          )}
                        </Paper>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Paper className={classes.dashboardCard}>
                          <Typography
                            variant="h6"
                            component="div"
                            sx={{ color: "grey.200", mb: 4 }}
                          >
                            IPD Now
                          </Typography>
                          <List sx={{ width: 1, ml: 2, mr: 2 }}>
                            {allUsers &&
                              allUsers.slice(0, 6).map((val, index) => (
                                <ListItem
                                  key={index + val.id}
                                  disablePadding
                                  secondaryAction={
                                    <Stack
                                      direction="row"
                                      spacing={1}
                                      justifyContent="space-between"
                                    >
                                      {" "}
                                      <IconButton
                                        sx={{ bgcolor: "grey.800" }}
                                        color="info"
                                        size="small"
                                      >
                                        <Facebook />
                                      </IconButton>
                                      <IconButton
                                        sx={{ bgcolor: "grey.800" }}
                                        color="info"
                                        size="small"
                                      >
                                        <Phone />
                                      </IconButton>
                                      <IconButton
                                        sx={{ bgcolor: "grey.800" }}
                                        color="info"
                                        size="small"
                                      >
                                        <Email />
                                      </IconButton>
                                    </Stack>
                                  }
                                >
                                  <ListItemAvatar>
                                    <Avatar
                                      sx={{ height: 40, width: 40 }}
                                      src={`${process.env.REACT_APP_URL}image/profile/${val.image}`}
                                    />
                                  </ListItemAvatar>
                                  <ListItemText
                                    primary={
                                      <Typography
                                        variant="subtitle2"
                                        sx={{ color: "grey.200" }}
                                      >
                                        {`${val.firstname} ${val.lastname}`}
                                      </Typography>
                                    }
                                    secondary={
                                      <Typography
                                        variant="body2"
                                        sx={{
                                          color: `${alpha(
                                            theme.palette.grey[200],
                                            0.6
                                          )}`,
                                          maxWidth: 160,
                                        }}
                                        noWrap
                                      >
                                        {`${val.department}`}
                                      </Typography>
                                    }
                                  />
                                </ListItem>
                              ))}
                          </List>
                        </Paper>
                      </Grid>
                      <Grid item xs={12} md={6} lg={3}>
                        <Paper className={classes.dashboardCard}>
                          <Typography
                            variant="h6"
                            component="div"
                            sx={{ color: "grey.200", mb: 4 }}
                          >
                            ค่ารักษาสูงสุด
                          </Typography>
                          <List sx={{ width: 1 }}>
                            {allUsers &&
                              allUsers.slice(0, 3).map((val, index) => (
                                <ListItem
                                  key={index + val.id}
                                  secondaryAction={
                                    <Fragment>
                                      <MilitaryTech
                                        sx={{
                                          color:
                                            index == 0
                                              ? amber.A700
                                              : index == 1
                                              ? grey.A200
                                              : deepOrange[300],
                                          fontSize: 32,
                                        }}
                                      />
                                    </Fragment>
                                  }
                                >
                                  <ListItemAvatar>
                                    <Avatar
                                      sx={{ height: 40, width: 40 }}
                                      src={`${process.env.REACT_APP_URL}image/profile/${val.image}`}
                                    />
                                  </ListItemAvatar>
                                  <ListItemText
                                    primary={
                                      <Box>
                                        <Typography
                                          variant="subtitle2"
                                          sx={{ color: "grey.200" }}
                                        >
                                          {`${val.firstname} ${val.lastname}`}
                                        </Typography>
                                        <Stack
                                          direction="row"
                                          spacing={1}
                                          sx={{}}
                                        >
                                          <IconButton
                                            color="info"
                                            sx={{
                                              height: 16,
                                              width: 16,
                                              color: `${alpha(
                                                theme.palette.grey[200],
                                                0.9
                                              )}`,
                                            }}
                                          >
                                            <Facebook sx={{ fontSize: 16 }} />
                                          </IconButton>
                                          <IconButton
                                            color="info"
                                            sx={{
                                              height: 16,
                                              width: 16,
                                              color: `${alpha(
                                                theme.palette.grey[200],
                                                0.9
                                              )}`,
                                            }}
                                          >
                                            <Phone sx={{ fontSize: 16 }} />
                                          </IconButton>
                                          <IconButton
                                            color="info"
                                            sx={{
                                              height: 16,
                                              width: 16,
                                              color: `${alpha(
                                                theme.palette.grey[200],
                                                0.9
                                              )}`,
                                            }}
                                          >
                                            <Email sx={{ fontSize: 16 }} />
                                          </IconButton>
                                        </Stack>
                                      </Box>
                                    }
                                  />
                                </ListItem>
                              ))}
                          </List>
                        </Paper>
                      </Grid>
                    </Grid>
                  </Fragment>
                ) : (
                  ""
                )}

                <Paper className={classes.dashboardCard}>
                  <TabCustomRight
                    right={data.rightTreatment && data.rightTreatment[0]}
                    useRight={data.health && data.health.treatment}
                  />
                </Paper>
              </Container>
            </Box>
          ) : (
            ""
          )}
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default Dashbord;
