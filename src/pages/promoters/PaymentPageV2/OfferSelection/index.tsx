import { Currencies, Offer } from "@ribon.io/shared/types";
import { useTranslation } from "react-i18next";
import EditIcon from "assets/icons/edit-icon.svg";
import { useCardGivingFees } from "@ribon.io/shared/hooks";
import * as S from "./styles";
import { GivingFeesLoader } from "./loader";

export type Props = {
  currentOffer: Offer;
  handleOfferChange?: () => void;
};

function OfferSelection({
  currentOffer,
  handleOfferChange,
}: Props): JSX.Element {
  const { cardGivingFees } = useCardGivingFees(
    currentOffer.priceValue,
    currentOffer.currency.toUpperCase() as Currencies,
  );

  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.paymentPageV2",
  });

  const isUsd = currentOffer.currency === "usd";

  return (
    <S.Container>
      <S.Offer>
        {currentOffer.price}
        <S.EditButton onClick={handleOfferChange} type="button">
          <img src={EditIcon} alt="Edit" />
        </S.EditButton>
      </S.Offer>
      {cardGivingFees ? (
        <>
          <S.CardGivingInfoWrapper>
            <S.CardGivingInfo>
              {t("netDonation")}
              {cardGivingFees?.netGiving}
            </S.CardGivingInfo>
            <S.CardGivingInfo>
              {t("serviceFees")}
              {cardGivingFees?.serviceFees}
            </S.CardGivingInfo>
          </S.CardGivingInfoWrapper>
          {!isUsd && (
            <S.CardGivingInfo>{t("additionalFeesText")}</S.CardGivingInfo>
          )}
        </>
      ) : (
        <GivingFeesLoader />
      )}
    </S.Container>
  );
}

export default OfferSelection;
