import { theme } from "@ribon.io/shared/styles";
import Banner from "components/moleculars/banners/Banner";
import { useTranslation } from "react-i18next";

function InfoBanner(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "layouts.InfoBanner",
  });

  return (
    <Banner
      title={{
        text: t("title"),
        size: "large",
        color: theme.colors.brand.primary[900],
        stylized: true,
      }}
      squareImage="https://www.figma.com/file/2nXWdjQ4J4juSmHuGNLORL/Estrutura-de-integra%C3%A7%C3%A3o-no-app-nativo?type=design&node-id=653-9124&mode=design&t=9iV5Dj601W8e3GT8-4"
      text={t("text")}
      textColor={theme.colors.neutral[900]}
      backgroundColor={theme.colors.brand.primary[50]}
    />
  );
}

export default InfoBanner;

/* <Banner
      title={{
        text: t("title"),
        size: "large",
        color: theme.colors.brand.primary[900],
        stylized: true,
      }}
      squareImage="https://www.figma.com/file/2nXWdjQ4J4juSmHuGNLORL/Estrutura-de-integra%C3%A7%C3%A3o-no-app-nativo?type=design&node-id=653-9124&mode=design&t=9iV5Dj601W8e3GT8-4"
      text={t("text")}
      textColor={theme.colors.neutral[900]}
      backgroundColor={theme.colors.brand.primary[50]}
    /> */