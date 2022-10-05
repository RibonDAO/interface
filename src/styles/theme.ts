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
    transparent: "rgba(255, 255, 255, 0)",
    lightShadow: "rgba(24, 86, 105, 0.15)",
    darkShadow: "rgba(192, 192, 192, 0.75)",
    modalBackground: "rgba(40, 36, 28, 0.6)",
    neutral10: "#FFFFFF",
    red10: "#FDEBFF",
    red20: "#F2A9C3",
    red30: "#FF6B6F",
    red40: "#912547",
    green10: "#D1FFDB",
    green20: "#8CE0BE",
    green30: "#00DA93",
    green40: "#025B37",
    orange10: "#FFD5BF",
    orange20: "#FF9661",
    orange30: "#FA7203",
    orange40: "#AF5333",
    yellow10: "#F0E8C2",
    yellow20: "#FFEB7A",
    yellow30: "#FFCE00",
    yellow40: "#775B33",
    gray10: "#F2F2F0",
    gray20: "#D4CEC3",
    gray30: "#867F70",
    gray40: "#28241C",
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
