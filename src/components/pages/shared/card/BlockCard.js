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
  CardMedia,
} from "@mui/material";
import { Apple, Image } from "@mui/icons-material";
import { Box } from "@mui/system";
import Themplates from "../theme";

const theme = createTheme(Themplates);

const useStyles = makeStyles(() => ({
  card: {
    width: "100%",
    textAlign: "center",
    // "& :hover::before": {},
    boxShadow: "0 0 1px 1px D0D3D4",
    border: "1px solid #D0D3D4",

    "& :hover": {
      "&  .icon": {
        transition: ".5s",
        transform: "scale(1.10)",
      },
    },

    // "& :hover": {
    //   "& .media": {
    //     backgroundColor: "#b8b8b8",
    //     transition: ".5s",
    //     transform: "scale(1.10)",
    //   },
    // },

    cursor: "pointer",
  },
}));

const BlockCard = ({ name, link }) => {
  const classes = useStyles();
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Card className={classes.card}>
          <CardMedia
            className={`media`}
            sx={{
              display: "flex",
              alignItems: "center",
              height: "120px",
              justifyContent: "center",
              border: "1px solid #b8b8b8",
              margin: "20px",
              borderRadius: "10px",
            }}
          >
            <Apple className={`icon`} sx={{ fontSize: "5rem" }} />
          </CardMedia>
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
        </Card>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default BlockCard;
