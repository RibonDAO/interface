import { Currencies, Offer } from "@ribon.io/shared/types";
import { useTranslation } from "react-i18next";
import EditIcon from "assets/icons/edit-icon.svg";
import { useCardGivingFees } from "@ribon.io/shared/hooks";
import { GivingFeesLoader } from "./loader";
import * as S from "./styles";

export type Props = {
  currentOffer?: Offer;
  priceValue?: string;
  onEditClick?: () => void;
};

function PriceSelection({
  currentOffer,
  priceValue,
  onEditClick,
}: Props): JSX.Element {
  const { cardGivingFees } = useCardGivingFees(
    currentOffer?.priceValue || 0,
    currentOffer?.currency.toUpperCase() as Currencies,
  );

  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.paymentPageV2",
  });

  const isUSD = currentOffer && currentOffer.currency === "usd";
  const price = currentOffer?.price || `${priceValue} USDC`;

  const renderGivingFees = () => {
    if (!currentOffer) return null;
    if (!cardGivingFees) return <GivingFeesLoader />;

    return (
      <>
        <S.SmallTextInfoWrapper>
          <S.SmallTextInfo>
            {t("netDonation")}
            {cardGivingFees?.netGiving}
          </S.SmallTextInfo>
          <S.SmallTextInfo>
            {t("serviceFees")}
            {cardGivingFees?.serviceFees}
          </S.SmallTextInfo>
        </S.SmallTextInfoWrapper>
        {!isUSD && <S.SmallTextInfo>{t("additionalFeesText")}</S.SmallTextInfo>}
      </>
    );
  };

  return (
    <S.Container>
      <S.Offer>
        {price}
        <S.EditButton onClick={onEditClick} type="button">
          <img src={EditIcon} alt="Edit" />
        </S.EditButton>
      </S.Offer>
      {renderGivingFees()}
    </S.Container>
  );
}

export default PriceSelection;
