import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import InputAutoComplete from "components/atomics/inputs/InputAutoComplete";
import { useLanguage } from "hooks/useLanguage";
import { maskForTaxId } from "lib/maskForTaxId";
import { useCardPaymentInformation } from "contexts/cardPaymentInformationContext";
import InputText from "components/atomics/inputs/InputText";
import { logEvent } from "lib/events";
import { countryList } from "utils/countryList";
import * as S from "./styles";

function BillingInformationSection(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix:
      "promoters.supportTreasurePage.cardSection.billingInformationPage.billingInformationSection",
  });
  const { currentLang } = useLanguage();
  const {
    country,
    setCountry,
    state,
    setState,
    city,
    setCity,
    taxId,
    setTaxId,
    setButtonDisabled,
  } = useCardPaymentInformation();

  function isInBrazil() {
    return country === t("brazilName");
  }

  const maxTaxIdLength = isInBrazil() ? 14 : 11;

  const handleChangeMask = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTaxId(maskForTaxId(value, isInBrazil()));
  };

  useEffect(() => {
    if (country && state && city && taxId.length === maxTaxIdLength) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [country, state, city, taxId]);

  useEffect(() => {
    logEvent("treasureSupportBillingInfo_view");
  });

  return (
    <S.BillingInformationSectionContainer>
      <S.Title>{t("title")}</S.Title>

      <S.Form>
        <InputAutoComplete
          name="country"
          suggestions={countryList(currentLang)}
          placeholder={t("country")}
          onOptionChanged={(value: string) => setCountry(value)}
          required
        />
        <S.HalfInput
          name={city}
          placeholder={t("city")}
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <S.HalfInput
          name={state}
          placeholder={t("state")}
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
        <InputText
          name={taxId}
          placeholder={t("taxId")}
          value={taxId}
          onChange={handleChangeMask}
          maxLength={maxTaxIdLength}
          required
        />
      </S.Form>
    </S.BillingInformationSectionContainer>
  );
}

export default BillingInformationSection;
