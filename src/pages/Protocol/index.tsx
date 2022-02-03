import RibonAbi from "utils/abis/Ribon.json";
import { useWalletContext } from "contexts/walletContext";
import { useContract } from "hooks/useContract";
import { useNetwork } from "hooks/useNetwork";
import * as S from "./styles";

function Protocol(): JSX.Element {
  const { wallet, connectWallet } = useWalletContext();
  const { isValidNetwork, currentNetwork } = useNetwork();
  const contract = useContract({
    address: "0xF471e129127D04d1167f7dFb82c6C0ce3c92d387",
    ABI: RibonAbi.abi,
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

  return (
    <S.Container>
      <h1>Protocol</h1>
      <button type="button" onClick={connectWallet}>
        Conectar Carteira
      </button>
      <p>wallet: {wallet}</p>
      <p>
        network: {currentNetwork?.chainId} (
        {isValidNetwork() ? "valid" : "invalid"})
      </p>
      <button type="button" onClick={addNonProfitToWhitelist}>
        teste
      </button>
    </S.Container>
  );
}

export default Protocol;
