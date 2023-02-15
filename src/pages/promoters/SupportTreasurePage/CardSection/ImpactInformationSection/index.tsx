import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Currencies, NonProfit, Offer } from "@ribon.io/shared/types";
import { useCardPaymentInformation } from "contexts/cardPaymentInformationContext";
import {
  useOffers,
  useNonProfits,
  useNonProfitImpact,
} from "@ribon.io/shared/hooks";
import { logEvent } from "lib/events";
import { removeInsignificantZeros } from "lib/formatters/currencyFormatter";
import CardSelect from "components/moleculars/cards/CardSelect";
import useNavigation from "hooks/useNavigation";
import questionIcon from "assets/icons/question-icon.svg";
import { useSimulateInfoModal } from "hooks/modalHooks/useSimulateInfoModal";
import { useLocation } from "react-router-dom";
import * as S from "../styles";

type LocationStateType = {
  nonProfit: NonProfit;
};

function ImpactInformationSection(): JSX.Element {
  const { state } = useLocation<LocationStateType>();
  const [selectedNonProfit, setSelectedNonProfit] = useState<NonProfit>();
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);

  const { currentCoin, setCurrentCoin, buttonDisabled, setButtonDisabled } =
    useCardPaymentInformation();
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportTreasurePage.cardSection",
  });
  const { nonProfits } = useNonProfits();
  const { offers, refetch: refetchOffers } = useOffers(currentCoin, false);
  const [currentOffer, setCurrentOffer] = useState<Offer>();
  const { navigateTo } = useNavigation();
  const { showSimulateInfoModal } = useSimulateInfoModal();

  useEffect(() => {
    if (state?.nonProfit) setSelectedNonProfit(state.nonProfit);
    else if (nonProfits) setSelectedNonProfit(nonProfits[0]);
  }, [nonProfits, state]);

  useEffect(() => {
    refetchOffers();
  }, [currentCoin]);

  useEffect(() => {
    setCurrentOffer(offers[0]);
  }, [JSON.stringify(offers)]);

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
    setCurrentOffer(offer);
    setSelectedButtonIndex(index);
  };

  const { nonProfitImpact, refetch: refetchNonProfitImpact } =
    useNonProfitImpact(
      selectedNonProfit?.id,
      currentOffer?.priceValue,
      currentCoin,
    );

  useEffect(() => {
    refetchNonProfitImpact();
  }, [currentOffer]);

  const impactText = () =>
    `${currentOffer?.price} ${t("impactSimulationSection.payUpToText")} `;

  const impactNumber = () => nonProfitImpact?.roundedImpact || "";

  function handleClickNext() {
    setButtonDisabled(true);
    logEvent("treasureSupportNextStepBtn_click");
    navigateTo({
      pathname: "/promoters/support-treasure/billing-information",
      state: {
        currentOffer,
      },
    });
  }

  function handleQuestionMarkClick() {
    showSimulateInfoModal();
  }

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

      <S.SubtitleContainer>
        <S.Subtitle>{t("simulateSectionTitle")}</S.Subtitle>
        <S.QuestionIcon
          src={questionIcon}
          onClick={() => handleQuestionMarkClick()}
          alt="question-mark-icon"
        />
      </S.SubtitleContainer>
      {nonProfits && (
        <S.ImpactSimulatorContainer>
          <CardSelect
            dropdownProps={{
              defaultValue: selectedNonProfit,
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
      <S.ButtonContainer topButton>
        <S.FinishButton
          text={t("buttonTextCard")}
          onClick={() => {
            handleClickNext();
          }}
          disabled={buttonDisabled}
        />
      </S.ButtonContainer>
    </S.ImpactSectionContainer>
  );
}

export default ImpactInformationSection;
