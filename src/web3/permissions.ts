export const ethereum = (window as any).ethereum;

export const isEthereumEnabled = async () => (await ethereum.enable()).length > 0;

export const enableEthereumWallet = async () => {
  if (ethereum) {
    await ethereum.enable();
  }
};
