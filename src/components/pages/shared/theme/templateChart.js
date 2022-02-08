import { createTheme } from "@mui/system";
import Themplates from ".";

const theme = createTheme(Themplates);

const LABEL_TOTAL = {
  show: true,
  label: "Total",
  color: theme.palette.grey[900],
  ...theme.typography.subtitle1,
};

const LABEL_VALUE = {
  offsetY: 8,
  color: theme.palette.grey[600],
  ...theme.typography.h2,
};

export const defaultOption = {
  series: [],
  options: {
    chart: {
      height: 350,
      fontFamily: theme.typography.fontFamily,
      foreColor: theme.palette.grey[800],
      toolbar: { show: false },
      zoom: { enabled: false },
      type: "donut",
    },
    colors: [
      theme.palette.primary.main,
      theme.palette.chart.yellow[0],
      theme.palette.chart.red[0],
      theme.palette.chart.green[0],
      theme.palette.chart.violet[0],
      theme.palette.chart.blue[0],
    ],
    states: {
      hover: {
        filter: {
          type: "lighten",
          value: 0.04,
        },
      },
      active: {
        filter: {
          type: "darken",
          value: 0.88,
        },
      },
    },
    markers: {
      size: 0,
      strokeColors: theme.palette.background.paper,
    },
    xaxis: {
      type: "datetime",
      tickAmount: 10,
    },
    fill: {
      opacity: 1,
      gradient: {
        type: "vertical",
        shadeIntensity: 0,
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [0, 100],
      },
    },
    dataLabels: { enabled: false },
    grid: {
      show: true,
      strokeDashArray: 3,
      borderColor: theme.palette.grey[600],
    },
    yaxis: {},
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
    },

    stroke: {
      width: 3,
      curve: "smooth",
      lineCap: "round",
    },

    legend: {
      show: true,
      fontSize: 13,
      position: "top",
      horizontalAlign: "right",
      markers: {
        radius: 12,
      },
      fontWeight: 600,
      itemMargin: { horizontal: 12 },
      labels: {
        colors: theme.palette.grey[900],
      },
    },
    // plotOptions
    plotOptions: {
      // Bar
      bar: {
        columnWidth: "50%",
        borderRadius: 4,
        rangeBarOverlap: false,
        colors: {
          backgroundBarOpacity: 0.5,
        },
      },
      // Pie + Donut
      pie: {
        donut: {
          size: "90%",
          labels: {
            show: true,
            value: LABEL_VALUE,
            total: LABEL_TOTAL,
          },
        },
      },
      // Radialbar
      radialBar: {
        track: {
          strokeWidth: "100%",
          background: theme.palette.grey[500_16],
        },
        dataLabels: {
          value: LABEL_VALUE,
          total: LABEL_TOTAL,
        },
      },
      // Radar
      radar: {
        polygons: {
          fill: { colors: ["transparent"] },
          strokeColors: theme.palette.divider,
          connectorColors: theme.palette.divider,
        },
      },
      // polarArea
      polarArea: {
        rings: {
          strokeColor: theme.palette.divider,
        },
        spokes: {
          connectorColors: theme.palette.divider,
        },
      },
    },
    responsive: [
      {
        // sm
        breakpoint: theme.breakpoints.values.sm,
        options: {
          plotOptions: { bar: { columnWidth: "40%" } },
        },
      },
      {
        // md
        breakpoint: theme.breakpoints.values.md,
        options: {
          plotOptions: { bar: { columnWidth: "32%" } },
        },
      },
    ],
  },
};
