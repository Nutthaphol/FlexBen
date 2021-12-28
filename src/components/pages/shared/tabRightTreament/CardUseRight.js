import React from "react";
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
    color: "#2F4F4F",
  },
  progress: {
    height: "10px",
    borderRadius: "16px",
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    // [`& .${linearProgressClasses.bar}`]: {
    //   borderRadius: 5,
    //   backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
    // },
  },
}));

const CardUseRight = (props) => {
  const { icon, category, describtion, cover, maxCost, expenss } = props;
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
                {describtion && (
                  <Typography
                    variant="subtitle1"
                    component="div"
                    color="text.secondary"
                  >
                    {describtion}
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
                  <Box sx={{ width: "100%", displaty: "flext" }}>
                    <LinearProgress
                      className={classes.progress}
                      variant="determinate"
                      value={cover}
                      sx={{
                        [`& .${linearProgressClasses.bar}`]: {
                          borderRadius: 5,
                          backgroundColor:
                            cover < 50
                              ? lightGreen[500]
                              : cover < 75
                              ? yellow[700]
                              : cover < 100
                              ? orange[500]
                              : red[500],
                        },
                      }}
                    />
                  </Box>
                  <Typography sx={{ margin: "10px" }} variant="subtitle1">
                    {cover}%
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
                      {maxCost && expenss ? maxCost - expenss : "-"} บาท
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
