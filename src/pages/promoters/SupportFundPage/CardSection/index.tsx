import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import useGivingValues from "hooks/apiHooks/useGivingValues";
import { useLanguage } from "hooks/useLanguage";
import Dropdown from "components/atomics/Dropdown";
import { Currencies } from "types/enums/Currencies";
import * as S from "../styles";

function CardSection(): JSX.Element {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportFundPage.cardSection",
  });
  const { currentLang } = useLanguage();
  function defaultCoin() {
    if (currentLang === "pt-BR") return Currencies.BRL;

    return Currencies.USD;
  }
  const [currentCoin, setCurrentCoin] = useState<Currencies>(defaultCoin());
  const { givingValues, refetch: refetchGivingValues } =
    useGivingValues(currentCoin);

  useEffect(() => {
    refetchGivingValues();
  }, [currentCoin]);

  return (
    <S.CardSectionContainer>
      <Dropdown
        name="currency"
        label={t("currency")}
        values={[Currencies.USD, Currencies.BRL]}
        onOptionChanged={(value) => setCurrentCoin(value)}
      />
      <S.Subtitle>{t("subtitleCard")}</S.Subtitle>

      <S.ValuesContainer>
        {givingValues?.map((item, index) => (
          <S.CardValueButton
            text={item.valueText}
            onClick={() => {
              setSelectedButtonIndex(index);
            }}
            outline={index !== selectedButtonIndex}
            key={item.value}
          />
        ))}
      </S.ValuesContainer>

      <S.ButtonContainer>
        <S.FinishButton text={t("buttonTextCard")} onClick={() => {}} />
      </S.ButtonContainer>
    </S.CardSectionContainer>
  );
}

export default CardSection;
