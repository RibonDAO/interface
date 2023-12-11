import ArrowLeftGreen from "assets/icons/arrow-left-dark-green.svg";
// import CurrencyExchange from "assets/icons/currency-exchange-icon.svg";
// import usePaymentParams from "hooks/usePaymentParams";
// import { useLocationSearch } from "hooks/useLocationSearch";
import { useTranslation } from "react-i18next";
// import { useExperiment } from "@growthbook/growthbook-react";
// import { useModal } from "hooks/modalHooks/useModal";
// import { MODAL_TYPES } from "contexts/modalContext/helpers";
// import { Currencies } from "@ribon.io/shared/types";
import useNavigation from "hooks/useNavigation";
// import ButtonSelectorTemplate from "../ButtonSelectorTemplate";
import * as S from "./styles";

export default function Header() {
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.checkoutPage",
  });

  // const variation = useExperiment({
  //   key: "payment-form",
  //   variations: [false, true],
  // });

  // const { currency, target } = usePaymentParams();
  // const { updateLocationSearch } = useLocationSearch();
  const { navigateBack } = useNavigation();

  // const handleCurrencyChange = (currencyItem: Currencies) => {
  //   updateLocationSearch("currency", currencyItem);
  // };

  // const buttonCurrencyItems = Object.values(Currencies)
  //   .map((currencyItem) => ({
  //     label: currencyItem,
  //     onClick: () => handleCurrencyChange(currencyItem),
  //   }))
  //   .filter((currencyItem) => currencyItem.label !== Currencies.USDC);

  // const filteredCurrencyItems = () => {
  //   if (target === "non_profit") {
  //     return buttonCurrencyItems.filter(
  //       (item) => item.label !== Currencies.USDC,
  //     );
  //   }
  //   return buttonCurrencyItems;
  // };

  // const currencyModalProps = {
  //   title: t("selectCurrency"),
  //   children: (
  //     <ButtonSelectorTemplate
  //       items={filteredCurrencyItems()}
  //       current={Object.values(Currencies).indexOf(currency as Currencies)}
  //     />
  //   ),
  // };

  // const { show: showCurrencyModal } = useModal({
  //   type: MODAL_TYPES.MODAL_DIALOG,
  //   props: currencyModalProps,
  // });

  return (
    <S.Header>
      <S.BackButton onClick={navigateBack}>
        <img src={ArrowLeftGreen} alt={t("back")} />
      </S.BackButton>
      {/* {!variation.value ? (
        <S.ChangeCurrencyButton onClick={() => showCurrencyModal()}>
          <img src={CurrencyExchange} alt={t("changeCurrency")} />
          <p>{t("changeCurrency")}</p>
        </S.ChangeCurrencyButton>
      ) : (
        <div />
      )} */}
    </S.Header>
  );
}
