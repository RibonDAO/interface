import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from "react";
import { Currencies } from "types/enums/Currencies";
import { useCardPaymentInformation } from "contexts/cardPaymentInformationContext";
import useOffers from "hooks/apiHooks/useOffers";
import { logEvent } from "services/analytics";
import { removeInsignificantZeros } from "lib/formatters/currencyFormatter";
import CardSelect from "components/moleculars/cards/CardSelect";
import useNonProfits from "hooks/apiHooks/useNonProfits";
import NonProfit from "types/entities/NonProfit";
import useNonProfitImpact from "hooks/apiHooks/useNonProfitImpact";
import * as S from "../styles";
import Offer from "../../../../../types/entities/Offer";

function ImpactInformationSection(): JSX.Element {
  const [selectedNonProfit, setSelectedNonProfit] = useState<NonProfit>();

  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportTreasurePage.cardSection",
  });
  const { nonProfits } = useNonProfits();

  useEffect(() => {
    if (nonProfits) setSelectedNonProfit(nonProfits[0]);
  }, [nonProfits]);

  const {
    currentCoin,
    setCurrentCoin,
    selectedButtonIndex,
    setSelectedButtonIndex,
  } = useCardPaymentInformation();

  const { offers, refetch: refetchOffers } = useOffers(currentCoin, false);

  useEffect(() => {
    refetchOffers();
  }, [currentCoin]);

  const onNonProfitChanged = (nonProfit: NonProfit) => {
    setSelectedNonProfit(nonProfit);
  };

  const nonProfitText = (value: NonProfit) => value.name;

  const onCurrencyChanged = (currency: Currencies) => {
    setCurrentCoin(currency);
  };

  const currencyText = (value: Currencies) => value;

  const handleOfferClick = (offer: Offer, index: number) => {
    logEvent("treasureSupportAmountBtn_click", {
      option: offer?.id,
    });
    setSelectedButtonIndex(index);
  };

  const currentOffer = useCallback(() => {
    if (!offers) return null;

    return offers[selectedButtonIndex];
  }, [offers, selectedButtonIndex]);

  const { nonProfitImpact, refetch: refetchNonProfitImpact } =
    useNonProfitImpact(
      selectedNonProfit?.id,
      currentOffer()?.priceValue,
      currentCoin,
    );

  useEffect(() => {
    refetchNonProfitImpact();
  }, [currentOffer]);

  const impactText = () =>
    `${currentOffer()?.price} ${t("impactSimulationSection.payUpToText")} `;

  const impactNumber = () => nonProfitImpact?.roundedImpact || "";

  return (
    <S.ImpactSectionContainer>
      <S.Subtitle>{t("subtitleCard")}</S.Subtitle>
      <CardSelect
        dropdownProps={{
          values: [Currencies.USD, Currencies.BRL],
          label: t("currency"),
          name: "currency",
          onOptionChanged: onCurrencyChanged,
          valueText: currencyText,
          defaultValue: currentCoin,
          containerId: "currencies-dropdown",
        }}
      >
        <S.ValuesContainer>
          {offers?.map((item, index) => (
            <S.CardValueButton
              text={removeInsignificantZeros(item?.price)}
              onClick={() => handleOfferClick(item, index)}
              outline={index !== selectedButtonIndex}
              key={item?.id}
            />
          ))}
        </S.ValuesContainer>
      </CardSelect>

      <S.Subtitle>{t("simulateSectionTitle")}</S.Subtitle>
      {nonProfits && (
        <S.ImpactSimulatorContainer>
          <CardSelect
            dropdownProps={{
              values: nonProfits,
              label: t("impactSimulationSection.label"),
              name: "nonProfits",
              onOptionChanged: onNonProfitChanged,
              valueText: nonProfitText,
              containerId: "non-profits-dropdown",
            }}
          >
            <S.CardImpact>
              <S.CardImpactImage src={selectedNonProfit?.mainImage} />
              <S.CardImpactText>
                {impactText()}
                <span>
                  {impactNumber()} {selectedNonProfit?.impactDescription}
                </span>
              </S.CardImpactText>
            </S.CardImpact>
          </CardSelect>
        </S.ImpactSimulatorContainer>
      )}
    </S.ImpactSectionContainer>
  );
}

export default ImpactInformationSection;
