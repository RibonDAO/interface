import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { logEvent } from "lib/events";
import { Cause } from "@ribon.io/shared/types";
import IntersectBackground from "assets/images/intersect-background.svg";
import useNavigation from "hooks/useNavigation";
import { useLocation } from "react-router-dom";
import { useCardPaymentInformation } from "contexts/cardPaymentInformationContext";
import { useWalletContext } from "contexts/walletContext";
import { useCryptoPayment } from "contexts/cryptoPaymentContext";
import GroupButtons from "components/moleculars/sections/GroupButtons";
import theme from "styles/theme";
import Intersection from "assets/images/intersection-image.svg";
import { SELECTED_CAUSE_ID } from "lib/sessionStorage/constants";
import { setSessionStorageItem } from "lib/sessionStorage";
import { useCausesContext } from "contexts/causesContext";
import SupportImage from "../assets/support-image.png";
import * as S from "../styles";
import UserSupportSection from "../../SupportTreasurePage/CardSection/UserSupportSection";
import SelectCryptoOfferSection from "./SelectCryptoOfferSection";

type LocationStateType = {
  causeDonated?: Cause;
};

function CryptoPage(): JSX.Element {
  const { secondary } = theme.colors.brand;
  const { navigateTo } = useNavigation();
  const { cause, setCause, nonProfit } = useCardPaymentInformation();
  const { activeCauses, chosenCause, setCurrentCauseId, currentCauseIndex } =
    useCausesContext();
  const { connectWallet, wallet } = useWalletContext();
  const {
    amount,
    setAmount,
    setCurrentPool,
    disableButton,
    handleDonationToContract,
    userBalance,
    tokenSymbol,
  } = useCryptoPayment();

  const { state } = useLocation<LocationStateType>();

  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportCausePage",
  });

  useEffect(() => {
    logEvent("causeSupportScreen_view");
  }, []);

  useEffect(() => {
    if (!cause) {
      setCause(state?.causeDonated || chosenCause);
    }
  }, [activeCauses, currentCauseIndex]);

  useEffect(() => {
    if (cause && cause.pools?.length > 0) {
      setCurrentPool(cause?.pools[cause.pools.length - 1].address);
    }
  }, [cause]);

  const handleCauseClick = (causeClicked: Cause) => {
    logEvent("supportCauseSelection_click", {
      id: causeClicked?.id,
    });
    setCause(causeClicked);
    setCurrentCauseId(causeClicked?.id);
    setSessionStorageItem(SELECTED_CAUSE_ID, causeClicked?.id.toString());
  };

  const onDonationToContractSuccess = () => {
    logEvent("toastNotification_view", {
      status: "transactionProcessed",
    });

    navigateTo({
      pathname: "/donation-done-cause",
      state: {
        hasButton: true,
        cause,
        nonProfit,
        flow: "cause",
      },
    });
  };

  const handleDonateClick = async () => {
    if (wallet && cause) {
      await handleDonationToContract(
        Number(cause.id),
        onDonationToContractSuccess,
      );
      return;
    }

    connectWallet();
    logEvent("treasureComCicleBtn_click");
  };

  const handleCommunityAddClick = () => {
    navigateTo({
      pathname: "/promoters/community-add",
      state: {
        donationAmount: `${amount} ${tokenSymbol}`,
      },
    });
  };

  const communityAddText = () => {
    const PERCENTAGE_OF_INCREASE = 0.2;

    return `+ ${(Number(amount) * PERCENTAGE_OF_INCREASE).toFixed(
      2,
    )} ${tokenSymbol}`;
  };

  const donateButtonText = () => {
    if (wallet)
      return t("donateButtonText", { value: `${amount} ${tokenSymbol}` });

    return t("connectWalletButtonText");
  };

  if (activeCauses.length === 0) {
    return <div />;
  }

  return (
    <S.Container>
      <S.Title>{t("title")}</S.Title>
      <GroupButtons
        elements={activeCauses}
        onChange={handleCauseClick}
        indexSelected={currentCauseIndex}
        nameExtractor={(element) => element.name}
        backgroundColor={secondary[700]}
        textColorOutline={secondary[700]}
        borderColor={secondary[700]}
        borderColorOutline={secondary[300]}
      />
      <S.ContentContainer>
        <S.SupportImage src={cause?.coverImage || SupportImage} />
        <S.Intersection src={Intersection} />
        <S.DonateContainer>
          <S.GivingContainer>
            <S.ContributionContainer>
              <SelectCryptoOfferSection
                cause={cause}
                onValueChange={(value: number) => setAmount(value.toString())}
              />
            </S.ContributionContainer>
            <S.CommunityAddContainer>
              <S.CommunityAddText>{t("communityAddText")}</S.CommunityAddText>
              <S.CommunityAddValue>{communityAddText()}</S.CommunityAddValue>
              <S.CommunityAddButton
                text={t("communityAddButtonText")}
                onClick={handleCommunityAddClick}
                outline
              />
            </S.CommunityAddContainer>
          </S.GivingContainer>
          {wallet && (
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
          <S.RefundText>{t("refundText")}</S.RefundText>
        </S.DonateContainer>
        <UserSupportSection />
      </S.ContentContainer>

      <S.BackgroundImage src={IntersectBackground} />
    </S.Container>
  );
}

export default CryptoPage;
