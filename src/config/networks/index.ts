export const networks = [
  {
    chainName: "Polygon Mainnet",
    ribonContractAddress: "0xE2847c17Be357b1536De359cb6799D367F8ad2ec",
    donationTokenContractAddress: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    chainId: 137,
    rpcUrls: "https://polygon-rpc.com/",
    nodeUrl:
      "https://polygon-mainnet.g.alchemy.com/v2/AQ0VSr7KiK3U6h9zXJsKV5PRA52iRVJQ",
    symbolName: "MATIC",
    currencyName: "Matic",
    blockExplorerUrls: "https://polygonscan.com/",
    defaultPoolAddress: "0x2108f76aB221999f3Af6d85567cF1c6C14E2A0D1",
    subgraphUrl:
      "https://api.thegraph.com/subgraphs/name/ribondao/subgraphribon",
  },
  {
    chainName: "Mumbai Testnet",
    ribonContractAddress: "0xF02a09B21267EDB53B459ddC802C60245dEfbE34",
    donationTokenContractAddress: "0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1",
    chainId: 0x13881,
    rpcUrls: "https://rpc-mumbai.maticvigil.com",
    nodeUrl:
      "https://polygon-mumbai.g.alchemy.com/v2/1fEWpdSHuohPveNBGvlozE6qv9P1uAks",
    symbolName: "MATIC",
    currencyName: "Matic",
    blockExplorerUrls: "https://mumbai.polygonscan.com/",
    defaultPoolAddress: "0x9B00b1a3C4ea8BFbBE984360513f7bE7e971e431",
    subgraphUrl:
      "https://api.thegraph.com/subgraphs/name/ribondao/ribonsubgraph",
  },
  {
    chainName: "Localhost 8545",
    ribonContractAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    donationTokenContractAddress: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    chainId: 0x539,
    rpcUrls: "http://localhost:8545",
    nodeUrl: "http://localhost:8545",
    symbolName: "ETH",
    currencyName: "Ether",
    blockExplorerUrls: "http://localhost:8545",
    defaultPoolAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    subgraphUrl: "http://localhost:8020/",
  },
];
