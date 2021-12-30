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
import { Box, Container, Grid, Paper } from "@mui/material";
import Profile from "../../shared/card/Profile";
import healthServices from "../../../../services/health.services";
import healthCheckService from "../../../../services/healthCheck.service";
import { getUserProfile } from "../../../../actions/user";
import BowTieCard2 from "../../shared/card/BowTieCard2";
import PercentCard from "../../shared/card/PercentCard";

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
}));

const HistoryTreatment = () => {
  const classes = useStyles();
  const dispath = useDispatch();

  const { user: currentUser } = useSelector((state) => state.auth);
  const { result: userProfile } = useSelector((state) => state.userProfile);

  const [lastHealthCheck, setLastHealCheck] = useState();
  const [countOPD, setCountOPD] = useState(0);
  const [countIPD, setCountIPD] = useState(0);

  useEffect(() => {
    const setupData = async (userId) => {
      const lastHealthCheck_ = await healthCheckService.getLastHealthCheck(
        userId
      );
      setLastHealCheck(lastHealthCheck_);

      const health_ = await healthServices.getHealthProfile(userId);
      const countOPD_ = calCountOPD(health_.treatment);
      setCountOPD(countOPD_);
      const countIPD_ = calCountIPD(health_.treatment);
      setCountIPD(countIPD_);
    };
    if (currentUser) {
      dispath(getUserProfile(currentUser.id));
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

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div className={`dashboard-page`}>
          {userProfile ? (
            <Box>
              <CoverPhoto image={userProfile.background} />
              <Container maxWidth="xl">
                <Profile profile={userProfile} lastHealth={lastHealthCheck} />
                <Grid container spacing={2} sx={{ mb: "40px" }}>
                  <Grid item md={6} xs={12}>
                    <BowTieCard2
                      typeBow={1}
                      imageIcon={"OPD.svg"}
                      category={"OPD"}
                      value={countOPD}
                      unit={"ครั้ง"}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <BowTieCard2
                      typeBow={1}
                      imageIcon={"IPD.svg"}
                      category={"IPD"}
                      value={countIPD}
                      unit={"ครั้ง"}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mb: "40px" }}>
                  <Grid item md={3}>
                    <BowTieCard2
                      longText={true}
                      typeBow={2}
                      imageIcon={"cash-payment.svg"}
                      category={"ใช้ไป"}
                      value={"84,248"}
                      unit={"ครั้ง"}
                    />
                  </Grid>
                  <Grid item md={3}>
                    <BowTieCard2
                      longText={true}
                      typeBow={2}
                      imageIcon={"save-money.svg"}
                      category={"เบิกได้"}
                      value={"150,000"}
                      unit={"ครั้ง"}
                    />
                  </Grid>
                  <Grid item md={3}>
                    <BowTieCard2
                      longText={true}
                      typeBow={2}
                      imageIcon={"Withdraw-money.svg"}
                      category={"ส่วนต่าง"}
                      value={"65,752"}
                      unit={"ครั้ง"}
                    />
                  </Grid>
                  <Grid item md={3}>
                    <BowTieCard2
                      longText={true}
                      typeBow={2}
                      imageIcon={"file.svg"}
                      category={"รอดำเนินการ"}
                      value={"-"}
                      unit={"ครั้ง"}
                    />
                  </Grid>
                </Grid>
                <PercentCard value={50} text={"คงเหลือ"} />
                <Paper className={classes.card}></Paper>
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

export default HistoryTreatment;
