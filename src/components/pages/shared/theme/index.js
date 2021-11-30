import SukhumvitSet from "./SukhumvitSet.ttc";

const Themplates = {
  typography: {
    // fontFamily: "sukhumvit",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  components: {
    // MuiCssBaseline: {
    //   styleOverrides: `
    //     @font-face {
    //       font-family: 'Raleway';
    //       font-style: normal;
    //       font-display: swap;
    //       font-weight: 400;
    //       src: local('Sukhumvit'), local('SukhumvitSet'), url(${SukhumvitSet}) format('ttc');
    //       unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
    //     }
    //   `,
    // },
    // MuiPaper: {
    //   styleOverrides: {
    //     root: {
    //       // padding: "1rem",
    //       boxShadow: "none",
    //       border: "1px solid #D0D3D4",
    //     },
    //   },
    // },
  },
};

export default Themplates;
