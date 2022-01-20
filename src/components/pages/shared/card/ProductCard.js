import {
  AssignmentTurnedIn,
  Favorite,
  FavoriteBorder,
  Star,
} from "@mui/icons-material";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
  Paper,
  Chip,
  Link,
  IconButton,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { amber } from "@mui/material/colors";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import reviewService from "../../../../services/review.service";
import Themplates from "../theme";

const theme = createTheme(Themplates);

const useStyles = makeStyles(() => ({
  root: {
    // margin: "1rem",
    // width: "100%",
    height: "auto",
    boxShadow: "rgb(3 0 71 / 9%) 0px 1px 3px",
    borderRadius: "16px",
  },
  coverMedia: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#fff",
    height: "16rem",
    "&:hover": {
      background: "none",
    },
  },
  cardMedia: {
    height: "12rem",
    // padding: "1rem",
    background: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cardContent: {
    position: "relative",
    paddingBottom: 0,
    borderBottom: "1px solid rgb(224, 224, 224)",
  },
  typograpphy: {
    fontWeight: "400",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  imageDisplay: {
    textAlign: "center",
    height: "100%",
    width: "auto",
  },
}));

const ProductCard = (props) => {
  const {
    image = "",
    secondaryText = false,
    price = NaN,
    primaryText = "",
    id,
    path,
    count,
    type,
    listDetail = false,
    rating_ = null,
    currency = "icon",
  } = props;

  const [rating, setRating] = useState(rating_);

  useEffect(async () => {
    if (rating == null) {
      const review = await reviewService.getAllReviews().then((response) => {
        return response.data;
      });

      const compRating = () => {
        let rating = 0;
        let count = 0;
        if (review) {
          review
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
      setRating(avgRat);
    }
  }, [rating]);

  const classes = useStyles();
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Card className={classes.root}>
          <CardActionArea href={`${path}/${id}`}>
            <Box className={classes.coverMedia}>
              <img src={`${image}`} className={classes.imageDisplay} />
            </Box>
          </CardActionArea>
          <CardContent className={classes.cardContent}>
            <Typography className={classes.typograpphy} variant="h6">
              {primaryText.replace("Insurance", "").toUpperCase()}
            </Typography>
            {secondaryText && (
              <Typography
                component="span"
                sx={{
                  display: "-webkit-box",
                  overflow: "hidden",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                  height: "2.5rem",
                }}
                variant="body2"
                color="text.secondary"
              >
                {secondaryText}
              </Typography>
            )}
            {listDetail && (
              <List sx={{ width: "100%" }}>
                {listDetail.slice(0, 3).map((val, index) => (
                  <ListItem
                    disablePadding
                    key={index}
                    secondaryAction={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="subtitle1" component="span">
                          {val.limitCoin}
                        </Typography>

                        <Icon fontSize="small" sx={{ marginLeft: "10px" }}>
                          <img
                            width="100%"
                            src={`${process.env.PUBLIC_URL}/assets/Icons/Coin.svg`}
                          />
                        </Icon>
                      </Box>
                    }
                  >
                    <ListItemIcon sx={{ margin: 0, minWidth: "25px" }}>
                      <AssignmentTurnedIn fontSize="small" color="success" />
                    </ListItemIcon>
                    <ListItemText
                      secondary={<Typography>{val.name}</Typography>}
                    />
                  </ListItem>
                ))}
              </List>
            )}
            <Typography
              variant="subtitle1"
              sx={{ marginTop: "0.5rem", color: amber[900] }}
            >
              <Box sx={{ display: "flex" }}>
                <Star sx={{ color: amber[500], marginRight: "0.25rem" }} />
                {"     "}
                {rating}
                {"     "}
                <Box sx={{ color: "rgb(0,0,0,0.5)", marginLeft: "0.25rem" }}>
                  ({count / 1000} k)
                </Box>
              </Box>
            </Typography>
          </CardContent>

          <CardActions>
            <IconButton>
              <FavoriteBorder />
            </IconButton>
            <Box sx={{ flexGrow: 1 }} />
            <Button
              variant="text"
              sx={{
                color: "black",
                fontSize: "1rem",
                fontWeight: "600",
                alignItems: "center",
              }}
              color="success"
              size="small"
              href={`${path}/${id}`}
            >
              {currency == "icon" ? (
                <Icon
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                  fontSize="small"
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/icons/Coin.svg`}
                    width="100%"
                    height="auto"
                  />
                </Icon>
              ) : (
                currency
              )}
              <Box component="span" sx={{ marginRight: "5px" }} />
              {price}
            </Button>
          </CardActions>
        </Card>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default ProductCard;
