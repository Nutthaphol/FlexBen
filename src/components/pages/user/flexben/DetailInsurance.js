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
  Stack,
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
            <Container maxWidth="lg" sx={{ display: "flex" }}>
              <Grid container spacing={4}>
                <Grid item md={8} xs={12}>
                  <Paper className={classes.root}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography variant={"h3"} gutterBottom>
                        {detail.name.toUpperCase()}
                        <Typography
                          variant={"h6"}
                          color="text.secondary"
                          component="div"
                        >
                          {detail.company}
                        </Typography>
                      </Typography>
                      <Typography variant="h5" gutterBottom>
                        {rating && (
                          <Stack direction="row" spacing={5}>
                            <Star sx={{ color: amber[500] }} />
                            {rating}
                          </Stack>
                        )}
                      </Typography>
                    </Stack>
                    <Box>
                      <MultiImage listImage={detail.image} />
                      <br />
                    </Box>
                    <br />
                    <Divider />
                    <br />
                    <Typography variant="h5" component="div">
                      {detail.name} โดย {detail.company}
                    </Typography>
                    <Typography variant="body1" component="span">
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
                    <List disablePadding>
                      {detail.protection.map((val, index) => (
                        <ListItem
                          key={index}
                          secondaryAction={
                            <Typography
                              variant="body2"
                              sx={{ fontStyle: "italic" }}
                            >
                              {val.content}{" "}
                            </Typography>
                          }
                          disablePadding
                          sx={{ p: "0 16px" }}
                        >
                          <Typography variant="subtitle2">
                            {val.section}:
                          </Typography>
                        </ListItem>
                      ))}
                    </List>
                    <br />
                    <Divider />
                    <br />
                    <Typography variant="h5" component="div">
                      เงื่อนไขความคุ้มครอง
                    </Typography>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography variant="subtitle2">
                        ระเวลาในการคุ้มครองนาน {detail.protectionPeriod} ปี
                      </Typography>
                      <Button
                        color="warning"
                        href={detail.link}
                        target="_blank"
                        variant="contained"
                        size="small"
                      >
                        คลิก เพื่อดูเงื่อนไขโดยละเอียด
                      </Button>
                    </Stack>

                    <br />
                    <br />
                  </Paper>
                  <br />
                  <ReviewsCard type="insurance" />
                </Grid>
                <Grid item md={4} xs={12}>
                  <Sticky enabled={true} top={70}>
                    <SalesBox
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
