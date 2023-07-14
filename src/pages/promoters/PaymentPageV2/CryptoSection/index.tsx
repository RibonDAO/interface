import { useEffect } from "react";
import UsdcIcon from "assets/icons/usdc-icon.svg";
import Button from "components/atomics/buttons/Button";
import { theme } from "@ribon.io/shared/styles";
import { useTranslation } from "react-i18next";
import RadioAccordion from "components/moleculars/accordions/RadioAccordion";
import { Cause } from "@ribon.io/shared/types";
import { useCryptoPayment } from "contexts/cryptoPaymentContext";
import { useWalletContext } from "contexts/walletContext";
import useNavigation from "hooks/useNavigation";
import { useModal } from "hooks/modalHooks/useModal";
import { MODAL_TYPES } from "contexts/modalContext/helpers";
import PriceSelection from "../PriceSelection";
import ValueInputTemplate from "../ValueInputTemplate";
import * as S from "../styles";

export type Props = {
  cause?: Cause;
  index: number;
};

export default function CryptoSection({ cause, index }: Props) {
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.paymentPageV2",
  });

  const { navigateTo } = useNavigation();

  const {
    amount,
    setCurrentPool,
    setAmount,
    handleDonationToContract,
    userBalance,
    tokenSymbol,
  } = useCryptoPayment();
  const { connectWallet, wallet } = useWalletContext();

  const insufficientBalance =
    userBalance === "NaN" || Number(userBalance) < Number(amount);

  const balance = userBalance === "NaN" ? "0" : userBalance;

  useEffect(() => {
    setAmount("10");
  }, [index]);

  useEffect(() => {
    if (cause && cause.pools?.length > 0) {
      setCurrentPool(cause?.pools[cause.pools.length - 1].address);
    }
  }, [cause]);

  const onDonationToContractSuccess = () => {
    navigateTo({
      pathname: "/donation-done-cause",
      state: {
        hasButton: true,
        cause,
        flow: "cause",
      },
    });
  };

  const handleDonateClick = async () => {
    if (wallet && cause) {
      if (insufficientBalance) return;

      await handleDonationToContract(
        Number(cause.id),
        onDonationToContractSuccess,
      );
      return;
    }

    connectWallet();
  };

  const donateButtonText = () => {
    if (wallet)
      return t("donateValue", { value: amount, currency: tokenSymbol });

    return t("connectWallet");
  };

  const CryptoAccordionItems = [
    {
      title: t("paymentMethodSection.crypto", { currency: tokenSymbol }),
      rightIcon: UsdcIcon,
      children:
        userBalance && wallet ? (
          <div>
            {insufficientBalance
              ? t("notEnoughFunds", { value: balance, currency: tokenSymbol })
              : t("balance", { value: balance, currency: tokenSymbol })}
          </div>
        ) : undefined,
      onClick: () => {},
    },
  ];

  const valueModalProps = {
    title: t("selectValue"),
    children: (
      <ValueInputTemplate
        value={amount}
        onChange={setAmount}
        suggestedValues={[10, 20, 50, 100, 200, 500]}
      />
    ),
  };

  const { show } = useModal({
    type: MODAL_TYPES.MODAL_DIALOG,
    props: valueModalProps,
  });

  return (
    <>
      <S.Title>
        {t("donatingTo")}
        <S.PayableName>{cause?.name}</S.PayableName>
      </S.Title>

      <PriceSelection
        priceValue={amount || "0"}
        onEditClick={() => show()}
        tokenSymbol={tokenSymbol}
      />

      <S.PaymentMethods>
        <S.PaymentMethodsTitle>{t("payment")}</S.PaymentMethodsTitle>
        <RadioAccordion current={0} items={CryptoAccordionItems} />
      </S.PaymentMethods>

      <S.DonateButtonContainer>
        <Button
          onClick={handleDonateClick}
          text={donateButtonText()}
          softDisabled={false}
          disabled={wallet ? insufficientBalance : false}
          backgroundColor={theme.colors.brand.primary[600]}
        />
      </S.DonateButtonContainer>
    </>
  );
}
