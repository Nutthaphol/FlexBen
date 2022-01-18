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
import { Container, Grid, Link } from "@mui/material";
import { Box } from "@mui/system";
import healthCheckService from "../../../../services/healthCheck.service";
import healthCheckCategoryService from "../../../../services/healthCheckCategory.service";
import CategoryCard from "../../shared/card/CategoryCard";

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

const HealthHistory = () => {
  const classes = useStyles();
  const dispath = useDispatch();

  const { user: currentUser } = useSelector((state) => state.auth);
  const { result: userProfile } = useSelector((state) => state.userProfile);

  const [lastHealthCheck, setLastHealCheck] = useState();
  const [healthCheckCategory, setHealthCheckCategory] = useState();

  useEffect(async () => {
    const setupData = async (userId) => {
      const lastHealthCheck_ = await healthCheckService.getLastHealthCheck(
        userId
      );
      setLastHealCheck(lastHealthCheck_);

      const healthCheckCategory_ =
        await healthCheckCategoryService.getHealthCheckCategory();
      setHealthCheckCategory(healthCheckCategory_);
    };
    if (currentUser) {
      dispath(getUserProfile(currentUser.id));
      setupData(currentUser.id);
    }
  }, []);
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div className={`dashboard-page-light`}>
          {userProfile ? (
            <Box sx={{ marginBottom: "2rem" }}>
              <CoverPhoto image={userProfile.background} />
              <Container maxWidth="xl">
                <Profile
                  profile={userProfile}
                  lastHealth={lastHealthCheck}
                  themes="light"
                />
                <Grid container spacing={3}>
                  {healthCheckCategory &&
                    healthCheckCategory.map((val, index) => (
                      <Grid item xs={12} md={6}>
                        <Box
                          key={index}
                          sx={{
                            "&:hover": {
                              transform: "scale(1.02)",
                              transition: "transform .2s",
                            },
                          }}
                        >
                          <CategoryCard
                            categoryText={val.name}
                            path={`/health/HealthHistory/detail/${val.id}`}
                            icon={val.icon}
                          />
                        </Box>
                      </Grid>
                    ))}
                </Grid>
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

export default HealthHistory;
