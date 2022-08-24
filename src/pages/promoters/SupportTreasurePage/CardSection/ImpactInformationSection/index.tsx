import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from "react";
import Dropdown from "components/atomics/Dropdown";
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

  const onOptionChanged = (nonProfit: NonProfit) => {
    setSelectedNonProfit(nonProfit);
  };

  const handleOfferClick = (offer: Offer, index: number) => {
    logEvent("treasureSupportAmountBtn_click", {
      option: offer?.id,
    });
    setSelectedButtonIndex(index);
  };

  const valueText = (value: NonProfit) => value.name;
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
      <Dropdown
        name="currency"
        label={t("currency")}
        values={[Currencies.USD, Currencies.BRL]}
        defaultValue={currentCoin}
        onOptionChanged={(value) => setCurrentCoin(value)}
      />
      <S.Subtitle>{t("subtitleCard")}</S.Subtitle>
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
      <S.Subtitle>{t("simulateSectionTitle")}</S.Subtitle>
      {nonProfits && (
        <S.ImpactSimulatorContainer>
          <CardSelect
            dropdownProps={{
              values: nonProfits,
              label: t("impactSimulationSection.label"),
              name: "nonProfits",
              onOptionChanged,
              valueText,
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
