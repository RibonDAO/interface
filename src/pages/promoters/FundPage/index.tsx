import { useTranslation } from "react-i18next";
import CardBlank from "components/moleculars/cards/CardBlank";
import Button from "components/atomics/Button";
import { useEffect, useState } from "react";
import { balanceOf, RIBON_CONTRACT_ADDRESS } from "utils/contractUtils";
import { useWalletContext } from "contexts/walletContext";
import * as S from "./styles";

function FundPage(): JSX.Element {
  const [donationPoolBalance, setDonationPoolBalance] = useState<number | null>(
    null,
  );
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.fundPage",
  });
  const { wallet, connectWallet } = useWalletContext();

  async function fetchContractBalance() {
    const balance = await balanceOf(RIBON_CONTRACT_ADDRESS);
    setDonationPoolBalance(Number(balance));
  }

  const handleSupportButtonClick = () => {
    if (wallet) {
      // navigate to form page
      return;
    }

    connectWallet();
  };

  useEffect(() => {
    fetchContractBalance();
  }, []);

  return (
    <S.Container>
      <S.Title>{t("title")}</S.Title>
      <S.Subtitle>{t("subtitle")}</S.Subtitle>

      <S.SectionTitle>{t("fundBalance")}</S.SectionTitle>
      <S.CardContainer>
        <CardBlank>
          <S.FundText>
            {donationPoolBalance} <S.FundTextCoin>USDC</S.FundTextCoin>
          </S.FundText>
          <Button
            text={t("fundSupportButtonText")}
            onClick={handleSupportButtonClick}
          />
        </CardBlank>
      </S.CardContainer>
    </S.Container>
  );
}

export default FundPage;
