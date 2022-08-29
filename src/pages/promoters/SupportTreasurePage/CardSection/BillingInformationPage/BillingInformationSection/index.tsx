import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import InputAutoComplete from "components/atomics/inputs/InputAutoComplete";
import { Languages } from "types/enums/Languages";
import { useLanguage } from "hooks/useLanguage";
import { mask } from "lib/maskForTaxId";
import { useCardPaymentInformation } from "contexts/cardPaymentInformationContext";
import InputText from "components/atomics/inputs/InputText";
import { logEvent } from "services/analytics";
import { countryList } from "./countryList";
import * as S from "./styles";

function BillingInformationSection(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix:
      "promoters.supportTreasurePage.cardSection.billingInformationPage.billingInformationSection",
  });
  const { currentLang } = useLanguage();
  const maxLengthByLanguage = currentLang === Languages.PT ? 14 : 11;
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

  const handleChangeMask = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTaxId(mask(value, currentLang));
  };

  useEffect(() => {
    if (country && state && city && taxId.length === maxLengthByLanguage) {
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
          maxLength={maxLengthByLanguage}
          required
        />
      </S.Form>
    </S.BillingInformationSectionContainer>
  );
}

export default BillingInformationSection;
