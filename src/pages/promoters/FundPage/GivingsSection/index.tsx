import { useTranslation } from "react-i18next";
import Carousel from "components/moleculars/sliders/Carousel";
import CardDoubleTextDividerButton from "components/moleculars/cards/CardDoubleTextDividerButton";
import useBreakpoint from "hooks/useBreakpoint";
import Button from "components/atomics/Button";
import { logError } from "services/crashReport";
import { formatFromWei } from "lib/web3Helpers/etherFormatters";
import { formatDate } from "lib/web3Helpers/timeStampFormatters";
import { useEffect, useState, useCallback } from "react";
import { logEvent } from "services/analytics";
import useNavigation from "hooks/useNavigation";
import usePromoterDonations from "hooks/apiTheGraphHooks/usePromoterDonations";
import { useWalletContext } from "contexts/walletContext";
import { useLocation } from "react-router-dom";
import { useProvider } from "hooks/useProvider";
import { useContract } from "hooks/useContract";
import { RIBON_CONTRACT_ADDRESS } from "utils/contractUtils";
import { BigNumber } from "ethers";
import RibonAbi from "utils/abis/RibonAbi.json";
import useToast from "hooks/useToast";
import RightArrowBlack from "./assets/right-arrow-black.svg";
import { ReactComponent as BlueRightArrow } from "./assets/right-arrow-blue.svg";
import * as S from "./styles";

type LocationStateType = {
  id: string;
  timestamp: number;
  amountDonated: BigNumber;
  processing: boolean;
};

function GivingsSection(): JSX.Element {
  const [promoterDonations, setPromoterDonations] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const provider = useProvider();
  const { navigateTo } = useNavigation();
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.fundPage.givingsSection",
  });
  const { wallet, connectWallet } = useWalletContext();
  const { getPromoterDonations } = usePromoterDonations();
  const { isMobile } = useBreakpoint();
  const coin = "USDC";
  const contract = useContract({
    address: RIBON_CONTRACT_ADDRESS,
    ABI: RibonAbi.abi,
  });
  const { state } = useLocation<LocationStateType>();
  const [processingTransaction, setProcessingTransaction] = useState<boolean>(
    state?.processing,
  );

  const handleShowGivingsButtonClick = () => {
    logEvent("fundShowGivingsListBtn_click", {
      from: "yourGivingsCarousel",
    });
    if (wallet) {
      navigateTo("/promoters/show-givings");
      return;
    }
    connectWallet();
  };

  const fetchPromoterDonations = useCallback(
    async (user: string) => {
      setLoading(true);
      try {
        const donations = await getPromoterDonations(user, isMobile ? 2 : 3);
        setPromoterDonations(donations.promoterDonations);
      } catch (e) {
        logError(e);
      } finally {
        setLoading(false);
      }
    },
    [wallet],
  );

  const transactionIsBeingProcessed = useCallback(
    async (hash: string) => {
      if (!hash) return;
      try {
        const receipt = await provider?.getTransactionReceipt(hash);
        if (receipt) {
          setProcessingTransaction(false);
          setPromoterDonations((prevState: any) => [
            { ...state, processing: false },
            ...prevState,
          ]);
          window.history.replaceState({}, "");
          toast({
            message: t("transactionSuccessText"),
            type: "success",
            link: `https://mumbai.polygonscan.com/tx/${hash}`,
          });
        }
      } catch (e) {
        logError(e);
        toast({
          message: t("transactionFailedText"),
          type: "error",
          link: `https://mumbai.polygonscan.com/tx/${hash}`,
        });
      }
    },
    [promoterDonations],
  );

  const handleSupportButtonClick = () => {
    if (wallet) {
      logEvent("fundSupportBtn_click", {
        from: "giveNow",
      });
      navigateTo("/promoters/support-fund");
      return;
    }

    connectWallet();
  };

  useEffect(() => {
    if (wallet) {
      fetchPromoterDonations(wallet);
    }
  }, [wallet]);

  useEffect(() => {
    contract?.on("PoolBalanceIncreased", () => {
      transactionIsBeingProcessed(state?.id);
    });
  }, []);

  function concatLinkHash(hash: string) {
    return `https://mumbai.polygonscan.com/tx/${hash}`;
  }

  function shouldRenderCarousel() {
    return promoterDonations?.length !== 0 && wallet;
  }

  function renderProcessingTransaction() {
    if (processingTransaction) {
      return (
        <CardDoubleTextDividerButton
          key={state.id}
          firstText={formatDate(state.timestamp).toString()}
          mainText={formatFromWei(state.amountDonated)}
          rightComplementText={coin}
          buttonText={t("linkTransactionText")}
          rightComponentButton={RightArrowBlack}
          link={concatLinkHash(state.id)}
          processingText={t("processingText")}
          processing={processingTransaction}
        />
      );
    }
    return null;
  }

  function renderCardsCarousel() {
    return promoterDonations?.map((item: any) => (
      <CardDoubleTextDividerButton
        key={item.id}
        firstText={formatDate(item.timestamp).toString()}
        mainText={formatFromWei(item.amountDonated)}
        rightComplementText={coin}
        buttonText={t("linkTransactionText")}
        rightComponentButton={RightArrowBlack}
        link={concatLinkHash(item.id)}
      />
    ));
  }
  return (
    <S.Container>
      <S.SectionTitle>{t("subtitleGivings")}</S.SectionTitle>
      {shouldRenderCarousel() ? (
        !loading && (
          <Carousel sliderPerView={isMobile ? 1.8 : 4} spacing={-10}>
            {renderProcessingTransaction()}
            {renderCardsCarousel()}
            {false && (
              <S.LastCardCarousel
                onClick={() => {
                  handleShowGivingsButtonClick();
                }}
              >
                <BlueRightArrow />
                <S.TextLastCard>{t("textLastCard")}</S.TextLastCard>
              </S.LastCardCarousel>
            )}
          </Carousel>
        )
      ) : (
        <S.CardBlank>
          <S.GivingText>{t("firstGivingText")}</S.GivingText>
          <Button
            text={t("firstGivingButtonText")}
            onClick={handleSupportButtonClick}
          />
        </S.CardBlank>
      )}
    </S.Container>
  );
}
export default GivingsSection;
