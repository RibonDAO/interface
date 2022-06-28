import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from "react";
import { useLanguage } from "hooks/useLanguage";
import Dropdown from "components/atomics/Dropdown";
import theme from "styles/theme";
import { Currencies } from "types/enums/Currencies";
import { coinByLanguage } from "lib/coinByLanguage";
import Divider from "components/atomics/Divider";
import useOffers from "hooks/apiHooks/useOffers";
import BillingInformationSection from "./BillingInformationSection";
import FeesSection from "./FeesSection";
import * as S from "./styles";

const { lightGray } = theme.colors;

function CardSection(): JSX.Element {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportFundPage.cardSection",
  });
  const { currentLang } = useLanguage();
  const [currentCoin, setCurrentCoin] = useState<Currencies>(
    coinByLanguage(currentLang),
  );
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
    givingValue() > 0 && (
      <FeesSection
        currency={currentCoin}
        givingValue={givingValue()}
        givingTotal={givingTotal()}
      />
    ),
    <BillingInformationSection />,
  ];

  function handleClickNext() {
    if (currentSectionIndex <= sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
    }
  }

  useEffect(() => {
    refetchOffers();
  }, [currentCoin]);

  return (
    <S.CardSectionContainer>
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
            text={item?.price}
            onClick={() => {
              setSelectedButtonIndex(index);
            }}
            outline={index !== selectedButtonIndex}
            key={item?.id}
          />
        ))}
      </S.ValuesContainer>

      <Divider color={lightGray} />

      {sections[currentSectionIndex]}
      <S.ButtonContainer>
        <S.FinishButton
          text={t("buttonTextCard")}
          onClick={() => {
            handleClickNext();
          }}
        />
      </S.ButtonContainer>
    </S.CardSectionContainer>
  );
}

export default CardSection;
