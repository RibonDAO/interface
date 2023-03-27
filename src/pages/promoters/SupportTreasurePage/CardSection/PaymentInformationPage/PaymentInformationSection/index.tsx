import InputText from "components/atomics/inputs/InputText";
import { useCardPaymentInformation } from "contexts/cardPaymentInformationContext";
import { useCurrentUser } from "contexts/currentUserContext";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { logEvent } from "lib/events";
import * as S from "./styles";

function PaymentInformationSection() {
  const { t } = useTranslation("translation", {
    keyPrefix:
      "promoters.supportTreasurePage.cardSection.paymentInformationPage.paymentInformationSection",
  });

  const {
    email,
    setEmail,
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

  const { currentUser } = useCurrentUser();

  useEffect(() => {
    logEvent("treasureSupportPayment_view");
  }, []);

  useEffect(() => {
    if (email && number && name && expirationDate && cvv.length >= 3) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email, number, name, expirationDate, cvv]);

  return (
    <S.PaymentInformationSectionContainer>
      <S.Title>{t("title")}</S.Title>

      <InputText
        name="email"
        placeholder={t("email")}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={!!currentUser?.email}
        required
      />
      <InputText
        name="number"
        mask="9999 9999 9999 9999"
        placeholder={t("cardNumber")}
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        required
      />
      <InputText
        name="name"
        placeholder={t("cardName")}
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
          placeholder={t("cardDueDate")}
          onChange={(e) => setExpirationDate(e.target.value)}
          required
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
    </S.PaymentInformationSectionContainer>
  );
}

export default PaymentInformationSection;
