import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import Themplates from "../../shared/theme";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { getAllUsers, getUserProfile } from "../../../../actions/user";
import Profile from "../../shared/card/Profile";
import CoverPhoto from "../../shared/card/CoverPhoto";
import healthCheckService from "../../../../services/healthCheck.service";
import healthCheckCategoryService from "../../../../services/healthCheckCategory.service";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import healthServices from "../../../../services/health.services";
import SlideArrow from "../../shared/slideArrow";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import Slider from "react-slick";
import TreatmentCard from "../../shared/card/TreatmentCard";
import ReactApexChart from "react-apexcharts";
import treatmentCategoryService from "../../../../services/treatmentCategory.service";
import dayjs from "dayjs";

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

const TreatmentHistoryDetail = () => {
  const classes = useStyles();
  const dispath = useDispatch();

  const { user: currentUser } = useSelector((state) => state.auth);
  const { result: userProfile } = useSelector((state) => state.userProfile);

  const [lastHealthCheck, setLastHealCheck] = useState();
  const [healthHistory, setHealthHistory] = useState();
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState();
  const [data, setData] = useState();
  const [category, setCategory] = useState();

  useEffect(async () => {
    const setupData = async (userId) => {
      // get last tratment of user for display date in profile card
      const lastHealthCheck_ = await healthCheckService.getLastHealthCheck(
        userId
      );
      setLastHealCheck(lastHealthCheck_);

      // get all health database
      const health_ = await healthServices.getHealthProfile(userId);

      // history extraction from history database
      const healthHistory_ = calhealthHstory(health_);
      setHealthHistory(healthHistory_);

      const categories_ = await treatmentCategoryService.getTreatmentCategory();

      setCategory(categories_);
    };
    if (currentUser) {
      dispath(getUserProfile(currentUser.id));
      setupData(currentUser.id);
    }
  }, []);

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

  const [setting] = useState({
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 5,
    initialSlide: 1,
    adaptiveHeight: false,
    nextArrow: <SlideArrow Comp={KeyboardArrowRight} />,
    prevArrow: <SlideArrow Comp={KeyboardArrowLeft} />,
    responsive: [
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  const checkTreatmentStateInProcess = (state) => {
    const result =
      state
        .map((e) => {
          return e.clear;
        })
        .indexOf(false) == -1
        ? false
        : true;

    return result;
  };

  const checkTreatmentStateOutProcess = (state) => {
    const result =
      state
        .map((e) => {
          return e.clear;
        })
        .indexOf(false) == -1
        ? true
        : false;

    return result;
  };

  const handleOnClickOpen = (data) => {
    if (data) {
      let step = data.state.findIndex((item) => !item.clear);
      setActiveStep(step);
      setData(data);
      setOpen(true);
    }
  };

  const handleOnClickClose = () => {
    setOpen(false);
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div className={`dashboard-page-light`}>
          {userProfile ? (
            <Box sx={{ marginBottom: "2rem" }}>
              <Container maxWidth="xl">
                <Typography variant="h3" sx={{ mb: 4 }}>
                  รายการรักษา
                </Typography>
                <Paper sx={{ p: 2, mb: 4 }}>
                  <Typography variant="h6" component="div">
                    รายการระหว่างดำเนินการ
                  </Typography>
                  <Box>
                    {healthHistory && (
                      <Slider {...setting}>
                        {healthHistory
                          .filter((item) =>
                            checkTreatmentStateInProcess(item.state)
                          )
                          .map((val, index) => (
                            <Button
                              sx={{
                                margin: "8px",
                                flexGrow: 1,
                                flexBasis: 1,
                                width: "240px",
                                padding: "0",
                              }}
                              onClick={() => handleOnClickOpen(val)}
                              key={index}
                            >
                              <TreatmentCard
                                themes="light"
                                secondayText={
                                  category &&
                                  category
                                    .find((item) => item.id == val.category)
                                    .name.toUpperCase()
                                }
                                icon={`${process.env.PUBLIC_URL}/assets/icons/Treatment-Report/${val.icon}`}
                                primaryText={val.section}
                                bottomLife={dayjs(val.date)}
                              />
                            </Button>
                          ))}
                      </Slider>
                    )}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button href={`/health/TreatmentHistory/DataGrid`}>
                      View more
                    </Button>
                  </Box>
                </Paper>
                <Paper className={classes.cardW}>
                  <Typography variant="h6" component="div">
                    รายการสมบูรณ์
                  </Typography>
                  <Box>
                    <Slider {...setting}>
                      {healthHistory &&
                        healthHistory
                          .filter((item) =>
                            checkTreatmentStateOutProcess(item.state)
                          )
                          .map((val, index) => (
                            <Box
                              sx={{
                                margin: "8px",
                                flexGrow: 1,
                                flexBasis: 1,
                                cursor: "pointer",
                              }}
                              key={index}
                            >
                              <TreatmentCard
                                themes="light"
                                secondayText={
                                  category &&
                                  category
                                    .find((item) => item.id == val.category)
                                    .name.toUpperCase()
                                }
                                icon={`${process.env.PUBLIC_URL}/assets/icons/Treatment-Report/${val.icon}`}
                                primaryText={val.section}
                                bottomLife={dayjs(val.date)}
                              />
                            </Box>
                          ))}
                    </Slider>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button href={`/health/TreatmentHistory/DataGrid`}>
                      View more
                    </Button>
                  </Box>
                </Paper>
              </Container>
            </Box>
          ) : (
            ""
          )}
        </div>
        <Dialog
          open={open}
          onClose={() => handleOnClickClose()}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Block Chain</DialogTitle>
          <Divider />
          <DialogContent>
            <Stepper activeStep={activeStep}>
              {data &&
                data.state.map((val, index) => (
                  <Step key={index}>
                    <StepLabel>{val.action}</StepLabel>
                  </Step>
                ))}
            </Stepper>
          </DialogContent>
          <DialogContent>
            {data && (
              <Grid container spacing={2}>
                <Grid item md={6}>
                  <Box
                    sx={{
                      flexGrow: 1,
                      flexBasis: 1,
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                      minWidth: "360px",
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
                      จำนวนเงิน
                    </Typography>
                    <Typography
                      variant="h4"
                      component="div"
                      sx={{ fontWeight: "700" }}
                    >
                      ฿{" "}
                      {data.expenses
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item md={6}>
                  <Box
                    sx={{
                      flexGrow: 1,
                      flexBasis: 1,
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                      minWidth: "360px",
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
                      ประเภท
                    </Typography>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{
                        fontWeight: "700",
                        color:
                          data.category == 1
                            ? "DeepSkyBlue"
                            : data.category == 2
                            ? "Gold"
                            : "Crimson",
                      }}
                    >
                      {category.find((item) => item.id == data.category).name}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item md={6}>
                  <Box
                    sx={{
                      flexGrow: 1,
                      flexBasis: 1,
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                      minWidth: "360px",
                      padding: "1rem",
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
                      สถานที่
                    </Typography>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ fontWeight: "700" }}
                    >
                      {data.location}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            )}
          </DialogContent>
        </Dialog>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default TreatmentHistoryDetail;
