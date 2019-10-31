import { Typography } from "@material-ui/core";
import React from "react";
import { enableEthereumWallet, getWeb3InstanceByNetworkIDAsync } from "../web3";

export const BlockchainNetworkAwareWrapper: React.FC = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    loadWeb3();
  }, []);

  const loadWeb3 = async () => {
    try {
      await getWeb3InstanceByNetworkIDAsync();
      await enableEthereumWallet();
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  return (
    <>
      {Boolean(error) ? (
        <Typography>Error</Typography>
      ) : isLoading ? (
        <Typography>Loading</Typography>
      ) : (
        <>{children}</>
      )}
    </>
  );
};
