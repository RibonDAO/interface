import theme from "styles/theme";

const { secondary, tertiary } = theme.colors.brand;

const pageThemes: any = {
  cause: {
    shade10: secondary[200],
    shade20: theme.colors.orange20,
    shade30: theme.colors.orange30,
    shade40: theme.colors.orange40,
  },
  nonProfit: {
    shade10: tertiary[50],
    shade20: tertiary[200],
    shade30: tertiary[400],
    shade40: tertiary[800],
  },
};

export default function getThemeByFlow(flow: string) {
  return pageThemes[flow];
}
