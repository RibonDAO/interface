import { Integration } from "@ribon.io/shared/types";
import { theme } from "@ribon.io/shared/styles";
import InfoBanner from "components/moleculars/banners/InfoBanner";

export type Props = {
  integration: Integration | undefined
};

function IntegrationBanner({ integration }: Props): JSX.Element {
  return (
    <InfoBanner
      title={{
        text: `Ribon +  ${integration?.name}`,
        size: "large",
        color: theme.colors.brand.primary[900],
        stylized: true,
      }}
      squareImage={integration?.logo}
      text={`Doe aqui na Ribon o ticket que você recebeu de ${integration?.name}`}
      textColor={theme.colors.neutral[900]}
      backgroundColor={theme.colors.brand.primary[50]}
    />
  );
}

export default IntegrationBanner;
