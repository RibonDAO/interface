import theme from "styles/theme";

const { secondary, tertiary } = theme.colors.brand;

const pageThemes: any = {
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
