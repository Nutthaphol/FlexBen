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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import DataCard from "../shared/card/DataCard";
import { getDetail } from "../../../actions/detail";
import PaperTable from "../shared/card/PaperTable";
import { Box } from "@mui/system";
import { Adb } from "@mui/icons-material";
import { getUserProfile } from "../../../actions/user";
import Themplates from "../shared/theme";

const theme = createTheme(Themplates);

const useStyles = makeStyles(() => ({
  root: {},
  paper: {
    // position: "relative",
    padding: "20px",
    // width: "100%",
    // height: "auto",
    marginTop: "50px",
    overflow: "scroll",
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
              <Typography variant="h4" gutterBottom>
                Coin Dashboard
              </Typography>
              <Grid container spacing={2} justifyContent="space-between">
                {userProfile.coin.map((val, index) => (
                  <Grid item key={index}>
                    <DataCard
                      section={val.type + " Coin"}
                      value={val.count}
                      type={val.type}
                    />
                  </Grid>
                ))}
                {/* <Grid item>
                <DataCard section="Insurance คงเหลือ" value={10000} />
              </Grid>
              <Grid item>
                <DataCard section="Insurance คงเหลือ" value={10000} />
              </Grid>
              <Grid item>
                <DataCard section="Insurance คงเหลือ" value={10000} />
              </Grid>
              <Grid item>
                <DataCard section="Insurance คงเหลือ" value={10000} /> 
              </Grid>*/}
              </Grid>
              {/* <Box sx={{ mt: 6 }} /> */}
              <Paper className={classes.paper}>
                <Typography variant="h5" gutterBottom>
                  รายละเอียด
                </Typography>
                <Table>
                  <TableBody>
                    {[1, 2, 3, 4].map((item, index) => (
                      <TableRow>
                        <TableCell>
                          <ListItem>
                            <ListItemIcon>
                              <Adb sx={{ fontSize: "2rem" }} />
                            </ListItemIcon>
                            <ListItemText primary="Insurance" />
                          </ListItem>
                        </TableCell>
                        <TableCell align="right">2000</TableCell>
                        <TableCell align="right">2000</TableCell>
                        <TableCell align="right">+4.25%</TableCell>
                        <TableCell align="right">
                          <Grid container justifyContent="flex-end" spacing={6}>
                            <Grid item>
                              <Button
                                variant="outlined"
                                size="small"
                                color="success"
                              >
                                แลก
                              </Button>
                            </Grid>
                            <Grid item>
                              <Button
                                variant="outlined"
                                size="small"
                                color="secondary"
                              >
                                ฝาก
                              </Button>
                            </Grid>
                          </Grid>
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
