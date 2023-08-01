import { Currencies, Offer } from "@ribon.io/shared/types";
import { useTranslation } from "react-i18next";
import EditIcon from "assets/icons/edit-icon.svg";
import { useCardGivingFees } from "@ribon.io/shared/hooks";
import { useExperiment } from "@growthbook/growthbook-react";
import { GivingFeesLoader } from "./loader";
import * as S from "./styles";

export type Props = {
  currentOffer?: Offer;
  priceValue?: string;
  onEditClick?: () => void;
  tokenSymbol?: string;
};

function PriceSelection({
  currentOffer,
  priceValue,
  onEditClick,
  tokenSymbol = "USDC",
}: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.checkoutPage",
  });

  const { cardGivingFees } = useCardGivingFees(
    currentOffer?.priceValue || 0,
    currentOffer?.currency.toUpperCase() as Currencies,
    currentOffer?.gateway || "stripe_global",
  );

  const price = currentOffer?.price || `${tokenSymbol} ${priceValue}`;
  const hasAdditionalTaxes = currentOffer?.gateway === "stripe_global";
  const isCrypto = tokenSymbol && priceValue && !currentOffer;

  const variation = useExperiment({
    key: "charge-payment-form-staging",
    variations: [false, true],
  });

  const renderGivingFees = () => {
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
        {hasAdditionalTaxes && variation.value && (
          <S.SmallTextInfo>{t("additionalFeesText")}</S.SmallTextInfo>
        )}
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
      {!isCrypto && renderGivingFees()}
      {isCrypto && <S.SmallTextInfo>{t("noRefundText")}</S.SmallTextInfo>}
    </S.Container>
  );
}

export default PriceSelection;
