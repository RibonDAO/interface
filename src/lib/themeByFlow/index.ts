import theme from "styles/theme";

const { tertiary } = theme.colors.brand;

const pageThemes: any = {
  cause: {
    shade10: theme.colors.orange10,
    shade20: theme.colors.orange20,
    shade30: theme.colors.orange30,
    shade40: theme.colors.orange40,
  },
  nonProfit: {
    shade10: tertiary.colorBrandTertiary50,
    shade20: theme.colors.red20,
    shade30: theme.colors.red30,
    shade40: theme.colors.red40,
  },
};

export default function getThemeByFlow(flow: string) {
  return pageThemes[flow];
}
