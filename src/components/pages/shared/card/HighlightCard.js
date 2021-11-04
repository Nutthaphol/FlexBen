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
} from "@mui/material";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import React from "react";

const theme = createTheme();

const useStyles = makeStyles(() => ({
  root: {
    margin: "1rem",
    //     height: "10rem",
    //     width: "21rem",
  },
  cardMedia: {
    position: "relative",
    width: "100%",
    height: "100%",
    display: "none",
  },
  cardContent: {
    position: "relative",
  },
}));

const HighlightCard = ({ image, head, price }) => {
  const classes = useStyles();
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.cardMedia}
              component="img"
              image={image}
            />
          </CardActionArea>
          <CardActions>
            <CardContent className={classes.cardContent}>
              <Grid container>
                <Grid item xs={9}>
                  <Link
                    underline="none"
                    style={{ color: "black", cursor: "pointer" }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{
                        display: "-webkit-box",
                        overflow: "hidden",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                      }}
                    >
                      {head}
                    </Typography>
                  </Link>
                </Grid>
                <Grid item xs={3} style={{ textAlign: "right" }}>
                  <Chip
                    onClick={() => console.log("click now")}
                    label={`${price} $`}
                    color="primary"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </CardActions>
        </Card>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default HighlightCard;
