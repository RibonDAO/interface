import Card from "components/moleculars/cards/Card";
import Title from "components/moleculars/Title";
import { useTranslation } from "react-i18next";
import { theme } from "@ribon.io/shared/styles";
import Subtitle from "components/moleculars/Subtitle";
import parse from "html-react-parser";
import * as S from "./styles";

type Props = {
  totalAmountToCause: string;
};
function BoostSection({ totalAmountToCause }: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "contributionStatsPage.boostSection",
  });
  const { brand } = theme.colors;

  const icon = {
    name: "volunteer_activism",
    color: brand.primary[800],
    size: "24px",
  };

  return (
    <Card border backgroundColor="transparent">
      <S.Container>
        <S.TitleContainer>
          <Title
            title={t("title")}
            icon={icon}
            secondaryColor={brand.primary[50]}
          />
        </S.TitleContainer>
        <S.Title>
          <S.Boost>↑</S.Boost> {totalAmountToCause}
        </S.Title>
        <S.Text>{t("subtitle")}</S.Text>
        <S.TooltipCardContainer>
          <Card border={false} backgroundColor={brand.primary[50]}>
            <S.InnerCardContainer>
              <S.SubtitleContainer>
                <Subtitle
                  text={parse(
                    t("tip", {
                      amount: 10,
                    }),
                  )}
                  icon={{
                    name: "emoji_objects",
                    size: "20px",
                    color: brand.primary[800],
                  }}
                  color={brand.primary[800]}
                  secondaryColor={brand.primary[50]}
                />
              </S.SubtitleContainer>
            </S.InnerCardContainer>
          </Card>
        </S.TooltipCardContainer>
      </S.Container>
    </Card>
  );
}

export default BoostSection;
