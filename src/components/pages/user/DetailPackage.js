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
import ReviewsCard from "../shared/card/ReviewCard";
import { Box } from "@mui/system";
import { Star } from "@mui/icons-material";
import { amber, yellow } from "@mui/material/colors";
import packageService from "../../../services/package.service";
import PackageData from "../shared/dataDetail/PackageData";
import Sticky from "react-stickynode";
import Themplates from "../shared/theme";

const theme = createTheme(Themplates);

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

const DetailPackage = (props) => {
  const classes = useStyles();
  const [id, setId] = useState();
  const [detail, setDetail] = useState();

  useEffect(async () => {
    const fetchData = async () => {
      const id_ = props.match.params.id;
      setId(id_);
      console.log("fetch id ", id_);
      const data = await packageService.getDetailPackage(id_);
      console.log(data.data);
      setDetail(data.data);
    };

    if (props.match.params.id) {
      fetchData();
    }
  }, []);
  return (
    <div className={`page`}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          {detail && (
            <Container maxWidth="lg" sx={{ display: "flex" }}>
              <Grid container spacing={4}>
                <Grid item lg={8} md={8} xs={12}>
                  <PackageData detail={detail} />
                  <br />
                  <ReviewsCard type={"package"} />
                </Grid>
                <Grid item lg={4} md={4} xs={12}>
                  <Sticky enabled={true} top={70}>
                    <SalesBox detail={detail} type="package" />
                  </Sticky>
                </Grid>
              </Grid>
            </Container>
          )}
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
};

export default DetailPackage;
