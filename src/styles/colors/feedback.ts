interface ThemeType {
  [key: string]: any;
}

const feedbackColors: ThemeType = {
  success: {
    25: "#F6FEF9",
    50: "#E5FBED",
    100: "#C5F7D5",
    200: "#6DDFA6",
    300: "#00DA93",
    400: "#02B67A",
    500: "#0EA472",
    600: "#1D8158",
    700: "#086E43",
    800: "#025F39",
    900: "#00472B",
  },
  warning: {
    25: "#FFFBEB",
    50: "#FFF6CC",
    100: "#FFEDA5",
    200: "#FFCE00",
    300: "#F5B300",
    400: "#E09F00",
    500: "#C28100",
    600: "#A36A00",
    700: "#855800",
    800: "#754B00",
    900: "#613E00",
  },
  error: {
    25: "#FFFBFA",
    50: "#FFE8E6",
    100: "#FFDAD6",
    200: "#FFBDB7",
    300: "#FF968C",
    400: "#FF695C",
    500: "#E74132",
    600: "#D52F20",
    700: "#C2190A",
    800: "#B11002",
    900: "#9E0D00",
  },
  informational: {
    25: "#FAFAF9",
    50: "#F1F1EF",
    100: "#E5E2DC",
    200: "#BFBCB5",
    300: "#969188",
    400: "#7B756B",
    500: "#5E584F",
    600: "#44413B",
    700: "#302D27",
    800: "#221E16",
    900: "#221E16",
  },
};

export default feedbackColors;
