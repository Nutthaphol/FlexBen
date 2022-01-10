import React, { useRef, useState } from "react";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Themplates from "../../shared/theme";
import {
  Dialog,
  DialogContent,
  Icon,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Analytics, BarChart, Circle, Timeline } from "@mui/icons-material";
import ReactApexChart from "react-apexcharts";

const theme = createTheme(Themplates);

const useStyles = makeStyles(() => ({
  root: {
    position: "relative",
    boxShadow: "none",
    border: "1px solid LightGray",
    contain: "content",
    padding: "1rem",
    minHeight: "160px",
    display: "flex",
    flexDirection: "column",
  },
}));

const CardHealthCheckDetail = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const { data } = props;

  const opsions = {
    chart: {
      type: "area",
      toolbar: { show: false },
    },
    xaxis: {
      categories: [2018, 2019, 2020, 2021, 2022],
    },
  };

  const series = [
    {
      name: data.section,
      data: [0, 2, 3, -1, 1],
    },
  ];

  const handleOnClickOpen = () => {
    setOpen(true);
  };

  const handleOnClickClose = () => {
    setOpen(false);
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Paper className={classes.root}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "flex-start",
              flexGrow: 0.5,
            }}
          >
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ fontWeight: "700", color: "SlateGray" }}
            >
              {data.section}
            </Typography>
            <IconButton
              sx={{
                borderRadius: "4px",
                boxShadow: "rgb(3 0 71 / 20%) 0px 1px 4px",
                color: "CornflowerBlue",
                padding: 0,
              }}
              onClick={() => handleOnClickOpen()}
            >
              <BarChart fontSize="large" />
            </IconButton>
          </Box>
          <Box sx={{ textAlign: "center", flexGrow: 1.5 }}>
            <Icon
              sx={{
                width: "64px",
                height: "64px",
                margin: "0.90rem",
                padding: "0.10rem",
                background: "Lavender",
                borderRadius: "4px",
              }}
            >
              <img
                src={`${process.env.PUBLIC_URL}/assets/icons/${data.icon}`}
                width="100%"
              />
            </Icon>
            <Typography
              variant="h5"
              sx={{ fontWeight: "800", color: "DarkSlateGray" }}
              color="info"
            >
              {data.value} {data.unit}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {data.standard}
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center", flexGrow: 0.5 }}>
            {data.status == 1 ? (
              <Typography
                variant="subtitle2"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "LimeGreen",
                }}
              >
                <Circle fontSize="small" sx={{ marginRight: "0.5rem" }} />
                อยู่ในเกณฑ์มาตรฐาน
              </Typography>
            ) : data.status == 2 ? (
              <Typography
                variant="subtitle2"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "Gold",
                }}
              >
                <Circle fontSize="small" sx={{ marginRight: "0.5rem" }} />
                อยู่ในเกณฑ์เสี่ยงมาตรฐาน
              </Typography>
            ) : data.status == 3 ? (
              <Typography
                variant="subtitle2"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "Crimson",
                }}
              >
                <Circle fontSize="small" sx={{ marginRight: "0.5rem" }} />
                ไม่อยู่ในเกณฑ์มาตรฐาน
              </Typography>
            ) : (
              ""
            )}
          </Box>
        </Paper>
        <Dialog
          open={open}
          onClose={() => handleOnClickClose()}
          fullWidth
          maxWidth="sm"
        >
          <DialogContent>
            <ReactApexChart options={opsions} series={series} type="area" />
          </DialogContent>
        </Dialog>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default CardHealthCheckDetail;
