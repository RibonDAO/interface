import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useCardPaymentInformation } from "contexts/cardPaymentInformationContext";
import InputText from "components/atomics/inputs/InputText";
import Button from "components/atomics/buttons/Button";
import InputAutoComplete from "components/atomics/inputs/InputAutoComplete";
import { theme } from "@ribon.io/shared/styles";
import { countryList } from "utils/countryList";
import { useLanguage } from "hooks/useLanguage";
import { maskForTaxId } from "lib/maskForTaxId";
import * as S from "./styles";

export type Props = {
  onSubmit: () => void;
  showFiscalFields?: boolean;
};

function CreditCardForm({ onSubmit, showFiscalFields }: Props): JSX.Element {
  const { t: field } = useTranslation("translation", {
    keyPrefix: "promoters.checkoutPage.paymentMethodSection.creditCardFields",
  });

  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.checkoutPage",
  });

  const [brazilFormatForTaxId, setBrazilFormatForTaxId] = useState(true);

  const maxTaxIdLength = () => (brazilFormatForTaxId ? 14 : 11);

  const {
    name,
    setName,
    number,
    setNumber,
    expirationDate,
    setExpirationDate,
    cvv,
    setCvv,
    buttonDisabled,
    setButtonDisabled,
    country,
    setCountry,
    city,
    setCity,
    state,
    setState,
    taxId,
    setTaxId,
  } = useCardPaymentInformation();

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

    setButtonDisabled(
      !(
        number &&
        name &&
        !expirationDate.includes("_") &&
        cvv.length >= 3 &&
        fiscalFields
      ),
    );
  }, [number, name, expirationDate, cvv, country, state, city, taxId]);

  return (
    <S.Container>
      {showFiscalFields && (
        <>
          <InputAutoComplete
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
        name="number"
        label={{ text: field("number") }}
        value={number}
        mask="9999 9999 9999 9999"
        maskPlaceholder=""
        onChange={(e) => setNumber(e.target.value)}
        data-testid="number"
        required
      />
      <InputText
        name="name"
        label={{ text: field("name") }}
        value={name}
        onChange={(e) => setName(e.target.value)}
        data-testid="name"
        required
      />
      <S.Half>
        <InputText
          name="expirationDate"
          mask="99/9999"
          autofill="cc-exp"
          value={expirationDate}
          label={{ text: field("expirationDate") }}
          onChange={(e) => setExpirationDate(e.target.value)}
          data-testid="expirationDate"
          required
          minLength={6}
        />
        <InputText
          name="cvv"
          label={{ text: field("cvv") }}
          maxLength={4}
          minLength={3}
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          data-testid="cvv"
          required
        />
      </S.Half>
      <S.DonateButtonContainer>
        <Button
          type="button"
          onClick={onSubmit}
          text={t("confirmPayment")}
          softDisabled={false}
          disabled={buttonDisabled}
          backgroundColor={theme.colors.brand.primary[600]}
        />
      </S.DonateButtonContainer>
    </S.Container>
  );
}

export default CreditCardForm;
