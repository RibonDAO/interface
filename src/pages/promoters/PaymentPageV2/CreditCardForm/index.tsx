import InputText from "components/atomics/inputs/InputText";
import { theme } from "@ribon.io/shared/styles";
import { useTranslation } from "react-i18next";
import * as S from "./styles";

export type Props = {
  data: {
    name: string;
    number: string;
    expirationDate: string;
    cvv: string;
  };
  setData: (data: any) => void;
};

function CreditCardForm({ data, setData }: Props): JSX.Element {
  const setFieldValue = (key: string, value: string) => {
    setData({
      ...data,
      [key]: value,
    });
  };
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.paymentPageV2.paymentMethodSection.creditCardFields",
  });

  const { primary } = theme.colors.brand;

  const activeBorderColor = primary[300];

  return (
    <S.Container>
      <InputText
        name="number"
        label={{ text: t("number") }}
        value={data.number}
        mask="9999 9999 9999 9999"
        onChange={(e) => setFieldValue("number", e.target.value)}
        borderColor={{
          active: activeBorderColor,
        }}
        data-testid="number"
        required
      />

      <InputText
        name="name"
        label={{ text: t("name") }}
        value={data.name}
        onChange={(e) => setFieldValue("name", e.target.value)}
        borderColor={{
          active: activeBorderColor,
        }}
        data-testid="name"
        required
      />

      <S.Half>
        <InputText
          name="expirationDate"
          label={{ text: t("expirationDate") }}
          mask="99/9999"
          autofill="cc-exp"
          value={data.expirationDate}
          onChange={(e) => setFieldValue("expirationDate", e.target.value)}
          required
          minLength={6}
          data-testid="expirationDate"
          borderColor={{
            active: activeBorderColor,
          }}
        />
        <InputText
          name="cvv"
          label={{ text: t("cvv") }}
          minLength={3}
          value={data.cvv}
          onChange={(e) => setFieldValue("cvv", e.target.value)}
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
