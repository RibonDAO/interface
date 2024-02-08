import { useEffect, useState } from "react";
import CreditCardIcon from "assets/icons/credit-card-icon.svg";
import PixIcon from "assets/icons/pix-icon.svg";
import usePayable from "hooks/usePayable";
import usePaymentParams from "hooks/usePaymentParams";
import { useTranslation } from "react-i18next";
import {
  Currencies,
  Offer,
  Cause,
  NonProfit,
  Categories,
} from "@ribon.io/shared/types";
import { useOffers } from "@ribon.io/shared/hooks";
import { useLocationSearch } from "hooks/useLocationSearch";
import { MODAL_TYPES } from "contexts/modalContext/helpers";
import { useExperiment } from "@growthbook/growthbook-react";
import { useModal } from "hooks/modalHooks/useModal";
import { logEvent } from "lib/events";
import { usePaymentInformation } from "contexts/paymentInformationContext";
import CheckoutArtImage from "assets/images/checkout-art.png";
import { theme } from "@ribon.io/shared/styles";
import Icon from "components/atomics/Icon";
import RadioAccordion from "components/moleculars/accordions/RadioAccordion";
import PixSection from "../PixSection";
import PriceSelection from "../Components/PriceSelection";
import { PriceSelectionLoader } from "../Components/PriceSelection/loader";
import ButtonSelectorTemplate from "../Components/ButtonSelectorTemplate";
import Loader from "./loader";
import * as S from "./styles";
import CardSection from "../CardSection";
import TrustSeal from "../Components/TrustSeal";

export default function FiatSection() {
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.checkoutPage",
  });

  const {
    target,
    targetId,
    offer,
    currency,
    paymentMethodIndex,
    subscription,
    from,
  } = usePaymentParams();
  const hasAllParams = Boolean(target && targetId && offer && currency);
  const currentPayable = usePayable(target, targetId);

  const {
    setOfferId,
    setCurrentCoin,
    setCause,
    setNonProfit,
    setFlow,
    setFrom,
  } = usePaymentInformation();
  const [isSubscription, setIsSubscription] = useState(subscription === "true");

  const {
    offers,
    refetch: refetchOffers,
    isLoading: isLoadingOffers,
  } = useOffers(
    Currencies[currency?.toUpperCase() as keyof typeof Currencies],
    isSubscription,
    Categories.DIRECT_CONTRIBUTION,
  );

  const [currentOffer, setCurrentOffer] = useState<Offer>();
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const { updateLocationSearch } = useLocationSearch();

  const resetOffer = () =>
    updateLocationSearch("offer", offers[0].priceCents.toString());

  useEffect(() => {
    refetchOffers();
  }, [currency, isSubscription]);

  useEffect(() => {
    if (!isLoadingOffers && offers && offer) {
      const actualOffer = offers?.find(
        (offerItem: Offer) => offerItem.priceCents === Number(offer),
      );

      const offerIndex = offers?.findIndex(
        (offerItem: any) => offerItem.priceCents === Number(offer),
      );
      setCurrentOffer(actualOffer ?? offers[0]);
      setCurrentOfferIndex(offerIndex || 0);

      if (offers.length - 1 < Number(currentOfferIndex)) resetOffer();
    }
  }, [offers, offer, isLoadingOffers, isSubscription]);

  const handleOfferChange = (offerItem: any) => {
    const offerChanged = offers?.find((item: any) => item.id === offerItem.id);
    updateLocationSearch(
      "offer",
      offerChanged?.priceCents.toString() || offers[0].priceCents.toString(),
    );
  };

  const onSubscriptionClick = () => {
    setIsSubscription(!isSubscription);
    updateLocationSearch("subscription", (!isSubscription).toString());
    if (currentPayable)
      logEvent("P23_changeRecurrence_click", {
        receiver: currentPayable?.name,
      });
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
        current={currentOfferIndex || 0}
      />
    ),
  };

  const { show: showOffersModal } = useModal({
    type: MODAL_TYPES.MODAL_DIALOG,
    props: offersModalProps,
  });

  useEffect(() => {
    if (currentOffer) setOfferId(currentOffer.id);
  }, [currentOffer]);

  useEffect(() => {
    if (!currentPayable) return;

    if (target === "cause") {
      setNonProfit(undefined);
      setCause(currentPayable as Cause);
      setFlow("cause");
    } else if (target === "non_profit") {
      setNonProfit(currentPayable as NonProfit);
      setCause((currentPayable as NonProfit).cause as Cause);
      setFlow("nonProfit");
    }
    setFrom(from || "NormalPaymentFlow");
  }, [currentPayable]);

  useEffect(() => {
    if (currentOffer)
      setCurrentCoin(
        Currencies[currency?.toUpperCase() as keyof typeof Currencies],
      );
  }, [currentOffer]);

  const showPix = () =>
    currentOffer?.gateway === "stripe" && currentOffer?.currency === "brl";

  const CardAccordionItems: any = [
    {
      title: t("paymentMethodSection.creditCard"),
      rightIcon: CreditCardIcon,
      children: <CardSection currentOffer={currentOffer} />,
      onClick: () => {
        logEvent("selectCreditCard_click");
      },
    },
    showPix() && {
      title: t("paymentMethodSection.pix"),
      rightIcon: PixIcon,
      children: <PixSection currentOffer={currentOffer} />,
      onClick: () => {
        logEvent("selectPix_click");
      },
    },
  ].filter((item) => !!item);

  const variation = useExperiment({
    key: "payment-form",
    variations: [false, true],
  });

  return currentPayable && hasAllParams ? (
    <div>
      {variation.value && (
        <S.MobileImageContainer>
          <S.Image src={CheckoutArtImage} />
        </S.MobileImageContainer>
      )}

      <S.Title>
        {t("donatingTo")}
        <S.PayableName>{currentPayable?.name}</S.PayableName>
      </S.Title>
      {variation.value && <S.Headline>{t("headline")}</S.Headline>}

      {currentOffer ? (
        <PriceSelection
          currentOffer={currentOffer}
          onEditClick={() => showOffersModal()}
        />
      ) : (
        <PriceSelectionLoader />
      )}
      {!variation.value && (
        <S.RecurrenceContainer>
          <Icon
            name={isSubscription ? "event_repeat" : "event_available"}
            size="25px"
            color={theme.colors.brand.primary[600]}
          />
          <S.RecurrenceTitle>
            {isSubscription
              ? t("monthlyContribution")
              : t("uniqueContribution")}
          </S.RecurrenceTitle>
          <S.RecurrenceButton
            outline
            text={t("recurrenceButton")}
            onClick={() => onSubscriptionClick()}
            textColor={theme.colors.brand.primary[600]}
            borderColor={theme.colors.brand.primary[600]}
            style={{
              height: "28px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              padding: "0 8px",
              width: "fit-content",
              borderRadius: "4px",
            }}
          />
        </S.RecurrenceContainer>
      )}

      <S.PaymentMethods>
        <S.PaymentMethodsTitle>{t("payment")}</S.PaymentMethodsTitle>
        <RadioAccordion
          current={paymentMethodIndex ? Number(paymentMethodIndex) : undefined}
          items={CardAccordionItems}
        />
      </S.PaymentMethods>
      {!variation.value && <TrustSeal />}
    </div>
  ) : (
    <Loader />
  );
}
