import React, { Fragment, useEffect, useState } from "react";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import {
  Avatar,
  Card,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import reviewService from "../../../../services/review.service";
import userService from "../../../../services/user.service";
import dayjs from "dayjs";
import { StarRate } from "@mui/icons-material";
import { amber } from "@mui/material/colors";
import Themplates from "../theme";

const theme = createTheme(Themplates);

const useStyles = makeStyles(() => ({
  root: {
    padding: "1rem",
  },
}));

const ReviewCard = (props) => {
  const { type } = props;
  const classes = useStyles();
  const [reviews, setReviews] = useState();
  const [profiles, setProfiles] = useState();
  const [avgRating, setAvgRating] = useState();

  useEffect(async () => {
    const review_ = await reviewService.getAllReviews().then((response) => {
      return response.data;
    });

    setReviews(review_);

    const compRating = () => {
      let rating = 0;
      let count = 0;
      if (review_) {
        review_
          .filter((item) => item.type == type)
          .map((item) => {
            rating = rating + item.rating;
            count++;
          });
        rating = rating / count;
      }
      return rating.toFixed(2);
    };

    const avgRat = compRating();

    setAvgRating(avgRat);
  }, [avgRating]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        {reviews && (
          <Card className={classes.root}>
            <Stack direction="row" justifyContent="space-between">
              <Typography
                component={"span"}
                variant="h5"
                gutterBottom
                sx={{ flexGrow: 1 }}
              >
                Reviews
              </Typography>
              <Stack direction="row" spacing={2}>
                <Typography
                  component={"span"}
                  variant="subtitle1"
                  sx={{ fontWeight: "600", flexGrow: 0.03 }}
                >
                  Rating reviews {avgRating}
                </Typography>
                {avgRating >= 0 && (
                  <Rating value={4.4} precision={0.2} readOnly />
                )}
              </Stack>
            </Stack>
            <Divider />
            <List>
              {reviews &&
                reviews
                  .filter((item) => item.type == type)
                  .map((val, index) => (
                    <div key={index}>
                      <ListItem
                        sx={{
                          alignItems: "stretch",
                        }}
                      >
                        <ListItemAvatar sx={{}}>
                          <Avatar
                            src={`${process.env.REACT_APP_URL}image/profile/${val.image}`}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Stack direction="row" alignItems="center">
                              <Typography
                                component={"span"}
                                variant="subtitle1"
                                sx={{ flexGrow: 0.02 }}
                              >
                                {val.firstname + " "}
                              </Typography>
                              <Stack direction="row" alignItems="flex-start">
                                <StarRate
                                  sx={{ color: amber[600] }}
                                  fontSize="small"
                                />
                                <Typography
                                  component={"span"}
                                  variant="subtitle1"
                                  sx={{ display: "flex" }}
                                >
                                  {val.rating}
                                </Typography>
                              </Stack>
                            </Stack>
                          }
                          secondary={
                            <Fragment>
                              {dayjs(val.date).format("MMM DD, YYYY")}
                              <br />
                              <Typography
                                component={"span"}
                                sx={{ display: "inline" }}
                                variant="body2"
                                color="text.secondary"
                              >
                                {"- " + val.message}
                              </Typography>
                            </Fragment>
                          }
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </div>
                  ))}
            </List>
            <br />
          </Card>
        )}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default ReviewCard;
