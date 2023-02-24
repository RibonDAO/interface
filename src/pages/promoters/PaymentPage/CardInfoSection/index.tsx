import InputText from "components/atomics/inputs/InputText";
import { useCardPaymentInformation } from "contexts/cardPaymentInformationContext";
import { useCurrentUser } from "contexts/currentUserContext";
import { maskToCreditCard } from "lib/maskToCreditCard";
import { maskToExpirationDate } from "lib/maskToExpirationDate";
import getThemeByFlow from "lib/themeByFlow";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { logEvent } from "lib/events";
import * as S from "./styles";

function CardInfoSection() {
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
    flow,
  } = useCardPaymentInformation();

  const { currentUser } = useCurrentUser();

  useEffect(() => {
    logEvent("treasureSupportPayment_view");
  }, []);

  const maskExpiration = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpirationDate(maskToExpirationDate(e.target.value));
  };

  const maskCreditCard = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(maskToCreditCard(e.target.value));
  };

  const colorTheme = getThemeByFlow(flow);

  useEffect(() => {
    setButtonDisabled(
      !(email && number && name && expirationDate && cvv.length >= 3),
    );
  }, [email, number, name, expirationDate, cvv]);

  return (
    <S.PaymentInformationSectionContainer colorTheme={colorTheme}>
      <S.Form>
        <InputText
          name="email"
          placeholder={t("email")}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={!!currentUser?.email}
          required
          textColor={colorTheme.shade20}
          borderColor={{
            default: colorTheme.shade40,
            active: colorTheme.shade40,
          }}
        />
        <InputText
          name="number"
          placeholder={t("cardNumber")}
          value={number}
          onChange={maskCreditCard}
          maxLength={19}
          minLength={19}
          required
          textColor={colorTheme.shade20}
          borderColor={{
            default: colorTheme.shade40,
            active: colorTheme.shade40,
          }}
        />
        <InputText
          name="name"
          placeholder={t("cardName")}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          textColor={colorTheme.shade20}
          borderColor={{
            default: colorTheme.shade40,
            active: colorTheme.shade40,
          }}
        />
        <S.Half>
          <InputText
            name="expirationDate"
            autofill="cc-exp"
            value={expirationDate}
            placeholder={t("cardDueDate")}
            onChange={maskExpiration}
            maxLength={7}
            required
            textColor={colorTheme.shade20}
            borderColor={{
              default: colorTheme.shade40,
              active: colorTheme.shade40,
            }}
          />
          <InputText
            name="cvv"
            placeholder={t("cvv")}
            maxLength={4}
            minLength={3}
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            required
            textColor={colorTheme.shade20}
            borderColor={{
              default: colorTheme.shade40,
              active: colorTheme.shade40,
            }}
          />
        </S.Half>
      </S.Form>
    </S.PaymentInformationSectionContainer>
  );
}

export default CardInfoSection;
