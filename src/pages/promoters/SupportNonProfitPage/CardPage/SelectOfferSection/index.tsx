import { useEffect, useState } from "react";
import InputRange from "components/atomics/inputs/InputRange";
import { useOffers, useNonProfitImpact } from "@ribon.io/shared/hooks";
import useFormattedImpactText from "hooks/useFormattedImpactText";
import { Offer, Currencies, NonProfit } from "@ribon.io/shared/types";
import { useTranslation } from "react-i18next";
import theme from "styles/theme";
import { formatPrice } from "lib/formatters/currencyFormatter";
import { setLocalStorageItem } from "lib/localStorage";
import { usePaymentInformation } from "contexts/paymentInformationContext";
import { useExperiment } from "@growthbook/growthbook-react";
import HeartIcon from "assets/icons/heart.svg";
import PinkTicketIcon from "assets/icons/pink-ticket.svg";
import * as S from "./styles";

const { tertiary } = theme.colors.brand;

type Props = {
  nonProfit: NonProfit | undefined;
  onOfferChange: (offer: Offer, index?: number) => void;
};

const CURRENT_OFFER_INDEX_KEY = "CURRENT_OFFER_INDEX_KEY";

function SelectOfferPage({ nonProfit, onOfferChange }: Props): JSX.Element {
  const [maxRange, setMaxRange] = useState(0);

  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const [currentOffer, setCurrentOffer] = useState<Offer>();
  const { currentCoin, setCurrentCoin } = usePaymentInformation();
  const { offers, refetch: refetchOffers } = useOffers(currentCoin, false);

  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportNonProfitPage.selectOfferSection",
  });

  const { formattedImpactText } = useFormattedImpactText();

  const { nonProfitImpact, refetch: refetchNonProfitImpact } =
    useNonProfitImpact(nonProfit?.id, currentOffer?.priceValue, currentCoin);

  useEffect(() => {
    if (currentOffer) refetchNonProfitImpact();
  }, [currentOffer]);

  useEffect(() => {
    refetchOffers();
  }, [currentCoin]);

  useEffect(() => {
    setMaxRange(offers.length - 1);
    setCurrentOffer(offers[currentOfferIndex]);
  }, [offers]);

  useEffect(() => {
    if (currentOffer) {
      const offerIndex = offers.findIndex(
        (offer) => offer.id === currentOffer.id,
      );

      onOfferChange(currentOffer, offerIndex);
    }
  }, [currentOffer]);

  useEffect(() => {
    setCurrentOffer(offers[currentOfferIndex]);
    setLocalStorageItem(CURRENT_OFFER_INDEX_KEY, currentOfferIndex.toString());
  }, [currentOfferIndex]);

  const onCurrencyChanged = (currency: Currencies) => {
    setCurrentCoin(currency);
    setCurrentOfferIndex(0);
  };

  const currentPrice = () =>
    currentOffer && formatPrice(currentOffer.priceValue, currentOffer.currency);

  const variation = useExperiment({
    key: "progression-test-first-stage",
    variations: [false, true],
  });

  const ticketVariation = useExperiment({
    key: "ticket-impact-test",
    variations: [false, true],
  });

  const oldImpactFormat = () => (
    <S.CauseText>
      {currentPrice()} {t("fundText")}{" "}
      <S.CauseTextHighlight>
        {variation &&
          formattedImpactText(
            nonProfit,
            undefined,
            true,
            true,
            nonProfitImpact,
          )}
      </S.CauseTextHighlight>
    </S.CauseText>
  );

  const newImpactFormat = () => (
    <S.ImpactSection>
      <S.ImpactText>{t("impactText")}</S.ImpactText>
      <S.CurrentLifeAmount>
        <S.HeartIcon src={HeartIcon} aria-hidden alt="life icon" />
        {nonProfit?.cause.name.toLocaleLowerCase().includes("animal")
          ? t("livesAmount", {
              value: Math.round(Number(currentOffer?.priceValue ?? 50) * 2),
            })
              .replace("pessoas", "animais")
              .replace("pessoa", "animal")
              .replace("people", "animals")
              .replace("person", "animal")
          : t("livesAmount", {
              value: Math.round(Number(currentOffer?.priceValue ?? 50) * 2),
            })}
      </S.CurrentLifeAmount>
      {nonProfit?.impactDescription && (
        <S.ImpactDescription>
          {t("impactDescription", {
            value: nonProfit?.impactDescription.split(",")[0] ?? 0,
          })}
        </S.ImpactDescription>
      )}
    </S.ImpactSection>
  );

  const ticketImpactFormat = () => (
    <S.ImpactSection>
      <S.ImpactText>{t("donateText")}</S.ImpactText>
      <S.CurrentLifeAmount>
        <S.HeartIcon src={PinkTicketIcon} aria-hidden alt="life icon" />
        {t("ticketsAmount", {
          value: Math.round(Number(currentOffer?.priceValue ?? 50) * 2),
        })}
      </S.CurrentLifeAmount>
      {nonProfit?.impactDescription && (
        <S.ImpactDescription>
          {t("altImpactDescription", {
            value: nonProfit?.impactDescription.split(",")[0] ?? 0,
          })}
        </S.ImpactDescription>
      )}
    </S.ImpactSection>
  );

  const renderCurrentBlock = () => {
    if (variation.value) {
      return newImpactFormat();
    } else if (ticketVariation.value) {
      return ticketImpactFormat();
    }

    return oldImpactFormat();
  };

  return (
    <S.Container>
      <S.Title>{nonProfit?.name}</S.Title>
      {renderCurrentBlock()}
      <S.ValueContainer>
        <S.ValueText>{currentPrice()}</S.ValueText>
        <S.CurrencySelectorContainer>
          <S.CurrencySelector
            values={[Currencies.BRL, Currencies.USD]}
            name="currency"
            onOptionChanged={onCurrencyChanged}
            defaultValue={currentCoin}
            containerId={`currency-selector-${nonProfit?.id}`}
            customInputStyles={{
              borderColor: tertiary[800],
              height: 40,
              marginBottom: 0,
              color: tertiary[800],
              width: 80,
            }}
          />
        </S.CurrencySelectorContainer>
      </S.ValueContainer>
      <InputRange
        value={currentOfferIndex}
        min={0}
        max={maxRange}
        onChange={(event) => {
          setCurrentOfferIndex(event.target.value);
        }}
        color={tertiary[400]}
      />
    </S.Container>
  );
}

export default SelectOfferPage;
