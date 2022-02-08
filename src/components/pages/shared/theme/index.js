import Kanit from "./Kanit/Kanit-Regular.ttf";
import { alpha } from "@mui/material";
// -------------------------------------------------------------------
import SukhumvitSet from "./SukhumvitSet.ttc";
import Poppins from "./Poppins/Poppins-Regular.ttf";

import typography from "./typography";
import shadows, { customShadows } from "./shadows";
import palette from "./palette";
// -------------------------------------------------------------------

const Themplates = {
  // palette: {
  //   primary: {
  //     lighter: "#A2D8FE",
  //     light: "#51ACFC",
  //     main: "#007AFC",
  //     dark: "#0B55B5",
  //     darker: "#103878",
  //     contrastText: "#fff",
  //   },
  //   secondary: {
  //     lighter: "#D6E4FF",
  //     light: "#84A9FF",
  //     main: "#3366FF",
  //     dark: "#1939B7",
  //     darker: "#091A7A",
  //     contrastText: "#fff",
  //   },
  //   info: {
  //     lighter: "#D0F2FF",
  //     light: "#74CAFF",
  //     main: "#1890FF",
  //     dark: "#0C53B7",
  //     darker: "#04297A",
  //     contrastText: "#fff",
  //   },
  //   success: {
  //     lighter: "#E9FCD4",
  //     light: "#AAF27F",
  //     main: "#54D62C",
  //     dark: "#229A16",
  //     darker: "#08660D",
  //     contrastText: "#fff",
  //   },
  //   warning: {
  //     lighter: "#FFF7CD",
  //     light: "#FFE16A",
  //     main: "#FFC107",
  //     dark: "#B78103",
  //     darker: "#7A4F01",
  //     contrastText: "#000",
  //   },
  //   error: {
  //     lighter: "#FFE7D9",
  //     light: "#FFA48D",
  //     main: "#FF4842",
  //     dark: "#B72136",
  //     darker: "#7A0C2E",
  //     contrastText: "#fff",
  //   },
  //   grey: {
  //     0: "#FFFFFF",
  //     100: "#F9FAFB",
  //     200: "#F4F6F8",
  //     300: "#DFE3E8",
  //     400: "#C4CDD5",
  //     500: "#919EAB",
  //     600: "#637381",
  //     700: "#454F5B",
  //     800: "#212B36",
  //     900: "#161C24",
  //     500_8: alpha("#919EAB", 0.08),
  //     500_12: alpha("#919EAB", 0.12),
  //     500_16: alpha("#919EAB", 0.16),
  //     500_24: alpha("#919EAB", 0.24),
  //     500_32: alpha("#919EAB", 0.32),
  //     500_48: alpha("#919EAB", 0.48),
  //     500_56: alpha("#919EAB", 0.56),
  //     500_80: alpha("#919EAB", 0.8),
  //   },
  //   chart: {
  //     violet: ["#826AF9", "#9E86FF", "#D0AEFF", "#F7D2FF"],
  //     blue: ["#2D99FF", "#83CFFF", "#A5F3FF", "#CCFAFF"],
  //     green: ["#2CD9C5", "#60F1C8", "#A4F7CC", "#C0F2DC"],
  //     yellow: ["#FFE700", "#FFEF5A", "#FFF7AE", "#FFF3D6"],
  //     red: ["#FF6C40", "#FF8F6D", "#FFBD98", "#FFF2D4"],
  //   },
  // },
  palette: { ...palette },
  typography: { ...typography },
  shadows: { ...shadows },
  customShadows: { ...customShadows },
  components: {
    MuiPaper: {
      defaultProps: {
        elevation: 2,
      },
      styleOverrides: {
        root: {
          // backgroundColor: "rgb(255, 255, 255)",
          color: "rgb(33, 43, 54)",
          transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          overflow: "hiddin",
          position: "relative",
          borderRadius: "16px",
          zIndex: 0,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        "@font-face": {
          fontFamily: "Kanit",
          fontStyle: "normal",
          fontDisplay: "swap",
          fontWeight: "400",
          src: `local('Kanit'), local('Kanit-Regular'), url(${Kanit}) format('ttf')`,
          unicodeRange:
            "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF",
        },
        "@font-face": {
          fontFamily: "Poppins",
          fontStyle: "normal",
          fontDisplay: "swap",
          fontWeight: "400",
          src: `local('Poppins'), local('Poppins-Regular'), url(${Poppins}) format('ttf')`,
          unicodeRange:
            "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF",
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        bar: {
          borderRadius: 8,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "none",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
        },
      },
    },
  },
};

export default Themplates;
