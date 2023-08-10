import theme from "styles/theme";

const { primary, secondary, tertiary } = theme.colors.brand;

const pageThemes: any = {
  free: {
    shade10: primary[50],
    shade20: primary[200],
    shade30: primary[400],
    shade40: primary[800],
  },
  cause: {
    shade10: secondary[200],
    shade20: secondary[300],
    shade30: secondary[400],
    shade40: secondary[700],
  },
  nonProfit: {
    shade10: tertiary[50],
    shade20: tertiary[200],
    shade30: tertiary[400],
    shade40: tertiary[800],
  },
};

export default function getThemeByFlow(flow: string) {
  return pageThemes[flow] || pageThemes.cause;
}
