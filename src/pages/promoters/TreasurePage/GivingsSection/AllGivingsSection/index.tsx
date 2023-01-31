import { useTranslation } from "react-i18next";
import Carousel from "components/moleculars/sliders/Carousel";
import CardDoubleTextDividerButton from "components/moleculars/cards/CardDoubleTextDividerButton";
import useBreakpoint from "hooks/useBreakpoint";
import { logError } from "services/crashReport";
import { formatFromDecimals } from "lib/web3Helpers/etherFormatters";
import { formatDate } from "lib/web3Helpers/timeStampFormatters";
import { useEffect, useState, useCallback } from "react";
import { logEvent } from "lib/events";
import useNavigation from "hooks/useNavigation";
import usePromoterDonations from "hooks/apiTheGraphHooks/usePromoterDonations";
import { useWalletContext } from "contexts/walletContext";
import RightArrowBlack from "assets/icons/right-arrow-black.svg";
import { ReactComponent as BlueRightArrow } from "assets/icons/right-arrow-blue.svg";
import { useNetworkContext } from "contexts/networkContext";
import useTokenDecimals from "hooks/useTokenDecimals";
import * as S from "../styles";

function GivingsSection(): JSX.Element {
  const [allDonations, setAllDonations] = useState<any>();
  const { navigateTo } = useNavigation();
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.treasurePage.givingsSection",
  });
  const { wallet, connectWallet } = useWalletContext();
  const { getAllPromotersDonations } = usePromoterDonations();
  const { isMobile } = useBreakpoint();
  const { currentNetwork } = useNetworkContext();
  const { tokenDecimals } = useTokenDecimals();
  const coin = "USDC";

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

  const fetchAllDonations = useCallback(async () => {
    try {
      const donations = await getAllPromotersDonations(isMobile ? 2 : 3);
      setAllDonations(donations.promoterDonations);
    } catch (e) {
      logError(e);
    }
  }, []);

  useEffect(() => {
    fetchAllDonations();
  }, []);

  function concatLinkHash(hash: string) {
    return `${currentNetwork.blockExplorerUrls}tx/${hash}`;
  }

  function renderCardsCarouselAllGivings() {
    return allDonations?.map((item: any) => (
      <CardDoubleTextDividerButton
        key={item.id}
        firstText={formatDate(item.timestamp).toString()}
        mainText={formatFromDecimals(item.amountDonated, tokenDecimals).toFixed(
          2,
        )}
        rightComplementText={coin}
        buttonText={t("linkTransactionText")}
        rightComponentButton={RightArrowBlack}
        link={concatLinkHash(item.id)}
      />
    ));
  }

  return (
    <S.Container>
      <S.SectionTitle>{t("subtitleAllGivings")}</S.SectionTitle>
      <Carousel sliderPerView={isMobile ? 1.8 : 4} spacing={-10}>
        {renderCardsCarouselAllGivings()}
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
    </S.Container>
  );
}
export default GivingsSection;
