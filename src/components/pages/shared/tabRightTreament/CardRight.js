import React, { useEffect } from "react";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import {
  Button,
  Grid,
  Icon,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import Themplates from "../theme";
import { ThumbUp, Visibility } from "@mui/icons-material";
import { makeStyles, styled } from "@mui/styles";
import { blue } from "@mui/material/colors";
import { Box } from "@mui/system";

// const theme = createTheme();

const useStyles = makeStyles(() => ({
  root: {
    boxShadow: "none",
    border: "1px solid rgba(0, 0, 0, 0.12);",
    padding: "1rem",
    marginBottom: "1rem",
    backgroundColor: "rgba(255, 255, 255, 0.12)",
  },
  icon: {
    fontSize: "4rem",
    padding: "10px",
    backgroundColor: "#E0FFFF",
    borderRadius: "4px",
    // border: "4px",
  },
  mainText: {
    fontWeight: "600",
    color: "#fff",
  },
  subText: {
    color: "rgba(255, 255, 255, 0.7)",
  },
}));

const CardRight = (props) => {
  const { icon, category, description, cover, period, theme } = props;
  const classes = useStyles();

  return (
    <div>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Paper className={classes.root}>
            <Grid
              spacing={2}
              container
              justifyContent="center"
              alignItems="center"
            >
              <Grid
                item
                lg={1}
                sx={{ textAlign: "center", paddingLife: "0px" }}
              >
                <Tooltip title="View">
                  <IconButton
                    sx={{
                      borderRadius: "4px",
                      backgroundColor: blue[500],
                      "&:hover, &.Mui-focusVisible": {
                        backgroundColor: blue[400],
                      },
                    }}
                  >
                    <Visibility sx={{ color: "white" }} />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid
                item
                lg={2}
                sx={{ textAlign: "center", paddingLife: "0px" }}
              >
                <Icon className={classes.icon}>
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/icons/other/${icon}`}
                    width="100%"
                  />
                </Icon>
              </Grid>
              <Grid
                item
                lg={2}
                sx={{ textAlign: "center", paddingLife: "0px" }}
              >
                <Typography
                  className={classes.mainText}
                  variant="h5"
                  component="div"
                >
                  {category && category}
                </Typography>
                <Typography
                  variant="subtitle1"
                  component="div"
                  className={classes.subText}
                >
                  {description && description}
                </Typography>
              </Grid>
              <Grid
                item
                lg={4}
                sx={{ textAlign: "center", paddingLife: "0px" }}
              >
                <Tooltip title="คุ้มครองค่าใช้จ่ายในการกรักษาสูงสุดต่อครั้ง">
                  <Typography
                    className={classes.mainText}
                    variant="h5"
                    component="div"
                  >
                    {cover && cover}
                  </Typography>
                </Tooltip>
              </Grid>
              <Grid
                item
                lg={3}
                sx={{ textAlign: "center", paddingLife: "0px" }}
              >
                <Tooltip title="จำนวนครั้งในการคุ้มครอง">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ThumbUp
                      fontSize="large"
                      sx={{ marginRight: "10px", color: "#DCDCDC" }}
                    />
                    <Typography
                      className={classes.mainText}
                      variant="h5"
                      component="div"
                    >
                      {period && period}
                    </Typography>
                  </Box>
                </Tooltip>
              </Grid>
            </Grid>
          </Paper>
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
};

export default CardRight;
