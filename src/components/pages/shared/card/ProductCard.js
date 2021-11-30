import { Favorite, FavoriteBorder, Star } from "@mui/icons-material";
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
} from "@mui/material";
import { amber } from "@mui/material/colors";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React from "react";
import Themplates from "../theme";

const theme = createTheme(Themplates);

const useStyles = makeStyles(() => ({
  root: {
    margin: "1rem",
    // width: "100%",
    height: "auto",
  },
  coverMedia: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  cardMedia: {
    height: "12rem",
    width: "100%",
  },
  cardContent: {
    position: "relative",
    paddingBottom: 0,
  },
  typograpphy: {
    fontWeight: "400",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
}));

const ProductCard = (props) => {
  const { image, head, price, name, id, path, rating, count, type } = props;
  const classes = useStyles();
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Card className={classes.root}>
          <CardActionArea href={`${path}/${id}`}>
            <Box className={classes.coverMedia}>
              <CardMedia
                className={classes.cardMedia}
                component="img"
                image={image}
              />
            </Box>
          </CardActionArea>
          <CardContent className={classes.cardContent}>
            <Typography className={classes.typograpphy} variant="h6">
              {name.replace("Insurance", "").toUpperCase()}
            </Typography>
            <Typography
              component="span"
              // className={classes.typograpphy}
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
              {head}
            </Typography>
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
              <Icon
                sx={{
                  marginRight: "5px",

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
              {price}
            </Button>
          </CardActions>
        </Card>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default ProductCard;
