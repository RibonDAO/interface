interface ThemeType {
  [key: string]: any;
}

const brandColors: ThemeType = {
  primary: {
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
  secondary: {
    25: "#FFF7F0",
    50: "##FFF1E5",
    100: "#FFE7D6",
    200: "#FFCAA5",
    300: "#FFA86D",
    400: "#FA7203",
    500: "#E96107",
    600: "#C94F0D",
    700: "#A83B00",
    800: "#943100",
    900: "#802600",
  },
  tertiary: {
    25: "#FDF7FC",
    50: "#FFE7FB",
    100: "#FFD6E5",
    200: "#FBB7CF",
    300: "#FF8FA9",
    400: "#FF6B6F",
    500: "#E65C6C",
    600: "#C0415B",
    700: "#AA314B",
    800: "#9A233B",
    900: "#8B183B",
  },
  quaternary: {
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
};

export default brandColors;
