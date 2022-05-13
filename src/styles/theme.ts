export interface Breakpoint {
  mobile: string;
  mobileMedium: string;
  pad: string;
  desktop: string;
}

interface ThemeType {
  breakpoints: Breakpoint;
  [key: string]: any;
}

const theme: ThemeType = {
  grid: {},
  border: {},
  font: {
    family: "Lato",
    light: 300,
    normal: 400,
    bold: 600,
    sizes: {},
  },
  colors: {
    ribonBlue: "#00CDB4",
    ribonBlack: "#185669",
    darkGray: "#82AABE",
    lightGray: "#D9E5EB",
    gray: "#C4C4C4",
    bgGray: "#FBFBFD",
    lgRed: "#EF5350",
    eaBlue: "#00B5BF",
    phcYellow: "#FFB300",
    sciGreen: "#6DC100",
    ribonWhite: "#FBFBFD",
    phcYellow2: "#FF8F00",
    ribonTransparent: "rgba(255, 255, 255, 0)",
    ribonShadow: "rgba(24, 86, 105, 0.15)",
    modalBackground: "rgba(24, 86, 105, 0.6)",
  },
  spacings: {},
  breakpoints: {
    mobile: "0px",
    mobileMedium: "374px",
    pad: "600px",
    desktop: "1024px",
  },
};

export default theme;
