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

const theme = createTheme({});

const useStyles = makeStyles(() => ({
  root: {
    margin: "1rem",
    width: "100%",
    height: "auto",
  },
  cardMedia: {
    height: "20vh",
    backgroundColor: "black",
    width: "100%",
    objectFit: "cover",
  },
  cardContent: {
    position: "relative",
  },
  typograpphy: {
    fontWeight: "400",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
}));

const HighlightCard = (props) => {
  const { image, head, price, name, id, path, rating } = props;
  const classes = useStyles();
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Card className={classes.root}>
          <CardActionArea href={`${path}/${id}`}>
            <CardMedia
              className={classes.cardMedia}
              component="img"
              image={image}
            />
            <CardContent className={classes.cardContent}>
              <Typography
                className={classes.typograpphy}
                variant="h6"
                component="div"
              >
                {name.replace("Insurance", "").toUpperCase()}
              </Typography>
              <Typography
                // className={classes.typograpphy}
                sx={{
                  display: "-webkit-box",
                  overflow: "hidden",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                }}
                variant="body2"
                color="text.secondary"
              >
                {head}
              </Typography>
              <Typography variant="subtitle1" sx={{ marginTop: "0.5rem" }}>
                <Box sx={{ display: "flex" }}>
                  <Star sx={{ color: amber[500], marginRight: "0.25rem" }} />
                  {"     "}
                  {rating}
                </Box>
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions sx={{ borderTop: "0.2px solid rgb(0,0,0, 0.2)" }}>
            <IconButton>
              <FavoriteBorder />
            </IconButton>
            <Box sx={{ flexGrow: 1 }} />
            <Button
              sx={{ color: "black", fontSize: "1rem" }}
              href={`${path}/${id}`}
            >
              $ {price}
            </Button>
          </CardActions>
        </Card>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default HighlightCard;
