import { useEffect, useState } from "react";
import usePaymentParams from "hooks/usePaymentParams";
import usePayable from "hooks/usePayable";
import ArrowLeftGreen from "assets/icons/arrow-left-green.svg";
import CurrencyExchange from "assets/icons/currency-exchange-icon.svg";
import { useTranslation } from "react-i18next";
import { useModal } from "hooks/modalHooks/useModal";
import { MODAL_TYPES } from "contexts/modalContext/helpers";
import { useOffers } from "@ribon.io/shared/hooks";
import { useLocationSearch } from "hooks/useLocationSearch";
import { Cause, Currencies, Offer } from "@ribon.io/shared/types";
import ButtonSelectorTemplate from "./ButtonSelectorTemplate";
import CardSection from "./CardSection";
import CryptoSection from "./CryptoSection";
import Loader from "./loader";
import * as S from "./styles";

function PaymentPageV2(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.paymentPageV2",
  });

  const { target, targetId, currency, offer, hasAllParams } =
    usePaymentParams();

  const { updateLocationSearch } = useLocationSearch();
  const currentPayable = usePayable(target, targetId);

  const {
    offers,
    refetch: refetchOffers,
    isLoading: isLoadingOffers,
  } = useOffers(Currencies[currency as keyof typeof Currencies], false);

  const [loaded, setLoaded] = useState(false);
  const [currentOffer, setCurrentOffer] = useState<Offer>();

  const resetOffer = () => updateLocationSearch("offer", "0");

  const handleCurrencyChange = (currencyItem: Currencies) => {
    updateLocationSearch("currency", currencyItem);
  };

  useEffect(() => {
    if (target === "non_profit" && currency === Currencies.USDC) {
      updateLocationSearch("currency", "USD");
    }
  }, []);

  useEffect(() => {
    if (currentPayable && hasAllParams) setLoaded(true);
  }, [currentPayable]);

  useEffect(() => {
    refetchOffers();
  }, [currency]);

  useEffect(() => {
    if (!isLoadingOffers) {
      const offerIndex = Number(offer);
      const actualOffer = offers?.[offerIndex];

      if (actualOffer) setCurrentOffer(actualOffer);
      else resetOffer();
    }
  }, [offers, offer, isLoadingOffers]);

  const buttonCurrencyItems = Object.values(Currencies).map((currencyItem) => ({
    label: currencyItem,
    onClick: () => handleCurrencyChange(currencyItem),
  }));

  const formattedCurrencyItems = () => {
    if (target === "non_profit") {
      return buttonCurrencyItems.filter((item) => item.label !== "USDC");
    }
    return buttonCurrencyItems;
  };

  const currencyModalProps = {
    title: t("selectCurrency"),
    children: (
      <ButtonSelectorTemplate
        items={formattedCurrencyItems()}
        current={Object.values(Currencies).indexOf(currency as Currencies)}
      />
    ),
  };

  const { show: showCurrencyModal } = useModal({
    type: MODAL_TYPES.MODAL_DIALOG,
    props: currencyModalProps,
  });

  const renderSection = () => {
    const isCrypto = currency === Currencies.USDC && target === "cause";

    if (isCrypto) {
      return (
        <CryptoSection cause={currentPayable as Cause} index={Number(offer)} />
      );
    }

    return (
      <CardSection
        currentPayable={currentPayable}
        offers={offers}
        offer={offer || "0"}
        currentOffer={currentOffer}
      />
    );
  };

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

      {(loaded && renderSection()) || <Loader />}
    </S.Container>
  );
}

export default PaymentPageV2;
