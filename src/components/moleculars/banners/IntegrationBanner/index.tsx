import { Integration } from "@ribon.io/shared/types";
import { theme } from "@ribon.io/shared/styles";
import InfoBanner from "components/moleculars/banners/InfoBanner";
import { useTranslation } from "react-i18next";
import Avatar from "assets/images/avatar.svg";

export type Props = {
  integration: Integration | undefined;
};

function IntegrationBanner({ integration }: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "layouts.integrationBanner",
  });
  const integrationName = integration?.name;
  const hasCustomBanner =
    integration?.bannerTitle && integration?.bannerDescription;

  const title = hasCustomBanner
    ? integration?.bannerTitle
    : t("title", { integrationName });
  const description = hasCustomBanner
    ? integration?.bannerDescription
    : t("text", { integrationName });

  return (
    <InfoBanner
      title={{
        text: title as string,
        size: "large",
        color: theme.colors.brand.primary[900],
        stylized: true,
      }}
      squareImage={integration?.logo || Avatar}
      text={description}
      textColor={theme.colors.neutral[900]}
      backgroundColor={theme.colors.brand.primary[50]}
    />
  );
}

export default IntegrationBanner;
