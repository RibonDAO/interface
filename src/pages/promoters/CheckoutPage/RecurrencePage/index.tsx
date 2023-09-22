import { useOffers } from "@ribon.io/shared/hooks";
import { Currencies, Languages, Offer } from "@ribon.io/shared/types";
import LinkAccordion from "components/moleculars/accordions/LinkAccordion";
import { MODAL_TYPES } from "contexts/modalContext/helpers";
import { useModal } from "hooks/modalHooks/useModal";
import { useLocationSearch } from "hooks/useLocationSearch";
import useNavigation from "hooks/useNavigation";
import usePayable from "hooks/usePayable";
import usePaymentParams from "hooks/usePaymentParams";
import { logEvent } from "lib/events";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useIntegrationId } from "hooks/useIntegrationId";
import { setLocalStorageItem } from "lib/localStorage";
import { I18NEXTLNG } from "lib/currentLanguage";
import ButtonSelectorTemplate from "../Components/ButtonSelectorTemplate";
import Header from "../Components/Header";
import PriceSelection from "../Components/PriceSelection";
import { PriceSelectionLoader } from "../Components/PriceSelection/loader";
import Loader from "../FiatSection/loader";
import * as S from "./styles";
import TrustSeal from "../Components/TrustSeal";

function RecurrencePage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.recurrencePage",
  });
  const [currentOffer, setCurrentOffer] = useState<Offer>();

  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const { updateLocationSearch } = useLocationSearch();
  const integrationId = useIntegrationId();

  const { target, targetId, offer, currency, language } = usePaymentParams();
  const hasAllParams = Boolean(
    target && targetId && offer && currency && language,
  );
  const currentPayable = usePayable(target, targetId);
  const { navigateTo } = useNavigation();

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
    setLocalStorageItem(I18NEXTLNG, language ?? Languages.PT);
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
    <S.Container>
      <Header />
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
      </div>
      <S.PaymentTypes>
        <S.PaymentTypesTitle>{t("title")}</S.PaymentTypesTitle>
        <LinkAccordion items={linksItems} />
      </S.PaymentTypes>
      <TrustSeal />
    </S.Container>
  ) : (
    <Loader />
  );
}

export default RecurrencePage;
