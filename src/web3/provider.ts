import Web3 from "web3";

declare global {
  interface Array<T> {
    filter<U extends T>(pred: (a: U) => boolean): U[];
  }
}

export type Web3NetworkID = "1" | "3";
export type Web3NetworkIDMap = { [network in Web3NetworkID]: string };

const web3ProvidersByNetworkID: Web3NetworkIDMap = {
  "1": "https://mainnet.infura.io/v3/da793a58671e4d7bac564212a46da440",
  "3": "https://ropsten.infura.io/v3/da793a58671e4d7bac564212a46da440",
};

export const web3NetworkNameByNetworkID: Web3NetworkIDMap = {
  "1": "mainnet",
  "3": "ropsten",
};

export const getWeb3NetworkNameByNetworkID = (networkID: Web3NetworkID = "1"): string =>
  web3NetworkNameByNetworkID[networkID];

export const isMetamaskSet = (): boolean => Boolean((window as any).web3local.givenProvider);

export const getWeb3NetworkID = (): Web3NetworkID => {
  const web3local = (window as any).web3local;

  if (isMetamaskSet()) {
    return web3local.givenProvider.networkVersion;
  }

  return Object.keys(web3ProvidersByNetworkID).filter((id: Web3NetworkID) =>
    Boolean(web3ProvidersByNetworkID[id]),
  )[0];
};

export const getWeb3InstanceByNetworkIDAsync = async (
  networkID: Web3NetworkID = "1",
): Promise<Web3> =>
  new Promise((resolve, reject) => {
    const walletWeb3 = (window as any).web3;

    if (Boolean((window as any).web3local)) {
      resolve((window as any).web3local);
    }

    (window as any).web3local = new Web3(
      walletWeb3 && walletWeb3.currentProvider
        ? walletWeb3.currentProvider
        : web3ProvidersByNetworkID[networkID],
    );

    resolve((window as any).web3local);
  });

export const getWeb3InstanceByNetworkID = (networkID: Web3NetworkID = "1"): Web3 => {
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
