import Card from "components/moleculars/cards/Card";
import Title from "components/moleculars/Title";
import { useTranslation } from "react-i18next";
import { theme } from "@ribon.io/shared/styles";
import Data from "components/moleculars/Data";
import * as S from "./styles";

type Props = {
  totalDonors: string;
  totalContributors: string;
};
function EngagementSection({
  totalDonors,
  totalContributors,
}: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "contributionStatsPage.engagementSection",
  });
  const { brand } = theme.colors;

  const icon = {
    name: "confirmation_number",
    color: brand.tertiary[800],
    size: "24px",
  };

  return (
    <Card border backgroundColor="transparent">
      <S.Container>
        <S.TitleContainer>
          <Title
            title={t("title")}
            icon={icon}
            secondaryColor={brand.tertiary[50]}
          />
        </S.TitleContainer>
        <S.ContentContainer>
          <S.DataContainer>
            <Data
              data={totalDonors}
              label={t("numberOfTicketDonors")}
              color={brand.tertiary[800]}
            />
          </S.DataContainer>
          <S.DataContainer>
            <Data
              data={totalContributors}
              label={t("numberOfContributorsDonors")}
              color={brand.tertiary[800]}
            />
          </S.DataContainer>
        </S.ContentContainer>
      </S.Container>
    </Card>
  );
}

export default EngagementSection;
