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

function ProtocolPage(): JSX.Element {
  const { wallet, connectWallet } = useWalletContext();
  const { isValidNetwork, currentNetwork } = useNetwork();
  const contract = useContract({
    address: "0x1B68da1C6FAfc10eDD0d724bC0c52928764a2c6f",
    ABI: RibonAbi.abi,
  });
  const donationToken = useContract({
    address: "0x3cC080dF7872a93B52C44Bd1EB120681516554e6",
    ABI: TokenAbi.abi,
  });

  async function addNonProfitToWhitelist() {
    await contract?.addNonProfitToWhitelist(
      "0xF20c382d2A95EB19f9164435aed59E5C59bc1fd9",
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
      "0xf3b2a5c54aa76970471820bd1bf1e90e64f2cfc5",
      wallet,
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
