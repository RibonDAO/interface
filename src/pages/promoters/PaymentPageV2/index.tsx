import { useEffect, useState } from "react";
import usePaymentParams from "hooks/usePaymentParams";
import usePayable from "hooks/usePayable";
import ArrowLeftGreen from "assets/icons/arrow-left-green.svg";
import CurrencyExchange from "assets/icons/currency-exchange-icon.svg";
import GooglePlayIcon from "assets/icons/google-pay-icon.svg";
import { useTranslation } from "react-i18next";
import { useModal } from "hooks/modalHooks/useModal";
import { MODAL_TYPES } from "contexts/modalContext/helpers";
import ApplePayIcon from "assets/icons/apple-pay-icon.svg";
import CreditCardIcon from "assets/icons/credit-card-icon.svg";
import RadioAccordion from "components/moleculars/accordions/RadioAccordion";
import { useOffers } from "@ribon.io/shared/hooks";
import { useLocationSearch } from "hooks/useLocationSearch";
import { Currencies, Offer } from "@ribon.io/shared/types";
import { theme } from "@ribon.io/shared/styles";
import Button from "components/atomics/buttons/Button";
import ButtonSelectorTemplate from "./ButtonSelectorTemplate";
import OfferSelection from "./OfferSelection";
import CreditCardForm from "./CreditCardForm";
import { OfferSelectionLoader } from "./OfferSelection/loader";
import Loader from "./loader";
import * as S from "./styles";

function PaymentPageV2(): JSX.Element {
  const { target, targetId, currency, offer, hasAllParams } =
    usePaymentParams();

  const [loaded, setLoaded] = useState(false);
  const [currentOffer, setCurrentOffer] = useState<Offer>();
  const [creditCard, setCreditCard] = useState({
    name: "",
    number: "",
    expirationDate: "",
    cvv: "",
  });

  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.paymentPageV2",
  });

  const { updateLocationSearch } = useLocationSearch();

  const { offers, refetch: refetchOffers } = useOffers(
    Currencies[currency as keyof typeof Currencies],
    false,
  );

  const currentPayable = usePayable(target, targetId);

  const RadioAccordionItems = [
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
    {
      title: t("paymentMethodSection.applePay"),
      rightIcon: ApplePayIcon,
      onClick: () => {},
    },
  ];

  const resetOffer = () => {
    updateLocationSearch("offer", "0");
    setCurrentOffer(offers[0]);
  };

  useEffect(() => {
    if (currentPayable) setLoaded(true);
  }, [currentPayable]);

  useEffect(() => {
    refetchOffers();
  }, [currency]);

  useEffect(() => {
    if (!offer || !offers) return;
    if (!offers[Number(offer)]) {
      resetOffer();
      return;
    }

    setCurrentOffer(offers[Number(offer)] || offers[0]);
  }, [offer, offers]);

  const handleOfferChange = (offerItem: Offer) => {
    const offerIndex = offers?.findIndex((item) => item.id === offerItem.id);
    updateLocationSearch("offer", offerIndex.toString());
  };

  const handleCurrencyChange = (currencyItem: Currencies) => {
    updateLocationSearch("currency", currencyItem);
  };

  const buttonOfferItems = offers?.map((offerItem) => ({
    label: offerItem.price,
    onClick: () => handleOfferChange(offerItem),
  }));

  const buttonCurrencyItems = Object.values(Currencies).map((currencyItem) => ({
    label: currencyItem,
    onClick: () => handleCurrencyChange(currencyItem),
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

  const currencyModalProps = {
    title: t("selectCurrency"),
    children: (
      <ButtonSelectorTemplate
        items={buttonCurrencyItems}
        current={Object.values(Currencies).indexOf(currency as Currencies)}
      />
    ),
  };

  const { show: showOffersModal } = useModal({
    type: MODAL_TYPES.MODAL_DIALOG,
    props: offersModalProps,
  });

  const { show: showCurrencyModal } = useModal({
    type: MODAL_TYPES.MODAL_DIALOG,
    props: currencyModalProps,
  });

  return (
    <S.Container>
      <S.Header>
        <S.BackButton href="/">
          <img src={ArrowLeftGreen} alt={t("back")} />
        </S.BackButton>
        <S.ChangeCurrencyButton onClick={() => showCurrencyModal()}>
          <img src={CurrencyExchange} alt={t("changeCurrency")} />
          <p>{t("changeCurrency")}</p>
        </S.ChangeCurrencyButton>
      </S.Header>
      {(hasAllParams && loaded && (
        <>
          <S.Title>
            {t("donatingTo")}
            <S.PayableName>{currentPayable?.name}</S.PayableName>
          </S.Title>
          {currentOffer ? (
            <OfferSelection
              currentOffer={currentOffer}
              handleOfferChange={() => showOffersModal()}
            />
          ) : (
            <OfferSelectionLoader />
          )}
          <S.PaymentMethods>
            <S.PaymentMethodsTitle>{t("payment")}</S.PaymentMethodsTitle>
            <RadioAccordion current={0} items={RadioAccordionItems} />
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
      )) || <Loader />}
    </S.Container>
  );
}

export default PaymentPageV2;
