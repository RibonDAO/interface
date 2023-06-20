import InputText from "components/atomics/inputs/InputText";
import { theme } from "@ribon.io/shared/styles";
import { useCardPaymentInformation } from "contexts/cardPaymentInformationContext";
import * as S from "./styles";

function CreditCardForm(): JSX.Element {
  const {
    name,
    setName,
    number,
    setNumber,
    expirationDate,
    setExpirationDate,
    cvv,
    setCvv,
  } = useCardPaymentInformation();

  const { primary } = theme.colors.brand;

  const activeBorderColor = primary[300];

  return (
    <S.Container>
      <InputText
        name="number"
        label={{ text: "Número do cartão" }}
        value={number}
        mask="9999 9999 9999 9999"
        onChange={(e) => setNumber(e.target.value)}
        borderColor={{
          active: activeBorderColor,
        }}
        data-testid="number"
        required
      />

      <InputText
        name="name"
        label={{ text: "Nome impresso" }}
        value={name}
        onChange={(e) => setName(e.target.value)}
        borderColor={{
          active: activeBorderColor,
        }}
        data-testid="name"
        required
      />

      <S.Half>
        <InputText
          name="expirationDate"
          label={{ text: "Data de expiração" }}
          mask="99/9999"
          autofill="cc-exp"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
          required
          minLength={6}
          data-testid="expirationDate"
          borderColor={{
            active: activeBorderColor,
          }}
        />
        <InputText
          name="cvv"
          label={{ text: "CVV" }}
          maxLength={4}
          minLength={3}
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          borderColor={{
            active: activeBorderColor,
          }}
          data-testid="cvv"
          required
        />
      </S.Half>
    </S.Container>
  );
}

export default CreditCardForm;
