import React, { useEffect } from "react";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import Themplates from "../theme";
import { makeStyles } from "@mui/styles";
import {
  Box,
  Grid,
  Icon,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  blue,
  blueGrey,
  lightGreen,
  orange,
  red,
  yellow,
} from "@mui/material/colors";
import { ThumbDown, Visibility } from "@mui/icons-material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

const theme = createTheme(Themplates);

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
  progress: {
    height: "10px",
    borderRadius: "16px",
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
    },
  },
}));

const CardUseRight = (props) => {
  const { icon, category, description, method, usedP, final, unit } = props;
  const classes = useStyles();

  useEffect(() => {}, []);

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
                xs={12}
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
                xs={12}
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
                xs={12}
                lg={2}
                sx={{ textAlign: "center", paddingLife: "0px" }}
              >
                <Typography
                  className={classes.mainText}
                  variant="h5"
                  component="div"
                >
                  {category}
                </Typography>
                {description && (
                  <Typography
                    variant="subtitle1"
                    component="div"
                    className={classes.subText}
                  >
                    {description}
                  </Typography>
                )}
              </Grid>
              <Grid
                item
                xs={12}
                lg={4}
                sx={{ textAlign: "center", paddingLife: "0px" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Tooltip title="เปอร์เซ็นการใช้งาน">
                    <Box sx={{ width: "100%", displaty: "flext" }}>
                      <LinearProgress
                        className={classes.progress}
                        variant="determinate"
                        value={usedP}
                        sx={{
                          [`& .${linearProgressClasses.bar}`]: {
                            borderRadius: 5,
                            backgroundColor:
                              usedP < 50
                                ? lightGreen[500]
                                : usedP < 75
                                ? yellow[700]
                                : usedP < 100
                                ? orange[500]
                                : red[500],
                          },
                        }}
                      />
                    </Box>
                  </Tooltip>
                  <Typography
                    sx={{ margin: "10px" }}
                    variant="subtitle1"
                    className={classes.subText}
                  >
                    {usedP.toFixed(2)}%
                  </Typography>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                lg={3}
                sx={{ textAlign: "center", paddingLife: "0px" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ThumbDown
                    fontSize="large"
                    sx={{ marginRight: "10px", color: "#DCDCDC" }}
                  />
                  <Tooltip title="ความคุ้มครองคงเหลือ">
                    <Typography
                      className={classes.mainText}
                      variant="h5"
                      component="div"
                    >
                      {final + " " + unit}
                    </Typography>
                  </Tooltip>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
};

export default CardUseRight;
