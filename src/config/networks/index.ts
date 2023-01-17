export const networks = [
  {
    chainName: "Polygon Mainnet",
    ribonContractAddress: "0x4Ef236DA69ac23a9246cd1d8866264f1A95601C0",
    donationTokenContractAddress: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    chainId: 137,
    rpcUrls: "https://polygon-rpc.com/",
    nodeUrl:
      "https://polygon-mainnet.g.alchemy.com/v2/AQ0VSr7KiK3U6h9zXJsKV5PRA52iRVJQ",
    symbolName: "MATIC",
    currencyName: "Matic",
    blockExplorerUrls: "https://polygonscan.com/",
    defaultPoolAddress: "0x1E7aF4A35E33E8CfA97e12237509623a8037632C",
    subgraphUrl:
      "https://api.thegraph.com/subgraphs/name/ribondao/subgraphribon",
  },
  {
    chainName: "Mumbai Testnet",
    ribonContractAddress: "0x348eA4886c5F0926d7A6Ad6C5CF6dFA4F88CA9Bf",
    donationTokenContractAddress: "0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1",
    chainId: 0x13881,
    rpcUrls: "https://rpc-mumbai.maticvigil.com",
    nodeUrl:
      "https://polygon-mumbai.g.alchemy.com/v2/1fEWpdSHuohPveNBGvlozE6qv9P1uAks",
    symbolName: "MATIC",
    currencyName: "Matic",
    blockExplorerUrls: "https://mumbai.polygonscan.com/",
    defaultPoolAddress: "0xDE5dD6864A8aE4e5D93E24e24Fee9D42320753B6",
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
