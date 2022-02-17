import RibonAbi from "utils/abis/Ribon.json";
import TokenAbi from "utils/abis/DonationToken.json";
import { ethers } from "ethers";
import { useWalletContext } from "contexts/walletContext";
import { useContract } from "hooks/useContract";
import { useNetwork } from "hooks/useNetwork";
import * as S from "./styles";

function Protocol(): JSX.Element {
  const { wallet, connectWallet } = useWalletContext();
  const { isValidNetwork, currentNetwork } = useNetwork();
  const contract = useContract({
    address: "0xf78e690500Fa6f544F8940e930C52d8d4d7468a4",
    ABI: RibonAbi.abi,
  });
  const donationToken = useContract({
    address: "0x21A72dc641c8e5f13717a7e087d6D63B4f9A3574",
    ABI: TokenAbi.abi,
  });

  // async function getIntegrations() {
  //   console.log(contract);
  //   const integrations = await contract?.getDonationPoolBalance();
  //   console.log(integrations);
  // }

  async function addNonProfitToWhitelist() {
    await contract?.addNonProfitToWhitelist(
      "0xf3b2a5c54aa76970471820bD1BF1e90E64f2Cfc5",
    );
  }

  async function removeNonProfitToWhitelist() {
    await contract?.removeNonProfitFromWhitelist(
      "0xf3b2a5c54aa76970471820bD1BF1e90E64f2Cfc5",
    );
  }
  
  async function addDonationPoolBalance() {
    await donationToken?.approve(contract?.address, ethers.utils.parseEther("1"), {from: wallet});
    await contract?.addDonationPoolBalance(ethers.utils.parseEther("1"), {from: wallet});
  }

  async function updateIntegrationBalance() {
    await contract?.updateIntegrationBalance(wallet, ethers.utils.parseEther("1"));
  }

  async function donateThroughIntegration() {
    await contract?.donateThroughIntegration("0xf3b2a5c54aa76970471820bd1bf1e90e64f2cfc5",  wallet, ethers.utils.parseEther("1"));
  }

  return (
    <S.Container>
      <h1>Protocol</h1>
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
      <p><button type="button" onClick={addDonationPoolBalance}>
        increase pool balance (promoter)
      </button></p>
      <p><button type="button" onClick={updateIntegrationBalance}>
        update integration balance (integration)
      </button></p>
      <p><button type="button" onClick={donateThroughIntegration}>
      donate Through Integration (donations)
      </button></p>
    </S.Container>
  );
}

export default Protocol;
