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
import { Box } from "@mui/system";
import React from "react";

const theme = createTheme({
  shape: {
    borderRadius: 15,
  },
});

const useStyles = makeStyles(() => ({
  root: {
    width: 345,
    margin: "1rem",
  },
  cardMedia: {
    height: 150,
    width: "100%",
    objectFit: "cover",
    // position: "relative",
    // width: "100%",
    // height: "100%",
    // display: "none",
  },
  cardContent: {
    position: "relative",
    width: "100%",
  },
}));

const HighlightCard = (props) => {
  const { image, head, price, name } = props;
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
          <CardActions sx={{ display: "flex" }}>
            <Link
              href="profile"
              underline="none"
              style={{ width: "100%", cursor: "pointer", color: "black" }}
            >
              <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
                {name}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  display: "-webkit-box",
                  overflow: "hidden",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 1,
                }}
              >
                {head}
              </Typography>
            </Link>
            <Button
              variant="outlined"
              size="small"
              style={{ fontSize: "0.65rem" }}
              sx={{
                "& .MuiButton-root": {
                  borderRadius: "15px",
                },
              }}
            >
              {price} $
            </Button>
          </CardActions>
          {/* <CardActionArea>
            <CardMedia
              className={classes.cardMedia}
              component="img"
              image={image}
            />
          </CardActionArea>
          <CardActions>
            <CardContent className={classes.cardContent}>
              <Grid container>
                <Grid item xs={10}>
                  <Link
                    underline="none"
                    style={{ color: "black", cursor: "pointer" }}
                  >
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      style={{ fontWeight: "600" }}
                      sx={{
                        display: "-webkit-box",
                        overflow: "hidden",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 1,
                      }}
                    >
                      {name}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        display: "-webkit-box",
                        overflow: "hidden",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 1,
                      }}
                    >
                      {head}
                    </Typography>
                  </Link>
                </Grid>
                <Grid item xs={2}>
                  <Chip
                    onClick={() => console.log("click now")}
                    label={`${price} $`}
                    color="primary"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </CardActions> */}
        </Card>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default HighlightCard;
