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
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import reviewService from "../../../../services/review.service";
import userService from "../../../../services/user.service";
import dayjs from "dayjs";
import { StarRate } from "@mui/icons-material";
import { amber } from "@mui/material/colors";

const theme = createTheme();

const useStyles = makeStyles(() => ({
  root: {
    padding: "1rem",
    boxShadow: "none",
    border: "1px solid #404040",
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
            <Box sx={{ display: "flex", alignItem: "center" }}>
              <Typography
                component={"span"}
                variant="h5"
                gutterBottom
                sx={{ flexGrow: 1 }}
              >
                Reviews
              </Typography>
              <Box sx={{ display: "flex", alignItem: "center" }}>
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
              </Box>
            </Box>
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
                            <Box sx={{ display: "flex", alignItems: "normal" }}>
                              <Typography
                                component={"span"}
                                variant="subtitle1"
                                sx={{ flexGrow: 0.02 }}
                              >
                                {val.firstname + " "}
                              </Typography>
                              <Typography
                                component={"span"}
                                variant="subtitle1"
                                sx={{ display: "flex" }}
                              >
                                {val.rating}
                                <Box sx={{ flexGrow: 0.01 }} />
                                <StarRate sx={{ color: amber[600] }} />
                              </Typography>
                            </Box>
                          }
                          secondary={
                            <Fragment>
                              {dayjs(val.date).format("MMM DD, YYYY")}
                              <br />
                              <Typography
                                component={"span"}
                                sx={{ display: "inline" }}
                                variant="subtitle1"
                                color="text.primary"
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
