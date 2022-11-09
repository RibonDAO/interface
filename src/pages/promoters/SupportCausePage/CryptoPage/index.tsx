import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { logEvent } from "services/analytics";
import useCauses from "hooks/apiHooks/useCauses";
import Cause from "types/entities/Cause";
import IntersectBackground from "assets/images/intersect-background.svg";
import useNavigation from "hooks/useNavigation";
import { useCardPaymentInformation } from "contexts/cardPaymentInformationContext";
import { useWalletContext } from "contexts/walletContext";
import { useCryptoPayment } from "contexts/cryptoPaymentContext";
import { BigNumber } from "ethers";
import { useNetworkContext } from "contexts/networkContext";
import useToast from "hooks/useToast";
import * as S from "../styles";
import UserSupportSection from "../../SupportTreasurePage/CardSection/UserSupportSection";
import SupportImage from "../assets/support-image.png";
import SelectCryptoOfferSection from "./SelectCryptoOfferSection";

function CryptoPage(): JSX.Element {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);
  const { navigateTo } = useNavigation();
  const { cause, setCause } = useCardPaymentInformation();
  const { connectWallet, wallet } = useWalletContext();
  const {
    amount,
    setAmount,
    disableButton,
    handleDonationToContract,
    userBalance,
    tokenSymbol,
  } = useCryptoPayment();
  const { currentNetwork } = useNetworkContext();
  const { causes } = useCauses();
  const toast = useToast();

  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportCausePage",
  });
  const { t: treasureTranslation } = useTranslation("translation", {
    keyPrefix: "promoters.supportTreasurePage",
  });

  useEffect(() => {
    logEvent("causeSupportScreen_view");
  }, []);

  useEffect(() => {
    setCause(causes[0]);
  }, [JSON.stringify(causes)]);

  const handleCauseClick = (causeClicked: Cause, index: number) => {
    logEvent("supportCauseSelection_click", {
      id: causeClicked?.id,
    });
    setCause(causeClicked);
    setSelectedButtonIndex(index);
  };

  function renderCausesButtons() {
    return causes?.map((item, index) => (
      <S.Button
        outline={index !== selectedButtonIndex}
        onClick={() => handleCauseClick(item, index)}
        key={item?.id}
      >
        <S.ButtonText>{item.name}</S.ButtonText>
      </S.Button>
    ));
  }

  const onDonationToContractSuccess = (
    hash: string,
    timestamp: number,
    amountDonated: BigNumber,
  ) => {
    toast({
      message: treasureTranslation("transactionOnBlockchainText"),
      type: "success",
      link: `${currentNetwork.blockExplorerUrls}tx/${hash}`,
      linkMessage: treasureTranslation("linkMessageToast"),
    });
    logEvent("toastNotification_view", {
      status: "transactionProcessed",
    });

    navigateTo({
      pathname: "/donation-done",
      state: {
        hasButton: true,
        id: hash,
        timestamp,
        amountDonated,
        processing: true,
      },
    });
  };

  const handleDonateClick = async () => {
    if (wallet) {
      await handleDonationToContract(onDonationToContractSuccess);
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
    const PERCENTAGE_OF_INCREASE = 0.6;

    return `+ ${Number(amount) * PERCENTAGE_OF_INCREASE} ${tokenSymbol}`;
  };

  const donateButtonText = () => {
    if (wallet)
      return t("donateButtonText", { value: `${amount} ${tokenSymbol}` });

    return t("connectWalletButtonText");
  };

  return (
    <S.Container>
      <S.Title>{t("title")}</S.Title>
      <S.CausesContainer>{renderCausesButtons()}</S.CausesContainer>
      <S.ContentContainer>
        <S.SupportImage src={SupportImage} />
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
