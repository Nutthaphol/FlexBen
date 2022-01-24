import React from "react";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Themplates from "../../shared/theme";
import { Avatar, IconButton, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Email, Facebook, Phone } from "@mui/icons-material";

const theme = createTheme(Themplates);
const useStyles = makeStyles(() => ({
  cardDark: {
    backgroundColor: "#121212",
    color: "#fff",
    backgroundImage:
      "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
    width: "100%",
    padding: "1rem",
    boxShadow:
      "0 15px 25px rgb(255 255 255 / 16%), 0 10px 25px rgb(255 255 255 / 30%)",
    textAlign: "center",
  },
  iconButton: {
    backgroundColor: "#fff",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.08)",
      color: "#3c52b2",
    },
  },
  knot: {
    position: "absolute",
    height: "75px",
    width: "75px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    top: "25px",
  },
}));
const RankCard = (props) => {
  const { themes, imageProfile, primaryText, secondaryText, labelText, rank } =
    props;
  const classes = useStyles();
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Paper
          className={themes == "dark" ? classes.cardDark : classes.cardLight}
        >
          <Box
            className={classes.knot}
            sx={{
              backgroundImage: `url(${
                process.env.PUBLIC_URL
              }/assets/icons/rank/${
                rank == 1 ? "first.svg" : rank == 2 ? "second.svg" : "third.svg"
              })`,
            }}
          ></Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              margin: "1rem 0",
            }}
          >
            <Avatar sx={{ height: 80, width: 80 }} src={imageProfile} />
          </Box>
          <Typography variant="h6" component="div">
            {primaryText}
          </Typography>
          <br />
          <Typography
            variant="body2"
            component="div"
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {secondaryText}
          </Typography>
          <br />
          <Typography variant="h6" component="div">
            {labelText}
          </Typography>
          <br />
          <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
            <IconButton className={classes.iconButton} size="small">
              <Facebook sx={{ color: "#4267B2" }} />
            </IconButton>
            <IconButton className={classes.iconButton} size="small">
              <Phone sx={{ color: "#4267B2" }} />
            </IconButton>
            <IconButton className={classes.iconButton} size="small">
              <Email sx={{ color: "#4267B2" }} />
            </IconButton>
          </Box>
        </Paper>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default RankCard;
