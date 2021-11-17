import React from "react";
import {
  AssignmentTurnedIn,
  Favorite,
  FavoriteBorder,
  Star,
  StarOutline,
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
  Avatar,
} from "@mui/material";
import { amber, green } from "@mui/material/colors";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { Box, fontSize } from "@mui/system";

const theme = createTheme({});

const useStyles = makeStyles(() => ({
  root: {
    margin: "1rem",
    width: "100%",
    height: "auto",
  },
  coverMedia: {
    position: "relative",
    // height: "25vh",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fff",
    // borderBottom: "1px solid",
    // borderTop: "1px solid",
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
  avatar: {
    position: "absolute",
    top: "4px",
    right: "4px",
    textAlign: "center",
  },
}));

const PackageCard = (props) => {
  const classes = useStyles();
  const { image, name, property, count, total, class_, rating, path, id } =
    props;
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Card className={classes.root}>
          <CardActionArea href={`${path}/${id}`}>
            <Box className={classes.coverMedia}>
              <Avatar
                className={classes.avatar}
                sx={{ bgcolor: amber[500], height: 48, width: 48 }}
              >
                <Box sx={{ fontWeight: "600", fontSize: "1.5rem" }}>
                  {class_}
                </Box>
              </Avatar>
              <CardMedia
                className={classes.cardMedia}
                component="img"
                image={image}
              />
            </Box>
          </CardActionArea>
          <CardContent className={classes.cardContent}>
            <Typography variant="h6" gutterBottom>
              Package {name}
            </Typography>
            <Typography component="span" variant="body2" color="text.secondary">
              {property &&
                property.slice(0, 3).map((val, index) => (
                  <Box sx={{ display: "flex" }} key={index}>
                    <Box
                      sx={{
                        marginLeft: "0.25rem",
                        flexGrow: 0.05,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <AssignmentTurnedIn
                        sx={{
                          color: green[500],
                          fontSize: "1rem",
                        }}
                      />
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                      {val.type} {"  "}
                      {(index == 2) & (property.length > 3) && " (Other)"}
                    </Box>
                    {val.price}
                  </Box>
                ))}
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
          <CardActions sx={{ display: "flex" }}>
            {/* <Box sx={{ flexGrow: 1 }}>ซื้อแล้ว {count}</Box> */}
            <IconButton>
              <FavoriteBorder />
            </IconButton>
            <Box sx={{ flexGrow: 1 }} />
            <Button
              variant="text"
              size="small"
              color="success"
              sx={{ color: "black", fontSize: "1rem", fontWeight: "600" }}
            >
              $ {total}
            </Button>
          </CardActions>
        </Card>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default PackageCard;
