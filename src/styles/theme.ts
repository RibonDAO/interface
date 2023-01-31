import brandColors from "styles/colors/brand";
import feedbackColors from "./colors/feedback";
import neutralColors from "./colors/neutral";

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
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    sizes: {},
  },
  colors: {
    neutral10: "#FFFFFF",
    green40: "#025B37",
    orange10: "#FFCAA5",
    orange20: "#FFA86D",
    orange30: "#FA7203",
    orange40: "#A83B00",
    yellow10: "#FFF6CC",
    yellow20: "#FFEC9E",
    yellow30: "#FFCE00",
    yellow40: "#754B00",
    gray10: "#F1F1EF",
    gray20: "#D2CEC6",
    gray30: "#736D64",
    gray40: "#302D27",
    defaultShadow: "rgba(40, 36, 28, 0.15)",
    defaultShadow10: "rgba(40, 36, 28, 0.1)",
    defaultShadow05: "rgba(40, 36, 28, 0.05)",
    backgroundOverlay: "rgba(40, 36, 28, 0.60)",
    brand: brandColors,
    neutral: neutralColors,
    feedback: feedbackColors,
  },
  filters: {
    filterOrange40:
      "invert(58%) sepia(6%) saturate(5888%) hue-rotate(326deg) brightness(69%) contrast(100%)",
  },
  zindex: {
    base: 0,
    above: 1,
    below: -1,
    dropdown: 2,
    navigator: 3,
    navbar: 4,
    modal: 5,
    toast: 6,
    loading: 7,

    stories: {
      base: 999,
    },
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
