import Web3 from "web3";

const web3ProvidersByNetworkID: { [key: string]: string } = {
  "1": "https://mainnet.infura.io/v3/da793a58671e4d7bac564212a46da440",
};

export const getWeb3InstanceByNetworkID = (networkID = "1"): Web3 => {
  const walletWeb3 = (window as any).web3;

  if (Boolean((window as any).web3local)) {
    return (window as any).web3local;
  }

  (window as any).web3local = new Web3(
    walletWeb3 && walletWeb3.currentProvider
      ? walletWeb3.currentProvider
      : web3ProvidersByNetworkID[networkID],
  );

  return (window as any).web3local;
};
