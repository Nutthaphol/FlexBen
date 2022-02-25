import React, { Fragment, useEffect } from "react";

import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import {
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import DataCard from "../../shared/card/DataCard";
import { getDetail } from "../../../../actions/detail";
import { Box } from "@mui/system";
import { Adb } from "@mui/icons-material";
import { getUserProfile } from "../../../../actions/user";
import Themplates from "../../shared/theme";
import LongCard from "../../shared/card/LongCard";
import { AutoGraphSharp } from "@mui/icons-material";

const theme = createTheme(Themplates);

const useStyles = makeStyles(() => ({
  root: {},
  paper: {
    padding: "10px",
    overflow: "scroll",
    boxShadow: "rgb(3 0 71 / 9%) 0px 1px 3px",
    padding: "1rem",
  },
}));

const CoinDashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  const { result: userProfile } = useSelector((state) => state.userProfile);

  useEffect(() => {
    if (currentUser) {
      dispatch(getUserProfile(currentUser.id));
    }
  }, []);
  return (
    <div className={`page`}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          {userProfile && (
            <Container maxWidth="xl">
              <Typography variant="h3" sx={{ mb: 4 }}>
                Coin Dashboard
              </Typography>
              <Grid
                container
                spacing={4}
                justifyContent="center"
                alignItems="center"
                sx={{ mb: 4 }}
              >
                <Grid item xs={12} md={6} lg={3}>
                  <LongCard
                    primaryText="10000"
                    secondaryText="คงเหลือ"
                    icon={AutoGraphSharp}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                  <LongCard
                    primaryText="10000"
                    secondaryText="คงเหลือ"
                    icon={AutoGraphSharp}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                  <LongCard
                    primaryText="10000"
                    secondaryText="คงเหลือ"
                    icon={AutoGraphSharp}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                  <LongCard
                    primaryText="10000"
                    secondaryText="คงเหลือ"
                    icon={AutoGraphSharp}
                  />
                </Grid>
              </Grid>
              <br />
              <Paper className={classes.paper}>
                <Typography variant="h5" gutterBottom>
                  รายละเอียด
                </Typography>
                <Table>
                  <TableBody>
                    {[1, 2, 3, 4].map((item, index) => (
                      <TableRow key={index}>
                        <TableCell sx={{ width: 120 }} align="left">
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                          >
                            <Adb fontSize="large" />
                            <Typography variant="body1">Insurance</Typography>
                          </Stack>
                        </TableCell>
                        <TableCell sx={{ minWidth: 120 }} align="center">
                          2000
                        </TableCell>
                        <TableCell sx={{ minWidth: 120 }} align="center">
                          2000
                        </TableCell>
                        <TableCell sx={{ minWidth: 120 }} align="center">
                          +4.25%
                        </TableCell>
                        <TableCell sx={{ minWidth: 120 }} align="right">
                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-around"
                            spacing={2}
                            sx={{ width: 1 }}
                          >
                            <Button
                              variant="contained"
                              color="success"
                              sx={{ width: 1 }}
                            >
                              แลก
                            </Button>

                            <Button
                              variant="contained"
                              color="secondary"
                              sx={{ width: 1 }}
                            >
                              ฝาก
                            </Button>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </Container>
          )}
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
};

export default CoinDashboard;
