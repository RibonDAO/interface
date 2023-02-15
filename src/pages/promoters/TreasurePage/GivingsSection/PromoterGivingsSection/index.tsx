import { useTranslation } from "react-i18next";
import Carousel from "components/moleculars/sliders/Carousel";
import CardDoubleTextDividerButton from "components/moleculars/cards/CardDoubleTextDividerButton";
import useBreakpoint from "hooks/useBreakpoint";
import { TransactionStatus } from "types/enums/TransactionStatus";
import { logError } from "services/crashReport";
import {
  formatFromDecimals,
  formatFromWei,
} from "lib/web3Helpers/etherFormatters";
import { formatDate } from "lib/web3Helpers/timeStampFormatters";
import { useEffect, useState, useCallback } from "react";
import { logEvent } from "lib/events";
import useNavigation from "hooks/useNavigation";
import usePromoterDonations from "hooks/apiTheGraphHooks/usePromoterDonations";
import { useWalletContext } from "contexts/walletContext";
import { useLocation } from "react-router-dom";
import { useProvider } from "hooks/useProvider";
import { useContract } from "hooks/useContract";
import { useNetworkContext } from "contexts/networkContext";
import { BigNumber } from "ethers";
import RibonAbi from "utils/abis/RibonAbi.json";
import useToast from "hooks/useToast";
import {
  useCryptoTransaction,
  usePromoterCardGivings,
} from "@ribon.io/shared/hooks";
import TreasureIcon from "assets/icons/treasure-off-icon.svg";
import RightArrowBlack from "assets/icons/right-arrow-black.svg";
import { ReactComponent as BlueRightArrow } from "assets/icons/right-arrow-blue.svg";
import useTokenDecimals from "hooks/useTokenDecimals";
import { useCurrentUser } from "contexts/currentUserContext";
import { useCardPaymentInformation } from "contexts/cardPaymentInformationContext";
import * as S from "../styles";
import sortDonationsByDate, { paidDate } from "./lib/sortDonationsByDate";

type LocationStateType = {
  id: string;
  timestamp: number;
  amountDonated: BigNumber;
  processing: boolean;
  processed: boolean;
};

function GivingsSection(): JSX.Element {
  const [promoterDonations, setPromoterDonations] = useState<any>();
  const [allPromoterDonations, setAllPromoterDonations] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const provider = useProvider();
  const { navigateTo } = useNavigation();
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.treasurePage.givingsSection",
  });
  const { wallet, connectWallet } = useWalletContext();
  const { getPromoterDonations } = usePromoterDonations();
  const { currentUser } = useCurrentUser();
  const { currentCoin } = useCardPaymentInformation();
  const { promoterCardGivings } = usePromoterCardGivings(
    currentUser?.email,
    currentCoin,
  );
  const { updateTransactionStatus } = useCryptoTransaction();
  const { isMobile } = useBreakpoint();
  const { currentNetwork } = useNetworkContext();
  const coin = "USDC";
  const { state } = useLocation<LocationStateType>();
  const { tokenDecimals } = useTokenDecimals();
  const [processingTransaction, setProcessingTransaction] = useState<boolean>(
    state?.processing,
  );
  const contract = useContract({
    address: currentNetwork.ribonContractAddress,
    ABI: RibonAbi.abi,
  });

  const handleShowGivingsButtonClick = () => {
    logEvent("treasureShowGivingsListBtn_click", {
      from: "yourGivingsCarousel",
    });
    if (wallet) {
      navigateTo("/promoters/show-givings");
      return;
    }
    connectWallet();
  };

  const fetchPromoterDonations = useCallback(
    async (promoter: string) => {
      setLoading(true);
      try {
        const donations = await getPromoterDonations(
          promoter,
          isMobile ? 2 : 3,
        );
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
          state.processed = true;
          updateTransactionStatus(state.id, TransactionStatus.SUCCESS);
          setPromoterDonations((prevState: any) => [
            { ...state, processing: false },
            ...prevState,
          ]);
          window.history.replaceState({}, "");
          toast({
            message: t("transactionSuccessText"),
            type: "success",
            link: `${currentNetwork.blockExplorerUrls}tx/${hash}`,
            linkMessage: t("linkMessageToast"),
          });
        }
      } catch (e) {
        logError(e);
        updateTransactionStatus(state.id, TransactionStatus.FAILED);
        toast({
          message: t("transactionFailedText"),
          type: "error",
          link: `${currentNetwork.blockExplorerUrls}tx/${hash}`,
        });
      }
    },
    [promoterDonations],
  );

  useEffect(() => {
    if (wallet) {
      fetchPromoterDonations(wallet);
    }
  }, [wallet]);

  useEffect(() => {
    const onlyCrypto = wallet && (!currentUser || !promoterCardGivings);
    const onlyCard = !wallet && currentUser && promoterCardGivings;
    const both = !!wallet && !!currentUser && !!promoterCardGivings;

    if (both) {
      setAllPromoterDonations(promoterCardGivings?.concat(promoterDonations));
    } else if (onlyCrypto) {
      setAllPromoterDonations(promoterDonations);
    } else if (onlyCard) {
      setAllPromoterDonations(promoterCardGivings);
    }
  }, [promoterDonations, promoterCardGivings, wallet, currentUser]);

  useEffect(() => {
    if (state?.processing) {
      contract?.on("PoolBalanceIncreased", () => {
        transactionIsBeingProcessed(state?.id);
      });
    }
  }, []);

  function concatLinkHash(hash: string) {
    return `${currentNetwork.blockExplorerUrls}tx/${hash}`;
  }

  const shouldRenderCarousel = () => allPromoterDonations?.length;

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

  function renderAllPromoterDonations() {
    const allDonations = sortDonationsByDate(allPromoterDonations);
    const isCryptoDonation = (item: any) => !!item.timestamp;
    return allDonations?.map((item: any) =>
      isCryptoDonation(item) ? (
        <CardDoubleTextDividerButton
          key={item.id}
          firstText={formatDate(item.timestamp).toString()}
          mainText={
            item.processed
              ? formatFromWei(item.amountDonated)
              : formatFromDecimals(item.amountDonated, tokenDecimals).toFixed(2)
          }
          rightComplementText={coin}
          buttonText={t("linkTransactionText")}
          rightComponentButton={RightArrowBlack}
          link={concatLinkHash(item.id)}
        />
      ) : (
        <CardDoubleTextDividerButton
          key={item.id}
          firstText={paidDate(item.paidDate)}
          mainText={item.cryptoAmount}
          rightComplementText={coin}
          buttonText={
            item.status === "refunded" ? t("refunded") : t("cardDonationText")
          }
          refunded={item.status === "refunded"}
        />
      ),
    );
  }

  return (
    <S.Container>
      <S.SectionTitle>{t("subtitleYourGivings")}</S.SectionTitle>
      {shouldRenderCarousel() ? (
        !loading && (
          <Carousel sliderPerView={isMobile ? 1.8 : 4} spacing={-10}>
            {renderProcessingTransaction()}
            {renderAllPromoterDonations()}
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
          <S.Image src={TreasureIcon} alt="treasure" />
          <S.GivingText>{t("firstGivingText")}</S.GivingText>
        </S.CardBlank>
      )}
    </S.Container>
  );
}
export default GivingsSection;
