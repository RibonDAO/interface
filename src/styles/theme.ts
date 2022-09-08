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
    semibold: 600,
    bold: 700,
    sizes: {},
  },
  colors: {
    mediumGreen: "#00DA93",
    darkGray: "#28241C",
    mediumGray: "#867F70",
    lightGray: "#D4CEC3",
    xLightGray: "#F2F2F0",
    white: "#FFFFFF",
    mediumRed: "#FF6B6F",
    mediumYellow: "#FF8F00",
    transparent: "rgba(255, 255, 255, 0)",
    lightShadow: "rgba(24, 86, 105, 0.15)",
    darkShadow: "rgba(192, 192, 192, 0.75)",
    modalBackground: "rgba(40, 36, 28, 0.6)",
  },
  zindex: {
    base: 0,
    above: 1,
    below: -1,
    dropdown: 2,
    navbar: 3,
    modal: 4,
    toast: 5,
    loading: 6,
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
