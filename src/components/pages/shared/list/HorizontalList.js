import React from "react";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Card,
  CardActionArea,
  Typography,
} from "@mui/material";
import { Apple, Image } from "@mui/icons-material";

const theme = createTheme();

const useStyles = makeStyles(() => ({
  card: {
    textAlign: "center",
    "& :hover::before": {},
    "& :hover": {
      transition: ".5s",
      transform: "scale3d(1.05, 1.05, 1)",
      //       color: "blue",
    },
  },
}));

const HorizontalList = ({ name, link }) => {
  const classes = useStyles();
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Card className={classes.card}>
            <CardActionArea>
              <Apple sx={{ fontSize: "5rem" }} />
              <Typography
                variant="subtitle1"
                gutterBottom
                style={{
                  display: "-webkit-box",
                  overflow: "hidden",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 1,
                }}
              >
                {name}
              </Typography>
            </CardActionArea>
          </Card>
        </Grid>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default HorizontalList;
