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

const getSpacing = (space: number): string => {
  const spacings = [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 112];

  if (!spacings.includes(space)) {
    return "0px";
  }
  return `${space}px`;
};

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
    defaultShadow: "rgba(40, 36, 28, 0.15)",
    defaultShadow10: "rgba(40, 36, 28, 0.1)",
    defaultShadow05: "rgba(40, 36, 28, 0.05)",
    backgroundOverlay: "rgba(34, 30, 22, 0.6)",
    brand: brandColors,
    neutral: neutralColors,
    feedback: feedbackColors,
  },
  icons: {
    lg: "48px",
    md: "40px",
    sm: "24px",
    xs: "20px",
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
  spacing: (top: number, right?: number, bottom?: number, left?: number) =>
    `${
      getSpacing(top) +
      (typeof right === "number" ? ` ${getSpacing(right)}` : "") +
      (typeof bottom === "number" ? ` ${getSpacing(bottom)}` : "") +
      (typeof left === "number" ? ` ${getSpacing(left)}` : "")
    }`,
  breakpoints: {
    mobile: "0px",
    mobileMedium: "374px",
    pad: "600px",
    desktop: "1024px",
  },
};

export default theme;
