import LayoutHeader from "layouts/LayoutHeader";
import Navigation from "config/routes/Navigation";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import Treasure from "assets/icons/treasure-icon-green.svg";
import { useWalletContext } from "contexts/walletContext";
import { onAccountChange } from "lib/walletConnector";
import WalletIcon from "assets/icons/wallet-icon.svg";
import { logEvent } from "services/analytics";
import { walletTruncate } from "lib/formatters/walletTruncate";
import { useNetworkContext } from "contexts/networkContext";
import useNavigation from "hooks/useNavigation";
import * as S from "./styles";

export type Props = {
  children: JSX.Element;
  hideNavigation?: boolean;
  hasBackButton?: boolean;
  hideWallet?: boolean;
};

function WalletLayout({
  children,
  hideNavigation = false,
  hasBackButton = false,
  hideWallet = false,
}: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "layouts.walletLayout",
  });
  const { connectWallet, wallet, checkIfWalletIsConnected, setWallet } =
    useWalletContext();

  const { navigateTo } = useNavigation();
  const { isValidNetwork } = useNetworkContext();
  const handleAccountChange = (accounts: string[]) => {
    setWallet(accounts[0]);
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    onAccountChange(handleAccountChange);
  }, []);

  const handleWalletButtonClick = () => {
    logEvent("treasureConWalletBtn_click", {
      from: "walletButton",
    });
    connectWallet();
  };

  const handleTreasureButtonClick = () => {
    logEvent("fundTreasurePageBtn_click");
    navigateTo("/promoters/treasure");
  };

  const walletButtonText = () => {
    if (!wallet || !isValidNetwork) return t("connectWallet");

    return walletTruncate(wallet);
  };

  return (
    <>
      {!hideNavigation && <Navigation />}

      <S.Container>
        {!hideWallet && (
          <LayoutHeader
            hasBackButton={hasBackButton}
            rightComponent={
              <S.RightContainer>
                <S.WalletButton
                  text={walletButtonText()}
                  onClick={handleWalletButtonClick}
                  outline
                  round
                  rightIcon={WalletIcon}
                  size="small"
                />
                <S.TreasureButton onClick={handleTreasureButtonClick}>
                  <S.Treasure src={Treasure} />
                </S.TreasureButton>
              </S.RightContainer>
            }
            hideWallet
          />
        )}
        {hideWallet && (
          <LayoutHeader hasBackButton={hasBackButton} hideWallet />
        )}

        <S.BodyContainer>{children}</S.BodyContainer>
      </S.Container>
    </>
  );
}

export default WalletLayout;
