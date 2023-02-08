import LayoutHeader from "layouts/LayoutHeader";
import Navigation from "config/routes/Navigation";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useWalletContext } from "contexts/walletContext";
import { onAccountChange } from "lib/walletConnector";
import WalletIcon from "assets/icons/wallet-icon.svg";
import { logEvent } from "lib/events";
import { walletTruncate } from "lib/formatters/walletTruncate";
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

  const walletButtonText = () => {
    if (!wallet) return t("connectWallet");

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
