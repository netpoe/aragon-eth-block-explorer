import Web3 from "web3";

const web3ProvidersByNetworkID: { [key: string]: string } = {
  "1": "https://mainnet.infura.io/v3/da793a58671e4d7bac564212a46da440",
};

export const getWeb3InstanceByNetworkID = (networkID = "1"): Web3 =>
  new Web3(
    (window as any).web && (window as any).web.currentProvider
      ? (window as any).web.currentProvider
      : web3ProvidersByNetworkID[networkID],
  );
