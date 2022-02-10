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
    // MuiCssBaseline: {
    //   styleOverrides: {
    //     "@font-face": {
    //       fontFamily: "Kanit",
    //       fontStyle: "normal",
    //       fontDisplay: "swap",
    //       fontWeight: "400",
    //       src: `local('Kanit'), local('Kanit-Regular'), url(${Kanit}) format('ttf')`,
    //       unicodeRange:
    //         "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF",
    //     },
    //     "@font-face": {
    //       fontFamily: "Poppins",
    //       fontStyle: "normal",
    //       fontDisplay: "swap",
    //       fontWeight: "400",
    //       src: `local('Poppins'), local('Poppins-Regular'), url(${Poppins}) format('ttf')`,
    //       unicodeRange:
    //         "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF",
    //     },
    //   },
    // },
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
    MuiDataGrid: {
      styleOverrides: {
        columnHeadersInner: {
          backgroundColor: palette.grey[200],
          borderRadius: "8px",
        },
        cell: {
          borderBottom: "none",
        },
        root: {
          border: "none",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          "&:first-of-type": {
            borderTopLeftRadius: "16px",
            borderBottomLeftRadius: "16px",
          },
          "&:last-of-type": {
            borderTopRightRadius: "16px",
            borderBottomRightRadius: "16px",
          },
          borderBottom: "none",
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: palette.grey[200],
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
};

export default Themplates;
