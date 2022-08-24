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
    ribonBlue: "#00DA93",
    black: "#28241C",
    darkGray: "#867F70",
    lightGray: "#D4CEC3",
    bgGray: "#F2F2F0",
    hoverGray: "#F2F2F0",
    white: "#FFFFFF",
    red: "#FF6B6F",
    phcYellow2: "#FF8F00",
    ribonTransparent: "rgba(255, 255, 255, 0)",
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
