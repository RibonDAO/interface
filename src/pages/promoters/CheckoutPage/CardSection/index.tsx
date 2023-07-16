import { useEffect, useState } from "react";
import CreditCardIcon from "assets/icons/credit-card-icon.svg";
import usePayable from "hooks/usePayable";
import usePaymentParams from "hooks/usePaymentParams";
import { useTranslation } from "react-i18next";
import RadioAccordion from "components/moleculars/accordions/RadioAccordion";
import Button from "components/atomics/buttons/Button";
import { Currencies, Offer } from "@ribon.io/shared/types";
import { useOffers } from "@ribon.io/shared/hooks";
import { theme } from "@ribon.io/shared/styles";
import { useLocationSearch } from "hooks/useLocationSearch";
import { MODAL_TYPES } from "contexts/modalContext/helpers";
import { useModal } from "hooks/modalHooks/useModal";
import { useCardPaymentInformation } from "contexts/cardPaymentInformationContext";
import CreditCardForm from "../Components/CreditCardForm";
import PriceSelection from "../Components/PriceSelection";
import { PriceSelectionLoader } from "../Components/PriceSelection/loader";
import ButtonSelectorTemplate from "../Components/ButtonSelectorTemplate";
import Loader from "./loader";
import * as S from "./styles";

export default function CardSection() {
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.checkoutPage",
  });

  const { target, targetId, offer, currency } = usePaymentParams();

  const hasAllParams = Boolean(target && targetId && offer && currency);

  const currentPayable = usePayable(target, targetId);

  const { buttonDisabled, handleSubmit } = useCardPaymentInformation();

  const {
    offers,
    refetch: refetchOffers,
    isLoading: isLoadingOffers,
  } = useOffers(Currencies[currency as keyof typeof Currencies], false);

  const [currentOffer, setCurrentOffer] = useState<Offer>();
  const { updateLocationSearch } = useLocationSearch();

  const resetOffer = () => updateLocationSearch("offer", "0");

  useEffect(() => {
    resetOffer();
    refetchOffers();
  }, [currency]);

  useEffect(() => {
    if (!isLoadingOffers && offers && offer) {
      const actualOffer = offers[Number(offer)];
      setCurrentOffer(actualOffer);
    }
  }, [offers, offer, isLoadingOffers]);

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

  const CardAccordionItems = [
    {
      title: t("paymentMethodSection.creditCard"),
      rightIcon: CreditCardIcon,
      children: <CreditCardForm />,
    },
  ];

  return currentPayable && hasAllParams ? (
    <div>
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
          onClick={handleSubmit}
          text={t("confirmPayment")}
          softDisabled={false}
          disabled={buttonDisabled}
          backgroundColor={theme.colors.brand.primary[600]}
        />
      </S.DonateButtonContainer>
    </div>
  ) : (
    <Loader />
  );
}
