import { useEffect, useState } from "react";
import InputRange from "components/atomics/inputs/InputRange";
import { useOffers, useNonProfitImpact } from "@ribon.io/shared/hooks";
import { Offer, Currencies, NonProfit } from "@ribon.io/shared/types";
import { useTranslation } from "react-i18next";
import theme from "styles/theme";
import {
  formatPrice,
  removeInsignificantZeros,
} from "lib/formatters/currencyFormatter";
import { setLocalStorageItem } from "lib/localStorage";
import { usePaymentInformation } from "contexts/paymentInformationContext";
import { formatImpact } from "lib/formatters/impactFormatter";
import { useIntegrationId } from "hooks/useIntegrationId";
import { useWalletContext } from "contexts/walletContext";
import { useCryptoPayment } from "contexts/cryptoPaymentContext";
import useNavigation from "hooks/useNavigation";
import { logEvent } from "lib/events";
import { stringToNumber } from "lib/formatters/stringToNumberFormatter";
import * as S from "./styles";

const { tertiary } = theme.colors.brand;

type Props = {
  nonProfit: NonProfit | undefined;
};

const CURRENT_OFFER_INDEX_KEY = "CURRENT_OFFER_INDEX_KEY";

function SelectOfferPage({ nonProfit }: Props): JSX.Element {
  const [maxRange, setMaxRange] = useState(0);
  const { navigateTo } = useNavigation();
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const [currentOffer, setCurrentOffer] = useState<Offer>();
  const [currentAmount, setCurrentAmount] = useState<string>("5");
  const { currentCoin, setCurrentCoin, setFlow, setOfferId } =
    usePaymentInformation();
  const { offers, refetch: refetchOffers } = useOffers(currentCoin, false);
  const { connectWallet, wallet } = useWalletContext();
  const {
    setAmount,
    handleDonationToContract,
    userBalance,
    tokenSymbol,
    setCurrentPool,
  } = useCryptoPayment();
  const integrationId = useIntegrationId();

  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportNonProfitPage.selectOfferSection",
  });

  const { nonProfitImpact, refetch: refetchNonProfitImpact } =
    useNonProfitImpact(nonProfit?.id, currentOffer?.priceValue, currentCoin);

  const handleOfferChange = (offer: Offer) => {
    setCurrentOffer(offer);
    setOfferId(offer.id);
  };

  const onOfferChange = (offer: Offer) => {
    handleOfferChange(offer);

    const offerValue = removeInsignificantZeros(offer.price);
    const currentValue = offerValue;

    setAmount(currentValue.toString());
    setCurrentAmount(currentValue.toString());
  };

  useEffect(() => {
    if (nonProfit && nonProfit.cause?.pools?.length > 0) {
      const pool = nonProfit.cause.pools[nonProfit.cause.pools.length - 1];
      setCurrentPool(pool?.address);
    }
  }, [nonProfit]);

  useEffect(() => {
    if (currentOffer) refetchNonProfitImpact();
  }, [currentOffer]);

  useEffect(() => {
    refetchOffers();
  }, [currentCoin]);

  useEffect(() => {
    setMaxRange(offers.length - 1);
    setCurrentOffer(offers[currentOfferIndex]);
  }, [offers]);

  useEffect(() => {
    if (currentOffer) {
      onOfferChange(currentOffer);
    }
  }, [currentOffer]);

  useEffect(() => {
    setCurrentOffer(offers[currentOfferIndex]);
    setLocalStorageItem(CURRENT_OFFER_INDEX_KEY, currentOfferIndex.toString());
  }, [currentOfferIndex]);

  const onCurrencyChanged = (currency: Currencies) => {
    setCurrentCoin(currency);
    setCurrentOfferIndex(0);
    setAmount("");
    setCurrentAmount("");
  };

  const onDonationToContractSuccess = () => {
    navigateTo({
      pathname: "/contribution-done",
      state: {
        hasButton: true,
        nonProfit,
        flow: "nonProfit",
      },
    });
  };

  const donateButtonText = () => {
    if (currentCoin === Currencies.USDC) {
      if (wallet)
        return t("donateButtonText", {
          value: `${currentAmount} ${tokenSymbol}`,
        });
      else return t("connectWalletButtonText");
    } else {
      return t("donateButtonText", { value: `${currentAmount}` });
    }
  };

  const insufficientBalance = () => {
    const amountNumber = stringToNumber(currentAmount);
    const userBalanceNumber = stringToNumber(userBalance);

    return amountNumber > userBalanceNumber;
  };

  const disableButton = () =>
    currentAmount === "0" || (wallet && insufficientBalance()) || false;

  const navigateToCheckout = () => {
    if (currentOffer && nonProfit) {
      logEvent("giveNgoBtn_start", {
        from: "giveNonProfit_page",
        nonProfitId: nonProfit.id,
        currency: currentOffer?.currency,
        amount: currentOffer?.priceValue,
      });
      setFlow("nonProfit");

      const searchParams = new URLSearchParams({
        offer: currentOffer.priceCents.toString(),
        target: "non_profit",
        target_id: nonProfit.id.toString(),
        currency: currentOffer.currency.toUpperCase(),
        integration_id: integrationId?.toString() || "",
      });

      navigateTo({
        pathname: "/promoters/recurrence",
        search: searchParams.toString(),
      });
    }
  };

  const handleDonateClick = async () => {
    if (currentCoin === Currencies.USDC) {
      if (wallet && nonProfit) {
        await handleDonationToContract(
          Number(nonProfit.cause.id),
          onDonationToContractSuccess,
          nonProfit,
        );
      } else connectWallet();
    } else {
      navigateToCheckout();
    }
  };

  const currentPrice = () =>
    currentOffer && formatPrice(currentOffer.priceValue, currentOffer.currency);

  const oldImpactFormat = () => (
    <S.CauseText>
      {currentPrice()} {t("fundText")}{" "}
      <S.CauseTextHighlight>
        {nonProfitImpact && formatImpact(nonProfitImpact.formattedImpact)}
      </S.CauseTextHighlight>
    </S.CauseText>
  );
  const renderCurrentBlock = () => oldImpactFormat();

  return (
    <S.Container>
      <S.Title>{nonProfit?.name}</S.Title>
      {currentCoin !== Currencies.USDC && renderCurrentBlock()}
      <S.ValueContainer>
        {currentCoin === Currencies.USDC ? (
          <S.ValueInputContainer>
            <S.ValueInput
              value={currentAmount}
              name="value-input"
              onChange={(event) => {
                setCurrentAmount(event.target.value);
                setAmount(event.target.value);
              }}
            />
          </S.ValueInputContainer>
        ) : (
          <S.ValueText>{currentPrice()}</S.ValueText>
        )}

        <S.CurrencySelectorContainer>
          <S.CurrencySelector
            values={[Currencies.BRL, Currencies.USD, Currencies.USDC]}
            name="currency"
            onOptionChanged={onCurrencyChanged}
            defaultValue={currentCoin}
            containerId={`currency-selector-${nonProfit?.id}`}
            customInputStyles={{
              borderColor: tertiary[800],
              height: 40,
              marginBottom: 0,
              color: tertiary[800],
              width: 80,
            }}
          />
        </S.CurrencySelectorContainer>
      </S.ValueContainer>
      {currentCoin !== Currencies.USDC && (
        <S.Slider>
          <InputRange
            value={currentOfferIndex}
            min={0}
            max={maxRange}
            onChange={(event) => {
              setCurrentOfferIndex(event.target.value);
            }}
            color={tertiary[400]}
          />
        </S.Slider>
      )}
      {wallet && currentCoin === Currencies.USDC && (
        <S.UserBalanceText>
          {t("userBalanceText")}
          <S.UserBalanceTextHighlight>
            {userBalance} {tokenSymbol}
          </S.UserBalanceTextHighlight>
        </S.UserBalanceText>
      )}
      <S.DonateButton
        text={donateButtonText()}
        onClick={handleDonateClick}
        disabled={disableButton()}
      />
    </S.Container>
  );
}

export default SelectOfferPage;
