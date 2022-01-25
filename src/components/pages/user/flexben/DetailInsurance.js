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
  Divider,
  List,
  ListItem,
  Button,
} from "@mui/material";

import SalesBox from "../../shared/salesBox";
import insuranceService from "../../../../services/insurance.service";
import { Box } from "@mui/system";
import { Star } from "@mui/icons-material";
import { amber, yellow } from "@mui/material/colors";
import ReviewsCard from "../../shared/card/ReviewCard";

import Sticky from "react-stickynode";
import Themplates from "../../shared/theme";
import reviewService from "../../../../services/review.service";
import MultiImage from "../../shared/multiImage";

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
  root: {
    padding: "1rem",
    boxShadow: "rgb(3 0 71 / 9%) 0px 1px 3px",
  },
  cardMedia: {
    // position: "flex",
    width: "100%",
    height: "auto",
    maxHeight: "30vh",
    backgroundColor: "white",
    objectFit: "cover",
    borderStyle: "solid",
    borderWidth: "1px 1px",
    marginTop: "1.5rem",
    borderColor: "#D0D3D4",
  },
}));

const DetailInsurance = (props) => {
  const classes = useStyles();
  const [id, setId] = useState();
  const [detail, setDetail] = useState();
  const [rating, setRating] = useState();

  useEffect(async () => {
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

    if (rating == null) {
      const review = await reviewService.getAllReviews().then((response) => {
        return response.data;
      });

      const compRating = () => {
        let rating = 0;
        let count = 0;
        if (review) {
          review
            .filter((item) => item.type == "lifestyle")
            .map((item) => {
              rating = rating + item.rating;
              count++;
            });
          rating = rating / count;
        }
        return rating.toFixed(2);
      };

      const avgRat = compRating();
      setRating(avgRat);
    }
  }, [rating]);
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div className={`page`}>
          {detail && (
            <Container maxWidth="xl" sx={{ display: "flex" }}>
              <Grid container spacing={4}>
                <Grid item md={8} xs={12}>
                  <Paper className={classes.root}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography
                        variant={"h4"}
                        sx={{ fontWeight: "700" }}
                        gutterBottom
                      >
                        {detail.name.toUpperCase()}
                        <Typography
                          variant={"h6"}
                          sx={{ fontWeight: "700" }}
                          color="text.secondary"
                          component="div"
                        >
                          {detail.company}
                        </Typography>
                      </Typography>
                      <Box sx={{ flexGrow: 1 }} />
                      <Typography variant="h5" gutterBottom>
                        <Grid container spacing={1}>
                          <Grid item>
                            <Star sx={{ color: amber[500] }} />
                          </Grid>
                          <Grid item>{rating && rating}</Grid>
                        </Grid>
                      </Typography>
                    </Box>
                    <Box sx={{ border: "1px solid #D0D3D4", padding: "20px" }}>
                      <MultiImage listImage={detail.image} />
                      <br />
                    </Box>
                    <br />
                    <Divider />
                    <br />
                    <Typography variant="h5" component="div">
                      {detail.name} จาก {detail.company}
                    </Typography>
                    <Typography variant="subtitle1" component="span">
                      <Box component="span" margin="16px" />
                      {detail.detail}
                    </Typography>
                    <br />
                    <br />
                    <Divider />
                    <br />
                    <Typography variant="h5" component="div">
                      ความคุ้มครอง
                    </Typography>
                    <List>
                      {detail.protection.map((val, index) => (
                        <ListItem
                          key={index}
                          secondaryAction={<i>{val.content} </i>}
                        >
                          <b>{val.section}:</b>
                        </ListItem>
                      ))}
                    </List>
                    <br />
                    <Divider />
                    <br />
                    <Typography variant="h5" component="div">
                      เงื่อนไขความคุ้มครอง
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      component="span"
                      sx={{ display: "flex" }}
                    >
                      <Box component="span" margin="16px" />
                      ระเวลาในการคุ้มครองนาน {detail.protectionPeriod} ปี
                      <Box sx={{ flexGrow: 1 }} />
                      <Button
                        variant="contained"
                        href={detail.link}
                        target="_blank"
                      >
                        คลิก เพื่อดูเงื่อนไขโดยละเอียด
                      </Button>
                    </Typography>
                    <br />
                    <br />
                  </Paper>
                  <br />
                  <ReviewsCard type="insurance" />
                </Grid>
                <Grid item md={4} xs={12}>
                  <Sticky enabled={true} top={70}>
                    <SalesBox
                      // detail={detail}
                      type="insurance"
                      id={detail.id}
                      nameOrder={detail.name}
                      discount={detail.discount}
                      transportation={detail.deliveryCost}
                      price={detail.price}
                    />
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
