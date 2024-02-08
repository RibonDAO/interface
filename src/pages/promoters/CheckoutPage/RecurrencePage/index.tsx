import { useOffers } from "@ribon.io/shared/hooks";
import { Currencies, Languages, Offer } from "@ribon.io/shared/types";
import LinkAccordion from "components/moleculars/accordions/LinkAccordion";
import { MODAL_TYPES } from "contexts/modalContext/helpers";
import { useModal } from "hooks/modalHooks/useModal";
import { useLocationSearch } from "hooks/useLocationSearch";
import useNavigation from "hooks/useNavigation";
import { useExperiment } from "@growthbook/growthbook-react";
import usePayable from "hooks/usePayable";
import usePaymentParams from "hooks/usePaymentParams";
import { logEvent } from "lib/events";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useIntegrationId } from "hooks/useIntegrationId";
import { useLanguage } from "hooks/useLanguage";
import CheckoutArtImage from "assets/images/checkout-art.png";
import ButtonSelectorTemplate from "../Components/ButtonSelectorTemplate";
import Header from "../Components/Header";
import PriceSelection from "../Components/PriceSelection";
import { PriceSelectionLoader } from "../Components/PriceSelection/loader";
import Loader from "../FiatSection/loader";
import TrustSeal from "../Components/TrustSeal";
import * as S from "./styles";

function RecurrencePage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.recurrencePage",
  });
  const [currentOffer, setCurrentOffer] = useState<Offer>();

  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const { updateLocationSearch } = useLocationSearch();
  const integrationId = useIntegrationId();
  const { setCurrentLang } = useLanguage();

  const { target, targetId, offer, currency, language } = usePaymentParams();
  const hasAllParams = Boolean(target && targetId && offer && currency);
  const currentPayable = usePayable(target, targetId);
  const { navigateTo } = useNavigation();

  const variation = useExperiment({
    key: "payment-form",
    variations: [false, true],
  });

  const {
    offers,
    refetch: refetchOffers,
    isLoading: isLoadingOffers,
  } = useOffers(
    Currencies[currency?.toUpperCase() as keyof typeof Currencies],
    false,
  );
  useEffect(() => {
    refetchOffers();
  }, [currency]);

  useEffect(() => {
    setCurrentLang(language as Languages);
  });

  const resetOffer = () =>
    updateLocationSearch("offer", offers[0].priceCents.toString());

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
  }, [offers, offer, isLoadingOffers]);

  const handleOfferChange = (offerItem: any) => {
    const offerChanged = offers?.find((item: any) => item.id === offerItem.id);
    updateLocationSearch(
      "offer",
      offerChanged?.priceCents.toString() || offers[0].priceCents.toString(),
    );
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

  const navigateToCheckout = (subscription: boolean) => {
    const searchParams = new URLSearchParams({
      integration_id: integrationId?.toString() || "",
      offer: currentOffer?.priceCents.toString() ?? "0",
      target: target ?? "",
      target_id: targetId ?? "",
      currency: currency ?? "",
      subscription: subscription ? "true" : "false",
    });

    logEvent("P23_recurrenceSelect_click", {
      receiver: currentPayable?.name,
      recurring: subscription ? "true" : "false",
      oneTime: subscription ? "false" : "true",
    });

    navigateTo({
      pathname: "/promoters/checkout",
      search: searchParams.toString(),
    });
  };

  const linksItems = [
    {
      title: t("recurrentDonationDescription"),
      leftIcon: "event_repeat",
      handleClick: () => navigateToCheckout(true),
    },
    {
      title: t("uniqueDonationDescription"),
      leftIcon: "event_available",
      handleClick: () => navigateToCheckout(false),
    },
  ];

  useEffect(() => {
    if (currentPayable)
      logEvent("P23_recurrenceSelect_view", {
        target: currentPayable?.name,
      });
  }, [currentPayable]);

  return currentPayable && hasAllParams ? (
    <S.MainContainer>
      <S.Container>
        <Header />
        {variation.value && (
          <S.MobileImageContainer>
            <S.Image src={CheckoutArtImage} />
          </S.MobileImageContainer>
        )}
        <div>
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
        </div>
        <S.PaymentTypes>
          <S.PaymentTypesTitle>{t("title")}</S.PaymentTypesTitle>
          <LinkAccordion items={linksItems} />
        </S.PaymentTypes>
        {!variation.value && <TrustSeal />}
      </S.Container>
      {variation.value && (
        <S.ImageContainer>
          <S.Image src={CheckoutArtImage} />
        </S.ImageContainer>
      )}
    </S.MainContainer>
  ) : (
    <Loader />
  );
}

export default RecurrencePage;
