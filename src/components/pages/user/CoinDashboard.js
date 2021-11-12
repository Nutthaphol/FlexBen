import React, { useEffect } from "react";

import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { Container, Grid, Paper, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import DataCard from "../shared/card/DataCard";
import { getDetail } from "../../../actions/detail";
import PaperTable from "../shared/card/PaperTable";
import { Box } from "@mui/system";

const theme = createTheme();

const useStyles = makeStyles(() => ({
  root: {},
  paper: {
    position: "relative",
    padding: "20px",
    width: "100%",
    height: "auto",
    marginTop: "50px",
    overflow: "auto",
  },
}));

const CoinDashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  const { result: detailUser } = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getDetail(currentUser.id));
  }, []);
  return (
    <div className={`page`}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          {detailUser && (
            <Container maxWidth="xl">
              <Typography variant="h4" gutterBottom>
                Coin Dashboard
              </Typography>
              <Grid
                container
                spacing={2}
                justifyContent="space-between"
                sx={{ width: "100%" }}
              >
                <Grid item>
                  <DataCard
                    section="Insurance คงเหลือ"
                    value={detailUser.insuranceCoin}
                  />
                </Grid>
                <Grid item>
                  <DataCard
                    section="Insurance คงเหลือ"
                    value={detailUser.insuranceCoin}
                  />
                </Grid>
                <Grid item>
                  <DataCard
                    section="Insurance คงเหลือ"
                    value={detailUser.insuranceCoin}
                  />
                </Grid>
                <Grid item>
                  <DataCard
                    section="Insurance คงเหลือ"
                    value={detailUser.insuranceCoin}
                  />
                </Grid>
              </Grid>
              {/* <Box sx={{ mt: 6 }} /> */}
              <Paper className={classes.paper}>
                <Typography variant="h5" gutterBottom>
                  รายละเอียด
                </Typography>
                <Grid container spacing={4} sx={{ mt: 1 }}>
                  {[1, 2, 3, 4].map((item) => (
                    <Grid item xs={12}>
                      <PaperTable
                        section="Insurance"
                        value1={detailUser.insuranceCoin}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Container>
          )}
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
};

export default CoinDashboard;
