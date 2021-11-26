import React, { useEffect, useState, useRef } from "react";

import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";

import { makeStyles } from "@mui/styles";
import {
  Card,
  Container,
  Drawer,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

import SalesBox from "../shared/salesBox";
import InsuranceData from "../shared/dataDetail/InsuranceData";
import insuranceService from "../../../services/insurance.service";
import { Box } from "@mui/system";
import { Star } from "@mui/icons-material";
import { amber, yellow } from "@mui/material/colors";
import ReviewsCard from "../shared/card/ReviewCard";

import Sticky from "react-stickynode";

const theme = createTheme();

const useStyles = makeStyles(() => ({
  paper: {
    padding: "1rem",
    // width: "100%",
  },
  header: {
    marginBottom: "1.25rem",
  },
  paragraph: {
    marginRight: "10px",
  },
}));

const DetailInsurance = (props) => {
  const classes = useStyles();
  const [id, setId] = useState();
  const [detail, setDetail] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const id_ = props.match.params.id;
      setId(id_);
      console.log("fetch id ", id_);
      const data = await insuranceService.getDetailInsurance(id_);
      setDetail(data.data);
    };

    if (props.match.params.id) {
      fetchData();
    }
  }, []);
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div className={`page`}>
          {detail && (
            <Container maxWidth="lg" sx={{ display: "flex" }}>
              <Grid container spacing={4}>
                <Grid item md={8} xs={12}>
                  <InsuranceData detail={detail} />
                  <br />
                  <ReviewsCard type="insurance" />
                </Grid>
                <Grid item md={4} xs={12}>
                  <Sticky enabled={true} top={70}>
                    <SalesBox detail={detail} type="insurance" />
                  </Sticky>
                </Grid>
              </Grid>
            </Container>
          )}
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default DetailInsurance;
