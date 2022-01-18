import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Themplates from "../../shared/theme";
import {
  Button,
  Card,
  Container,
  Grid,
  Icon,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { getUserProfile } from "../../../../actions/user";
import {
  AccountBox,
  Circle,
  Group,
  HistoryToggleOff,
  HomeWork,
  MonitorWeight,
  Phone,
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

// Themplates.palette = {
//   mode: "dark",
// };
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
  root: {
    boxShadow: "rgb(3 0 71 / 9%) 0px 1px 3px",
    padding: "1rem",
  },
  background: {
    width: "100%",
    overflow: "hidden",
    display: "block",
  },
  boxBackground: {
    overflow: "hidden",
    height: "300px",
    width: "100%",
  },
  // containers: {
  //   // position: "relative",
  //   // width: "100%",
  //   // alignItems: "center",
  //   // display: "block",
  // },
  cardProfile: {
    padding: "1.25rem",
    boxShadow: "rgb(3 0 71 / 9%) 0px 1px 3px",
    position: "relative",
    margin: "-50px 0 40px",
    minHeight: "160px",
    backgroundColor: "#121212",
    color: "#fff",
    backgroundImage:
      "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
  },
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
  buttonOne: {
    boxShadow: "rgb(3 0 71 / 9%) 0px 1px 3px",
    "&:hover": {
      boxShadow: "rgb(3 0 71 / 20%) 0px 2px 4px",
    },
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
}));

const colorDip = [
  { color: "#63ff00", meaning: "ไม่มีนัยสำคัญ" },
  { color: "#d6ff00", meaning: "ต่ำ" },
  { color: "#ffff00", meaning: "ปานกลาง" },
  { color: "#ffc100", meaning: "สูง" },
  { color: "#ff0000", meaning: "สูงมาก" },
];

const defaultOption = {
  chart: { toolbar: { show: false }, type: "area" },
  grid: {
    show: false,
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  },
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    area: {
      fillTo: "end",
    },
  },
  yaxis: {
    show: false,
  },
  xaxis: {
    labels: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    crosshairs: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  stroke: {
    width: 2.5,
    curve: "smooth",
  },
  legend: {
    show: false,
  },
};

const Dashbord = () => {
  const classes = useStyles();
  const dispath = useDispatch();

  const { user: currentUser } = useSelector((state) => state.auth);
  const { result: userProfile } = useSelector((state) => state.userProfile);
  const [lastHealthCheck, setLastHealCheck] = useState();
  const [health, setHealth] = useState();
  const [rightTreatment, setRightTreatment] = useState();

  useEffect(() => {
    const setupData = async (userId) => {
      const lastHealthCheck_ = await healthCheckService.getLastHealthCheck(
        userId
      );
      setLastHealCheck(lastHealthCheck_);
      const health_ = await healthServices.getHealthProfile(userId);
      setHealth(health_);

      const rightTreatment_ =
        await rightTreatmentService.getAllRightTreatment();
      setRightTreatment(rightTreatment_);
    };
    if (currentUser) {
      dispath(getUserProfile(currentUser.id));
      setupData(currentUser.id);
    }
  }, []);

  const setChartDataWeight = () => {
    if (health) {
      const option = defaultOption;
      option.xaxis.categories = health.exercise.reduce((prev, curr) => {
        prev.push(dayjs(curr.date).format("MMM"));
        return prev;
      }, []);

      const series = [
        {
          name: "Weight",
          data: health.exercise.reduce((prev, curr) => {
            prev.push(curr.weight);
            return prev;
          }, []),
        },
      ];
      const data = { series, option };
      return data;
    }
  };

  const setChartDataBMI = () => {
    if (health) {
      const option = defaultOption;
      option.xaxis.categories = health.exercise.reduce((prev, curr) => {
        prev.push(dayjs(curr.date).format("MMM"));
        return prev;
      }, []);

      const series = [
        {
          name: "BMI",
          data: health.exercise.reduce((prev, curr) => {
            prev.push(curr.weight / Math.pow(curr.height / 100, 2).toFixed(1));
            return prev;
          }, []),
        },
      ];
      const data = { series, option };
      return data;
    }
  };

  const setChartDataTrendWeight = (key) => {
    if (health && key == "option") {
      const option = {
        chart: {
          type: "area",
          toolbar: { show: false },
          background: "transparant",
          foreColor: "rgba(255, 255, 255, 0.7)",
        },
        xaxis: {
          categories: health.exercise.reduce((prev, curr) => {
            prev.push(dayjs(curr.date).format("MMM"));
            return prev;
          }, []),
        },
        tooltip: {
          theme: "dark",
        },
      };

      return option;
    }
    if (health && key == "series") {
      const series = [
        {
          name: "Weight",
          data: health.exercise.reduce((prev, curr) => {
            prev.push(curr.weight);
            return prev;
          }, []),
        },
      ];
      return series;
    }
  };

  const setChartDataTrendExercise = (key) => {
    if (health && key == "option") {
      const option = {
        chart: {
          type: "area",
          toolbar: { show: false },
          background: "transparant",
          foreColor: "rgba(255, 255, 255, 0.7)",
        },
        xaxis: {
          categories: health.exercise.reduce((prev, curr) => {
            prev.push(dayjs(curr.date).format("MMM"));
            return prev;
          }, []),
        },
        tooltip: {
          theme: "dark",
        },
      };

      return option;
    }
    if (health && key == "series") {
      const series = [
        {
          name: "Exercise-HRS",
          data: health.exercise.reduce((prev, curr) => {
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
      const option = {
        chart: {
          type: "area",
          toolbar: { show: false },
          background: "transparant",
          foreColor: "rgba(255, 255, 255, 0.7)",
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded",
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: TrendRiskHistoryData.categories,
        },
        tooltip: {
          theme: "dark",
        },
      };
      return option;
    }
    if (type == "series") {
      const series = TrendRiskHistoryData.series;
      return series;
    }
  };
  const statusExercise = () => {
    if (health) {
      const hrs = health.exercise.at(-1).time;

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
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div className={`dashboard-page`}>
          {userProfile ? (
            <Box>
              <CoverPhoto image={userProfile.background} />
              <Container maxWidth="xl">
                <Profile profile={userProfile} lastHealth={lastHealthCheck} />

                <Paper className={classes.card}>
                  <Grid container>
                    <Grid item xs={12} sm={3} md={2} lg={1}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          width: "100%",
                        }}
                      >
                        <Typography
                          variant="h6"
                          className={classes.headText}
                          component="div"
                          gutterBottom
                        >
                          ความเสี่ยง
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      margin: "0 20%",
                    }}
                  >
                    <GaugeChart
                      id="gaugeChartRick"
                      nrOfLevels={5}
                      // arcsLength={[0.25, 0.5, 0.25]}
                      style={{
                        maxHeight: "400px",
                      }}
                      colors={[
                        "#63ff00",
                        "#d6ff00",
                        "#ffff00",
                        "#ffc100",
                        "#ff0000",
                      ]}
                      animDelay={1000}
                      arcPadding={0.02}
                      percent={0.4}
                      hideText
                      needleBaseColor={"#2b191d"}
                      needleColor={"#2b191d"}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      margin: "0 20%",
                    }}
                  >
                    {colorDip.map((val, index) => (
                      <Box
                        sx={{ display: "flex", alignItems: "center" }}
                        key={index}
                      >
                        <Circle
                          sx={{ color: val.color, margin: "0 4px 0 20px" }}
                        />
                        <Typography variant="body2">{val.meaning}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Paper>
                <Grid container spacing={4} sx={{ marginBottom: "40px" }}>
                  <Grid item md={6} xs={12}>
                    <BowTieCard
                      themes="dark"
                      headerknot="triangle"
                      headerPosition="left"
                      headerknotText="Weight"
                      imageIcon={`weight-scale.svg`}
                      primaryText={
                        health ? health.exercise.at(-1).weight.toFixed(1) : "-"
                      }
                      secondaryText="KM."
                      backgroundData={setChartDataWeight()}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <BowTieCard
                      themes="dark"
                      headerknot="triangle"
                      headerPosition="left"
                      imageIcon={`bmi.svg`}
                      primaryText={
                        health
                          ? (
                              health.exercise.at(-1).weight /
                              Math.pow(health.exercise.at(-1).height / 100, 2)
                            ).toFixed(1)
                          : "-"
                      }
                      backgroundData={setChartDataBMI()}
                    />
                  </Grid>
                </Grid>
                {health && (
                  <Paper className={classes.card}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        width: "100%",
                      }}
                    >
                      <Typography
                        variant="h6"
                        className={classes.headText}
                        component="div"
                        gutterBottom
                      >
                        Trend นำ้หนัก
                      </Typography>
                    </Box>

                    <ReactApexChart
                      options={setChartDataTrendWeight("option")}
                      series={setChartDataTrendWeight("series")}
                      type="area"
                      height="300px"
                    />
                  </Paper>
                )}

                <Grid container spacing={4} sx={{ marginBottom: "40px" }}>
                  <Grid item md={6} xs={12}>
                    <BowTieCard
                      themes="dark"
                      headerknot="rectangle"
                      headerknotText="การออกกำลังกาย"
                      primaryText={statusExercise()}
                      imageIcon={`weight-scale.svg`}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <BowTieCard
                      themes="dark"
                      headerknot="rectangle"
                      headerknotText="การออกกำลังกาย"
                      primaryText={health && health.exercise.at(-1).time}
                      secondaryText={"HRS"}
                      imageIcon={`bmi.svg`}
                    />
                  </Grid>
                </Grid>

                {health && (
                  <Paper className={classes.card}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        width: "100%",
                      }}
                    >
                      <Typography
                        variant="h6"
                        className={classes.headText}
                        component="div"
                        gutterBottom
                      >
                        Trend การออกกำลังกาย
                      </Typography>
                    </Box>

                    <ReactApexChart
                      options={setChartDataTrendExercise("option")}
                      series={setChartDataTrendExercise("series")}
                      type="area"
                      height="300px"
                    />
                  </Paper>
                )}

                {health && (
                  <Paper className={classes.card}>
                    <Box sx={{ marginLeft: "60px" }}>
                      <Message message={health.healthStatus.family} />
                    </Box>
                    <Box
                      sx={{
                        marginTop: "10px",
                        textAlign: "end",
                        width: "60px",
                      }}
                    >
                      <Icon sx={{ fontSize: "5rem" }}>
                        <img
                          src={`${process.env.PUBLIC_URL}/assets/icons/other/family.svg`}
                          width="100%"
                        />
                      </Icon>
                    </Box>
                    <Box sx={{ marginLeft: "60px" }}>
                      <Message message={health.healthStatus.myself} />
                    </Box>
                    <Box
                      sx={{
                        marginTop: "10px",
                        textAlign: "end",
                        width: "60px",
                      }}
                    >
                      <Icon sx={{ fontSize: "5rem" }}>
                        <img
                          src={`${process.env.PUBLIC_URL}/assets/icons/other/boy.svg`}
                          width="100%"
                        />
                      </Icon>
                    </Box>
                  </Paper>
                )}

                <Paper className={classes.card}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      width: "100%",
                    }}
                  >
                    <Typography
                      variant="h6"
                      className={classes.headText}
                      component="div"
                      gutterBottom
                    >
                      ความรู้สึกทางร่างกายของเราเอง
                    </Typography>
                  </Box>
                  <ReactApexChart
                    options={setChartSensation("options")}
                    series={setChartSensation("series")}
                    height="360px"
                    type="bar"
                  />
                </Paper>

                <Paper className={classes.card}>
                  <TabCustomRight
                    right={rightTreatment && rightTreatment[0]}
                    useRight={health && health.treatment}
                  />
                </Paper>

                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
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
