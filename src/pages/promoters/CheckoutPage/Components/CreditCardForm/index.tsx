import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useCardPaymentInformation } from "contexts/cardPaymentInformationContext";
import InputText from "components/atomics/inputs/InputText";
import * as S from "./styles";

function CreditCardForm(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.checkoutPage.paymentMethodSection.creditCardFields",
  });

  const {
    name,
    setName,
    number,
    setNumber,
    expirationDate,
    setExpirationDate,
    cvv,
    setCvv,
    setButtonDisabled,
  } = useCardPaymentInformation();

  useEffect(() => {
    setButtonDisabled(
      !(number && name && !expirationDate.includes("_") && cvv.length >= 3),
    );
  }, [number, name, expirationDate, cvv]);

  return (
    <S.Container>
      <InputText
        name="number"
        placeholder={t("number")}
        value={number}
        mask="9999 9999 9999 9999"
        onChange={(e) => setNumber(e.target.value)}
        required
      />
      <InputText
        name="name"
        placeholder={t("name")}
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <S.Half>
        <InputText
          name="expirationDate"
          mask="99/9999"
          autofill="cc-exp"
          value={expirationDate}
          placeholder={t("expirationDate")}
          onChange={(e) => setExpirationDate(e.target.value)}
          required
          minLength={6}
        />
        <InputText
          name="cvv"
          placeholder={t("cvv")}
          maxLength={4}
          minLength={3}
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          required
        />
      </S.Half>
    </S.Container>
  );
}

export default CreditCardForm;
