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
import parse from "html-react-parser";
import Icon from "components/atomics/Icon";
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
    const fiscalFields = showFiscalFields ? country && validTaxId() : true;

    setButtonDisabled(!(name.length >= 3 && email && fiscalFields));
  }, [name, country, taxId, email]);

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
      <S.SmallTextInfoContainer>
        <Icon name="error" size="20px" />
        <S.SmallTextInfo>{parse(t("pixReceiverText"))}</S.SmallTextInfo>
      </S.SmallTextInfoContainer>
    </S.Container>
  );
}

export default PixForm;
