import SukhumvitSet from "./SukhumvitSet.ttc";
import typography from "./typography";
import Poppins from "./Poppins/Poppins-Regular.ttf";
import Kanit from "./Kanit/Kanit-Regular.ttf";
import { alpha } from "@mui/material";
// -------------------------------------------------------------------

const Themplates = {
  palette: {
    primary: {
      lighter: "#0DFEFB",
      light: "#0BAEE6",
      main: "#007afc",
      dark: "#0B3BE6",
      darker: "#170DFE",
      contrastText: "#fff",
    },
    secondary: {
      lighter: "#D6E4FF",
      light: "#84A9FF",
      main: "#3366FF",
      dark: "#1939B7",
      darker: "#091A7A",
      contrastText: "#fff",
    },
    info: {
      lighter: "#D0F2FF",
      light: "#74CAFF",
      main: "#1890FF",
      dark: "#0C53B7",
      darker: "#04297A",
      contrastText: "#fff",
    },
    success: {
      lighter: "#E9FCD4",
      light: "#AAF27F",
      main: "#54D62C",
      dark: "#229A16",
      darker: "#08660D",
      contrastText: "#fff",
    },
    warning: {
      lighter: "#FFF7CD",
      light: "#FFE16A",
      main: "#FFC107",
      dark: "#B78103",
      darker: "#7A4F01",
      contrastText: "#000",
    },
    error: {
      lighter: "#FFE7D9",
      light: "#FFA48D",
      main: "#FF4842",
      dark: "#B72136",
      darker: "#7A0C2E",
      contrastText: "#fff",
    },
    grey: {
      0: "#FFFFFF",
      100: "#F9FAFB",
      200: "#F4F6F8",
      300: "#DFE3E8",
      400: "#C4CDD5",
      500: "#919EAB",
      600: "#637381",
      700: "#454F5B",
      800: "#212B36",
      900: "#161C24",
      500_8: alpha("#919EAB", 0.08),
      500_12: alpha("#919EAB", 0.12),
      500_16: alpha("#919EAB", 0.16),
      500_24: alpha("#919EAB", 0.24),
      500_32: alpha("#919EAB", 0.32),
      500_48: alpha("#919EAB", 0.48),
      500_56: alpha("#919EAB", 0.56),
      500_80: alpha("#919EAB", 0.8),
    },
  },
  typography: { ...typography },
  shodows: {
    z1: "rgb(145 158 171 / 16%) 0px 1px 2px 0px",
    z8: "rgb(145 158 171 / 16%) 0px 8px 16px 0px",
    z12: "rgb(145 158 171 / 16%) 0px 12px 24px -4px",
    z16: "rgb(145 158 171 / 16%) 0px 16px 32px -4px",
    z20: "rgb(145 158 171 / 16%) 0px 20px 40px -4px",
    z24: "rgb(145 158 171 / 16%) 0px 24px 48px 0px",
    z24: "rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px",
    z24: "rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) -20px 20px 40px -4px",
    z24: "rgb(0 0 0 / 24%) -40px 40px 80px -8px",
    card: "rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px",
    dropdown:
      "rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) -20px 20px 40px -4px",
    dialog: "rgb(0 0 0 / 24%) -40px 40px 80px -8px",
    primary: "rgb(253 169 45 / 24%) 0px 8px 16px 0px",
    secondary: "rgb(51 102 255 / 24%) 0px 8px 16px 0px",
    info: "rgb(24 144 255 / 24%) 0px 8px 16px 0px",
    success: "rgb(84 214 44 / 24%) 0px 8px 16px 0px",
    warning: "rgb(255 193 7 / 24%) 0px 8px 16px 0px",
    error: "rgb(255 72 66 / 24%) 0px 8px 16px 0px",
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          // backgroundColor: "rgb(255, 255, 255)",
          color: "rgb(33, 43, 54)",
          transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          overflow: "hiddin",
          position: "relative",
          boxShadow:
            "rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px",
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
  },
};

export default Themplates;
