import { theme } from "@ribon.io/shared/styles";
import InfoBanner from "components/moleculars/banners/InfoBanner";

export type Props = {
  integration: {
    name: string;
    image: string;
  }
};

function IntegrationBanner({ integration }: Props): JSX.Element {
  return (
    <InfoBanner
      title={{
        text: `Ribon +  ${integration.name}`,
        size: "large",
        color: theme.colors.brand.primary[900],
        stylized: true,
      }}
      squareImage={integration.image}
      text={`Doe aqui na Ribon o ticket que você recebeu de ${integration.name}`}
      textColor={theme.colors.neutral[900]}
      backgroundColor={theme.colors.brand.primary[50]}
    />
  );
}

export default IntegrationBanner;
