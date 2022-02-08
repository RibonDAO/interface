import RibonAbi from "utils/abis/Ribon.json";
import TokenAbi from "utils/abis/DonationToken.json";
import { useWalletContext } from "contexts/walletContext";
import { useContract } from "hooks/useContract";
import { useNetwork } from "hooks/useNetwork";
import * as S from "./styles";

function Protocol(): JSX.Element {
  const { wallet, connectWallet } = useWalletContext();
  const { isValidNetwork, currentNetwork } = useNetwork();
  const contract = useContract({
    address: "0xA63B4b2cb11B79a535c7B8b9269E729b4d7cE056",
    ABI: RibonAbi.abi,
  });
  const donationToken = useContract({
    address: "0x64F7AA155240c3D754C35CF56cb3f3AcaB488635",
    ABI: TokenAbi.abi,
  });

  // async function getIntegrations() {
  //   console.log(contract);
  //   const integrations = await contract?.getDonationPoolBalance();
  //   console.log(integrations);
  // }

  async function addNonProfitToWhitelist() {
    await contract?.addNonProfitToWhitelist(
      "0x7cb806A5C2f400AbAae7e9b688D87e482776EEE5",
    );
  }

  async function addDonationPoolBalance() {
    await donationToken?.approve(contract?.address, 2);
    await contract?.addDonationPoolBalance(2);
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
      <button type="button" onClick={addDonationPoolBalance}>
        add donation balance
      </button>
    </S.Container>
  );
}

export default Protocol;
