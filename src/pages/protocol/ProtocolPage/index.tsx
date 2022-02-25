import RibonAbi from "utils/abis/Ribon.json";
import TokenAbi from "utils/abis/DonationToken.json";
import { ethers } from "ethers";
import { useWalletContext } from "contexts/walletContext";
import { useContract } from "hooks/useContract";
import { useNetwork } from "hooks/useNetwork";
import Integrations from "../IntegrationsPage";
import NonProfits from "../NonProfitsPage";
import * as S from "../styles";
import Promoters from "../PromotersPage";
import UserImpactPage from "../UserImpactPage";

function ProtocolPage(): JSX.Element {
  const { wallet, connectWallet } = useWalletContext();
  const { isValidNetwork, currentNetwork } = useNetwork();
  const contract = useContract({
    address: "0x93Db1426dAee2a1F0dD7dC5FDc3521d7e6A508Ba",
    ABI: RibonAbi.abi,
  });
  const donationToken = useContract({
    address: "0xb118E50D4e32b1cb799b7CB97648c1c9073e7E4f",
    ABI: TokenAbi.abi,
  });

  async function addNonProfitToWhitelist() {
    await contract?.addNonProfitToWhitelist(
      "0x6E060041D62fDd76cF27c582f62983b864878E8F",
    );
  }

  async function removeNonProfitToWhitelist() {
    await contract?.removeNonProfitFromWhitelist(
      "0xf3b2a5c54aa76970471820bD1BF1e90E64f2Cfc5",
    );
  }

  async function addDonationPoolBalance() {
    await donationToken?.approve(
      contract?.address,
      ethers.utils.parseEther("1"),
      { from: wallet },
    );
    await contract?.addDonationPoolBalance(ethers.utils.parseEther("1"), {
      from: wallet,
    });
  }

  async function updateIntegrationBalance() {
    await contract?.updateIntegrationBalance(
      wallet,
      ethers.utils.parseEther("1"),
    );
  }

  async function donateThroughIntegration() {
    await contract?.donateThroughIntegration(
      "0x6e060041d62fdd76cf27c582f62983b864878e8f",
      "9777fb9be919ed2900f02c5b7a081c7db4fa4f5351555e555ca134e33e10966c",
      ethers.utils.parseEther("1"),
    );
  }

  async function getDonationPoolBalance() {
    const balance = await contract?.donationPoolBalance();
    console.log(Number(balance));
  }

  return (
    <S.Container>
      <h1>Protocol</h1>
      <h1>Ngos</h1>
      <NonProfits />
      <h1>Integrations</h1>
      <Integrations />
      <h1>Promoter</h1>
      <Promoters />
      <h1>UserImpact</h1>
      <UserImpactPage />
      <button type="button" onClick={connectWallet}>
        Conectar Carteira
      </button>
      <p>wallet: {wallet}</p>
      <p>
        {" "}
        network: {currentNetwork?.chainId} ({" "}
        {isValidNetwork() ? "valid" : "invalid"}){" "}
      </p>
      <button type="button" onClick={addNonProfitToWhitelist}>
        add whitelist
      </button>
      <button type="button" onClick={removeNonProfitToWhitelist}>
        remove whitelist
      </button>
      <p>
        <button type="button" onClick={addDonationPoolBalance}>
          increase pool balance (promoter)
        </button>
      </p>
      <p>
        <button type="button" onClick={updateIntegrationBalance}>
          update integration balance (integration)
        </button>
      </p>
      <p>
        <button type="button" onClick={donateThroughIntegration}>
          donate Through Integration (donations)
        </button>
      </p>
      <p>
        <button type="button" onClick={getDonationPoolBalance}>
          pool balance
        </button>
      </p>
    </S.Container>
  );
}

export default ProtocolPage;
