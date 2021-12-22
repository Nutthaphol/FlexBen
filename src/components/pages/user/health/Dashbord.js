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
  Paper,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { getUserProfile } from "../../../../actions/user";

const theme = createTheme(Themplates);

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
  containers: {
    position: "relative",
    width: "100%",
    alignItems: "center",
    display: "block",
    marginTop: "60px",
  },
  cardProfile: {
    padding: "10px",
    boxShadow: "rgb(3 0 71 / 9%) 0px 1px 3px",
    position: "relative",
    margin: "-50px 8% 0px",
    minHeight: "160px",
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
  },
  buttonOne: {
    boxShadow: "rgb(3 0 71 / 9%) 0px 1px 3px",
    "&:hover": {
      boxShadow: "rgb(3 0 71 / 20%) 0px 2px 4px",
    },
  },
}));

const Dashbord = () => {
  const classes = useStyles();
  const dispath = useDispatch();

  const { user: currentUser } = useSelector((state) => state.auth);
  const { result: userProfile } = useSelector((state) => state.userProfile);

  useEffect(() => {
    if (currentUser) {
      dispath(getUserProfile(currentUser.id));
    }
  }, []);

  return (
    // <div className={``}>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        {userProfile ? (
          <Box className={classes.containers}>
            {/* className={classes.containers} */}
            <Box
              className={classes.boxBackground}
              style={{
                backgroundImage: `url(${process.env.REACT_APP_URL}image${userProfile.background})`,
              }}
            ></Box>
            <Container maxWidth="xl">
              <Paper className={classes.cardProfile}>
                <Grid container spacing={2}>
                  <Grid
                    item
                    // lg={3}
                    // md={4}
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
                        sx={{
                          padding: "10px",
                          background: "#fff",
                          borderRadius: "8px",
                          boxShadow: "rgb(3 0 71 / 9%) 0px 1px 3px",
                        }}
                      >
                        <img
                          src={`${process.env.REACT_APP_URL}image/profile/${userProfile.image}`}
                          width="100%"
                          className={classes.profile}
                        />
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Grid
                      container
                      //   justifyContent="center"
                      alignItems="flex-end"
                      spacing={2}
                    >
                      <Grid item>
                        <Typography
                          variant="h5"
                          component="div"
                          gutterBottom
                          className={classes.headText}
                          sx={{ margin: 0 }}
                        >
                          {`${userProfile.firstname} ${userProfile.lastname}`}
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
                          variant="subtitle1"
                          component="div"
                          gutterBottom
                          className={classes.subText}
                          color="text.secondary"
                        >
                          เลขประจำตัวพนักงาน: {userProfile.employeeCode}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Container>
          </Box>
        ) : (
          ""
        )}
      </ThemeProvider>
    </StyledEngineProvider>
    // </div>
  );
};

export default Dashbord;
