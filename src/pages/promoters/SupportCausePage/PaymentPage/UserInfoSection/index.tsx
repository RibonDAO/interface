import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "hooks/useLanguage";
import { maskForTaxId } from "lib/maskForTaxId";
import { useCardPaymentInformation } from "contexts/cardPaymentInformationContext";
import { logEvent } from "services/analytics";
import { countryList } from "utils/countryList";
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
    setButtonDisabled(
      !(country && state && city && taxId.length === maxTaxIdLength),
    );
  }, [country, state, city, taxId]);

  useEffect(() => {
    logEvent("treasureSupportBillingInfo_view");
  });

  return (
    <S.BillingInformationSectionContainer>
      <S.Form>
        <S.CountryInput
          name="country"
          suggestions={countryList(currentLang)}
          placeholder={t("country")}
          onOptionChanged={(value: string) => setCountry(value)}
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
          maxLength={maxTaxIdLength}
          required
        />
      </S.Form>
    </S.BillingInformationSectionContainer>
  );
}

export default UserInfoSection;
