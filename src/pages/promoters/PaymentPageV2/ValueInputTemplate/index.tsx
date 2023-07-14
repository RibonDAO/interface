import { useState } from "react";
import { useModalContext } from "contexts/modalContext";
import { useTranslation } from "react-i18next";
import * as S from "./styles";

export type Props = {
  value: string;
  onChange: (value: string) => void;
  suggestedValues?: string[] | number[];
};

export default function ValueInputTemplate({
  value,
  onChange,
  suggestedValues = [],
}: Props) {
  const [currentValue, serCurrentValue] = useState(value);
  const [elementsDisabled, setElementsDisabled] = useState(false);

  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.paymentPageV2",
  });

  const { hideModal } = useModalContext();

  const handleButtonClick = () => {
    onChange(currentValue);
    setElementsDisabled(true);

    setTimeout(() => {
      hideModal();
    }, 100);
  };

  const validateValue = (valueToChange: string) => {
    const regex = /^(\d+([.]\d{0,2})?)?$/;
    if (regex.test(valueToChange)) {
      serCurrentValue(valueToChange);
      setElementsDisabled(false);
    }
  };

  return (
    <S.Container>
      {suggestedValues.map((item) => (
        <S.SelectButton
          key={item}
          onClick={() => serCurrentValue(item.toString())}
          type="button"
          text={`$${item}`}
          disabled={elementsDisabled}
        />
      ))}

      <S.SmallText>{t("customAmount")}</S.SmallText>

      <S.ValueInput
        value={currentValue}
        name="value-input"
        onChange={(event) => validateValue(event.target.value)}
        type="money"
        disabled={elementsDisabled}
      />
      <S.SaveButton
        onClick={handleButtonClick}
        disabled={elementsDisabled}
        text={t("save")}
      />
    </S.Container>
  );
}
