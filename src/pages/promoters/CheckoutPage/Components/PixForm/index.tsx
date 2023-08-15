import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useCurrentUser } from "contexts/currentUserContext";
import InputText from "components/atomics/inputs/InputText";
import Button from "components/atomics/buttons/Button";
import InputAutoComplete from "components/atomics/inputs/InputAutoComplete";
import { theme } from "@ribon.io/shared/styles";
import { countryList } from "utils/countryList";
import { useLanguage } from "hooks/useLanguage";
import { maskForTaxId } from "lib/maskForTaxId";
import { usePixPaymentInformation } from "contexts/pixPaymentInformationContext";
import { usePaymentInformation } from "contexts/paymentInformationContext";
import * as S from "./styles";

export type Props = {
  onSubmit: () => void;
  showFiscalFields?: boolean;
};

function PixForm({ onSubmit, showFiscalFields }: Props): JSX.Element {
  const { t: field } = useTranslation("translation", {
    keyPrefix: "promoters.checkoutPage.paymentMethodSection.pixFields",
  });

  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.checkoutPage",
  });

  const [brazilFormatForTaxId, setBrazilFormatForTaxId] = useState(true);

  const maxTaxIdLength = () => (brazilFormatForTaxId ? 14 : 11);

  const { signedIn } = useCurrentUser();

  const { buttonDisabled, setButtonDisabled } = usePixPaymentInformation();

  const {
    name,
    setName,
    country,
    setCountry,
    city,
    setCity,
    state,
    setState,
    taxId,
    setTaxId,
    email,
    setEmail,
  } = usePaymentInformation();

  const validTaxId = () => {
    if (!showFiscalFields) return true;

    const maxLength = maxTaxIdLength();

    if (brazilFormatForTaxId) return taxId.length === maxLength;

    return taxId.length > 4 && taxId.length <= maxLength;
  };

  function isBrazil(countryName: string) {
    return countryName === t("brazilName");
  }

  const handleCountryChange = (value: string) => {
    setCountry(value);
    setBrazilFormatForTaxId(isBrazil(value));
  };

  const { currentLang } = useLanguage();

  useEffect(() => {
    const fiscalFields = showFiscalFields
      ? city && state && country && validTaxId()
      : true;

    setButtonDisabled(!(name && email && fiscalFields));
  }, [name, country, state, city, taxId, email]);

  return (
    <S.Container>
      {!signedIn && (
        <InputText
          name="email"
          type="email"
          label={{ text: field("email") }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          data-testid="email"
          required
        />
      )}

      {showFiscalFields && (
        <>
          <InputAutoComplete
            initialState={country}
            name="country"
            suggestions={countryList(currentLang)}
            label={{ text: field("country") }}
            onOptionChanged={handleCountryChange}
            data-testid="country"
            required
          />

          <S.Half>
            <InputText
              name="city"
              label={{
                text: field("city"),
              }}
              value={city}
              onChange={(e) => setCity(e.target.value)}
              data-testid="city"
              required
            />

            <InputText
              name="state"
              label={{ text: field("state") }}
              value={state}
              onChange={(e) => setState(e.target.value)}
              data-testid="state"
              required
            />
          </S.Half>

          <InputText
            name={taxId}
            mask={maskForTaxId(country, currentLang)}
            maskPlaceholder=""
            label={{
              text: brazilFormatForTaxId ? field("cpf") : field("taxId"),
            }}
            value={taxId}
            onChange={(e) => setTaxId(e.target.value)}
            maxLength={maxTaxIdLength()}
            data-testid="taxId"
            required
          />
        </>
      )}

      <InputText
        name="name"
        label={{ text: field("name") }}
        value={name}
        onChange={(e) => setName(e.target.value)}
        data-testid="name"
        required
      />
      <S.DonateButtonContainer>
        <Button
          type="button"
          onClick={onSubmit}
          text={t("pixButtonText")}
          softDisabled={false}
          disabled={buttonDisabled}
          backgroundColor={theme.colors.brand.primary[600]}
          data-testid="confirmPayment"
        />
      </S.DonateButtonContainer>
    </S.Container>
  );
}

export default PixForm;
