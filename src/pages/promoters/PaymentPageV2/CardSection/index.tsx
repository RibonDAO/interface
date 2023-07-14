import { useState } from "react";
import { theme } from "@ribon.io/shared/styles";
// import ApplePayIcon from "assets/icons/apple-pay-icon.svg";
import CreditCardIcon from "assets/icons/credit-card-icon.svg";
import GooglePlayIcon from "assets/icons/google-pay-icon.svg";
import Button from "components/atomics/buttons/Button";
import { useTranslation } from "react-i18next";
import { useModal } from "hooks/modalHooks/useModal";
import RadioAccordion from "components/moleculars/accordions/RadioAccordion";
import { Cause, NonProfit, Offer } from "@ribon.io/shared/types";
import { MODAL_TYPES } from "contexts/modalContext/helpers";
import { useLocationSearch } from "hooks/useLocationSearch";
import { PriceSelectionLoader } from "../PriceSelection/loader";
import PriceSelection from "../PriceSelection";
import ButtonSelectorTemplate from "../ButtonSelectorTemplate";
import CreditCardForm from "../CreditCardForm";
import * as S from "../styles";

export type Props = {
  currentPayable: NonProfit | Cause | undefined;
  currentOffer: any;
  offer: string;
  offers: Offer[];
};

export default function CardSection({
  currentPayable,
  currentOffer,
  offer,
  offers,
}: Props) {
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.paymentPageV2",
  });

  const { updateLocationSearch } = useLocationSearch();

  const [creditCard, setCreditCard] = useState({
    name: "",
    number: "",
    expirationDate: "",
    cvv: "",
  });

  const CardAccordionItems = [
    {
      title: t("paymentMethodSection.creditCard"),
      rightIcon: CreditCardIcon,
      children: <CreditCardForm data={creditCard} setData={setCreditCard} />,
    },
    {
      title: t("paymentMethodSection.googlePay"),
      rightIcon: GooglePlayIcon,
      onClick: () => {},
    },
    // {
    //   title: t("paymentMethodSection.applePay"),
    //   rightIcon: ApplePayIcon,
    //   onClick: () => {},
    // },
  ];

  const handleOfferChange = (offerItem: any) => {
    const offerIndex = offers?.findIndex(
      (item: any) => item.id === offerItem.id,
    );
    updateLocationSearch("offer", offerIndex.toString());
  };

  const buttonOfferItems = offers?.map((offerItem: any) => ({
    label: offerItem.price,
    onClick: () => handleOfferChange(offerItem),
  }));

  const offersModalProps = {
    title: t("selectValue"),
    children: (
      <ButtonSelectorTemplate
        items={buttonOfferItems}
        current={Number(offer) || 0}
      />
    ),
  };

  const { show: showOffersModal } = useModal({
    type: MODAL_TYPES.MODAL_DIALOG,
    props: offersModalProps,
  });

  return (
    <>
      <S.Title>
        {t("donatingTo")}
        <S.PayableName>{currentPayable?.name}</S.PayableName>
      </S.Title>
      {currentOffer ? (
        <PriceSelection
          currentOffer={currentOffer}
          onEditClick={() => showOffersModal()}
        />
      ) : (
        <PriceSelectionLoader />
      )}
      <S.PaymentMethods>
        <S.PaymentMethodsTitle>{t("payment")}</S.PaymentMethodsTitle>
        <RadioAccordion current={0} items={CardAccordionItems} />
      </S.PaymentMethods>

      <S.DonateButtonContainer>
        <Button
          onClick={() => {}}
          text={t("confirmPayment")}
          softDisabled={false}
          disabled={false}
          backgroundColor={theme.colors.brand.primary[600]}
        />
      </S.DonateButtonContainer>
    </>
  );
}
