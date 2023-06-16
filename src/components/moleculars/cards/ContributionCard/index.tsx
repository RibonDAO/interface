import useNavigation from "hooks/useNavigation";
import { formatPrice } from "lib/formatters/currencyFormatter";
import { useTranslation } from "react-i18next";
import * as S from "./styles";

export type Props = {
  description: string;
  value: number;
  offerId: number;
  nonProfitId: number;
};

function ContributionCard({
  description,
  value,
  offerId,
  nonProfitId,
}: Props): JSX.Element {
  const { navigateTo } = useNavigation();
  const { t } = useTranslation("translation", {
    keyPrefix: "contributionCard",
  });

  const handleClickedDonationButton = () => {
    navigateTo({
      pathname: "/promoters/support-non-profit",
      state: { value, offerId, nonProfitId },
    });
  };
  return (
    <S.Container>
      <S.Title>{t("title")}</S.Title>
      <S.Value>{formatPrice(value, "brl")}</S.Value>
      <S.Description>{description}</S.Description>
      <S.DonationButton onClick={() => handleClickedDonationButton()}>
        {t("button")}
      </S.DonationButton>
    </S.Container>
  );
}

export default ContributionCard;
