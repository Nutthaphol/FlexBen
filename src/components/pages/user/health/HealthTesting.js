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
import {
  Box,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import healthCheckService from "../../../../services/healthCheck.service";
import healthCheckCategoryService from "../../../../services/healthCheckCategory.service";
import dayjs from "dayjs";
import CardHealthCheckDetail from "../../shared/card/CardHealthCheckDetail";

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

const HealthTesting = (props) => {
  const classes = useStyles();
  const dispath = useDispatch();

  const { user: currentUser } = useSelector((state) => state.auth);
  const { result: userProfile } = useSelector((state) => state.userProfile);

  const [lastHealthCheck, setLastHealCheck] = useState();
  const [healthCheckCategory, setHealthCheckCategory] = useState();
  const [healthData, setHealthData] = useState();
  const [timeSelect, setTimeSelect] = useState(-1);
  const [listTime, setListTime] = useState();
  const [healthSelect, setHealthSelect] = useState();
  const [reload, setReload] = useState(true);

  useEffect(async () => {
    const setupData = async (userId) => {
      const healthCheckCategoriesId = props.match.params.id;
      const lastHealthCheck_ = await healthCheckService.getLastHealthCheck(
        userId
      );
      setLastHealCheck(lastHealthCheck_);

      const healthData_ = await healthCheckService.getHealthCheck(userId);

      //   save health all time
      //   call
      setHealthData(healthData_.time);

      //   save time then check
      const listTime_ = healthData_.time.map((e) => {
        return e.dateTest;
      });
      setListTime(listTime_);
      //   save defual time check
      setTimeSelect(listTime_[0]);

      let healthSelect_ = healthData_.time.find(
        (item) => item.dateTest == listTime_[0]
      );
      healthSelect_ = healthSelect_.testResult.find(
        (item) => item.category == healthCheckCategoriesId
      );

      setHealthSelect(healthSelect_);

      let healthCheckCategory_ =
        await healthCheckCategoryService.getHealthCheckCategory();

      healthCheckCategory_ = healthCheckCategory_.find(
        (item) => item.id == healthCheckCategoriesId
      );

      setHealthCheckCategory(healthCheckCategory_);

      setReload(false);
    };

    if (currentUser && reload) {
      dispath(getUserProfile(currentUser.id));
      setupData(currentUser.id);
    }
  }, [reload]);

  const HeadComponent = () => {
    return (
      <Fragment>
        <Box>
          <Typography variant="h6" component="div">
            {healthCheckCategory && healthCheckCategory.name}
            <Typography
              variant="h6"
              component="span"
              color="text.secondary"
              sx={{ marginLeft: "1rem" }}
            >
              (<i>{healthCheckCategory && healthCheckCategory.original}</i>)
            </Typography>
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            color="text.secondary"
          >
            วันที่ตรวจ: {dayjs(timeSelect).format("D MMMM YYYY")}
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            color="text.secondary"
          >
            แพทย์ผู้ตรวจวินิจฉัย: {healthSelect && healthSelect.doctor}
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            color="text.secondary"
          >
            ผลวินิจฉัย: {healthSelect && healthSelect.resultText}
          </Typography>
        </Box>
        <Box>
          <FormControl sx={{ width: "240px" }}>
            <InputLabel size="small" id="select-time-health-check">
              เลือกเวลาในการตรวจ
            </InputLabel>
            <Select
              size="small"
              labelId="select-time-health-check"
              id="select-time-health-check-id"
              label="เลือกเวลาในการตรวจ"
              value={timeSelect}
              onChange={(e) => setTimeSelect(e.target.value)}
            >
              {listTime &&
                listTime.map((val, index) => (
                  <MenuItem value={val} key={index}>
                    {dayjs(val).format("DD-MM-YYYY")}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>
      </Fragment>
    );
  };
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div className={`dashboard-page-light`}>
          {userProfile ? (
            <Box sx={{ marginBottom: "2rem" }}>
              {/* <CoverPhoto image={userProfile.background} /> */}
              <Container maxWidth="xl">
                <Box
                  sx={{
                    [theme.breakpoints.down("md")]: {
                      display: "none",
                    },
                  }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    spacing={4}
                  >
                    <HeadComponent />
                  </Stack>
                </Box>
                <Box
                  sx={{
                    [theme.breakpoints.up("md")]: {
                      display: "none",
                    },
                  }}
                >
                  <Stack
                    direction="column"
                    justifyContent="space-between"
                    spacing={4}
                  >
                    <HeadComponent />
                  </Stack>
                </Box>
                <Paper
                  sx={{ pr: 2, pl: 2, pt: 4, pb: 4, mb: 4, mt: 4 }}
                  elevation={1}
                >
                  <Grid container spacing={4} sx={{}}>
                    {healthSelect &&
                      healthSelect.result.map((val, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                          <CardHealthCheckDetail data={val} />
                        </Grid>
                      ))}
                  </Grid>
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

export default HealthTesting;
