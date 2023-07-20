import ArrowLeftGreen from "assets/icons/arrow-left-green.svg";
import CurrencyExchange from "assets/icons/currency-exchange-icon.svg";
import usePaymentParams from "hooks/usePaymentParams";
import { useLocationSearch } from "hooks/useLocationSearch";
import { useTranslation } from "react-i18next";
import { useModal } from "hooks/modalHooks/useModal";
import { MODAL_TYPES } from "contexts/modalContext/helpers";
import { Currencies } from "@ribon.io/shared/types";
import ButtonSelectorTemplate from "../ButtonSelectorTemplate";
import * as S from "./styles";

export default function Header() {
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.checkoutPage",
  });

  const { currency, target } = usePaymentParams();
  const { updateLocationSearch } = useLocationSearch();

  const handleCurrencyChange = (currencyItem: Currencies) => {
    updateLocationSearch("currency", currencyItem);
  };

  const buttonCurrencyItems = Object.values(Currencies)
    .map((currencyItem) => ({
      label: currencyItem,
      onClick: () => handleCurrencyChange(currencyItem),
    }))
    .filter((currencyItem) => currencyItem.label !== Currencies.USDC);

  const filteredCurrencyItems = () => {
    if (target === "non_profit") {
      return buttonCurrencyItems.filter(
        (item) => item.label !== Currencies.USDC,
      );
    }
    return buttonCurrencyItems;
  };

  const currencyModalProps = {
    title: t("selectCurrency"),
    children: (
      <ButtonSelectorTemplate
        items={filteredCurrencyItems()}
        current={Object.values(Currencies).indexOf(currency as Currencies)}
      />
    ),
  };

  const { show: showCurrencyModal } = useModal({
    type: MODAL_TYPES.MODAL_DIALOG,
    props: currencyModalProps,
  });

  return (
    <S.Header>
      <S.BackButton href="/">
        <img src={ArrowLeftGreen} alt={t("back")} />
      </S.BackButton>
      <S.ChangeCurrencyButton onClick={() => showCurrencyModal()}>
        <img src={CurrencyExchange} alt={t("changeCurrency")} />
        <p>{t("changeCurrency")}</p>
      </S.ChangeCurrencyButton>
    </S.Header>
  );
}
