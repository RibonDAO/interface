import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "hooks/useLanguage";
import { maskForTaxId } from "lib/maskForTaxId";
import { useCardPaymentInformation } from "contexts/cardPaymentInformationContext";
import { logEvent } from "lib/events";
import { countryList } from "utils/countryList";
import getThemeByFlow from "lib/themeByFlow";
import * as S from "./styles";

function UserInfoSection(): JSX.Element {
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
    flow,
  } = useCardPaymentInformation();

  function isBrazil(countryName: string) {
    return countryName === t("brazilName");
  }

  const colorTheme = getThemeByFlow(flow);
  const [brazilFormatForTaxId, setBrazilFormatForTaxId] = useState(true);

  const maxTaxIdLength = () => (brazilFormatForTaxId ? 14 : 11);

  const handleChangeMask = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTaxId(maskForTaxId(value, brazilFormatForTaxId));
  };

  const handleCountryChange = (value: string) => {
    setCountry(value);
    setBrazilFormatForTaxId(isBrazil(value));
  };

  useEffect(() => {
    setButtonDisabled(
      !(country && state && city && taxId.length === maxTaxIdLength()),
    );
  }, [country, state, city, taxId]);

  useEffect(() => {
    logEvent("treasureSupportBillingInfo_view");
  });

  return (
    <S.BillingInformationSectionContainer colorTheme={colorTheme}>
      <S.Form>
        <S.CountryInput
          name="country"
          suggestions={countryList(currentLang)}
          placeholder={t("country")}
          onOptionChanged={handleCountryChange}
          required
        />
        <S.HalfInputContainer>
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
        </S.HalfInputContainer>
        <S.TaxIdInput
          name={taxId}
          placeholder={t("taxId")}
          value={taxId}
          onChange={handleChangeMask}
          maxLength={maxTaxIdLength()}
          required
        />
      </S.Form>
    </S.BillingInformationSectionContainer>
  );
}

export default UserInfoSection;
