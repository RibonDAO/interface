import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from "react";
import Dropdown from "components/atomics/Dropdown";
import theme from "styles/theme";
import { Currencies } from "types/enums/Currencies";
import Divider from "components/atomics/Divider";
import { useCardPaymentInformation } from "contexts/cardPaymentInformationContext";
import useOffers from "hooks/apiHooks/useOffers";
import { logEvent } from "services/analytics";
import { removeInsignificantZeros } from "utils/currency";
import BillingInformationSection from "./BillingInformationSection";
import FeesSection from "./FeesSection";
import * as S from "./styles";
import PaymentInformation from "./PaymentInformationSection";

const { lightGray } = theme.colors;

function CardSection(): JSX.Element {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportFundPage.cardSection",
  });

  const {
    currentCoin,
    setCurrentCoin,
    handleSubmit,
    selectedButtonIndex,
    setSelectedButtonIndex,
    buttonDisabled,
    setButtonDisabled,
    setCryptoGiving,
    setOfferId,
  } = useCardPaymentInformation();

  const { offers, refetch: refetchOffers } = useOffers(currentCoin, false);

  const givingValue = useCallback(() => {
    if (offers) return offers[selectedButtonIndex]?.priceValue;

    return 0;
  }, [selectedButtonIndex, offers, currentCoin]);

  const givingTotal = useCallback(() => {
    if (!offers) return "";

    return offers[selectedButtonIndex]?.price;
  }, [offers, selectedButtonIndex, currentCoin]);

  const sections = [
    <div />,
    <BillingInformationSection />,
    <PaymentInformation />,
  ];

  function handleClickNext() {
    setButtonDisabled(true);
    if (currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      setOfferId(offers?.[selectedButtonIndex]?.id ?? 0);
      logEvent("fundSupportNextStepBtn_click");
    } else {
      handleSubmit();
    }
  }

  useEffect(() => {
    refetchOffers();
  }, [currentCoin]);

  return (
    <>
      <S.CardSectionContainer>
        {currentSectionIndex === 0 && (
          <>
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
                  onClick={() => {
                    logEvent("fundSupportAmountBtn_click", {
                      option: item?.id,
                    });
                    setSelectedButtonIndex(index);
                  }}
                  outline={index !== selectedButtonIndex}
                  key={item?.id}
                />
              ))}
            </S.ValuesContainer>
          </>
        )}
        <Divider color={lightGray} />

        {givingValue() > 0 && (
          <FeesSection
            currency={currentCoin}
            givingValue={givingValue()}
            givingTotal={givingTotal()}
            setCryptoGiving={setCryptoGiving}
          />
        )}

        <Divider color={lightGray} />

        {sections[currentSectionIndex]}
      </S.CardSectionContainer>
      <S.ButtonContainer>
        <S.FinishButton
          text={
            currentSectionIndex < sections.length - 1
              ? t("buttonTextCard")
              : t("buttonSubmit")
          }
          onClick={() => {
            handleClickNext();
          }}
          disabled={buttonDisabled}
        />
      </S.ButtonContainer>
    </>
  );
}

export default CardSection;
