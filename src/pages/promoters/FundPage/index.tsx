import { useTranslation } from "react-i18next";
import CardBlank from "components/moleculars/cards/CardBlank";
import Button from "components/atomics/Button";
import * as S from "./styles";

function FundPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.fundPage",
  });
  return (
    <S.Container>
      <S.Title>{t("title")}</S.Title>
      <S.Subtitle>{t("subtitle")}</S.Subtitle>

      <S.SectionTitle>{t("fundBalance")}</S.SectionTitle>
      <S.CardContainer>
        <CardBlank>
          <S.FundText>
            191,759.76 <S.FundTextCoin>USDC</S.FundTextCoin>
          </S.FundText>
          <Button text={t("fundSupportButtonText")} onClick={() => {}} />
        </CardBlank>
      </S.CardContainer>
    </S.Container>
  );
}

export default FundPage;
