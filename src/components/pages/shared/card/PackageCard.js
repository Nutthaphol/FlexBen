import React, { Fragment } from "react";
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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Icon,
} from "@mui/material";
import { amber, green } from "@mui/material/colors";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { Box, fontSize } from "@mui/system";
import Themplates from "../theme";

const theme = createTheme(Themplates);

const useStyles = makeStyles(() => ({
  root: {
    // margin: "1rem",
    width: "auto",
    height: "auto",
    boxShadow: "rgb(3 0 71 / 9%) 0px 1px 3px",
    borderRadius: "16px",
  },
  coverMedia: {
    position: "relative",
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
    paddingBottom: 6,
    borderBottom: "1px solid rgb(224, 224, 224)",
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
  const { image, name, property, count, price, class_, rating, path, id } =
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
            <Typography variant="h6" component="span">
              {name}
            </Typography>
            <List sx={{ width: "100%" }}>
              {property &&
                property.slice(0, 3).map((val, index) => (
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
          <CardActions
            disableSpacing
            sx={{
              display: "flex",
            }}
          >
            <IconButton>
              <FavoriteBorder />
            </IconButton>
            <Box sx={{ flexGrow: 1 }} />
            <Button
              variant="text"
              size="small"
              color="success"
              href={`${path}/${id}`}
              sx={{ color: "black", fontSize: "1rem", fontWeight: "600" }}
            >
              <Typography>$ {price}</Typography>
            </Button>
          </CardActions>
        </Card>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default PackageCard;
