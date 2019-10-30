import { SafeLink, theme as aragonTheme } from "@aragon/ui";
import { Box, createStyles, Divider, Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import BN from "bn.js";
import React from "react";
import Web3 from "web3";
import { Transaction } from "web3-core";
import { styles } from "../../theme";
import { getWeb3InstanceByNetworkID } from "../../web3";

export interface IBlockTransactionDetails {
  transactions: Transaction[] | string[];
  classes: any;
}

export const BlockTransactionDetails = withStyles(
  createStyles({
    ...styles,
    txHash: {
      maxWidth: 280,
    },
  }),
)(({ transactions, classes }: IBlockTransactionDetails) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState(null);
  const [txs, setTransactions] = React.useState<Transaction[]>([]);
  const [totalValue, setTotalValue] = React.useState<BN>(new BN(0));
  const [web3, setWeb3Instance] = React.useState<Web3>(getWeb3InstanceByNetworkID());

  React.useEffect(() => {
    getTransactionsDetails();
  }, []);

  const getTransactionsDetails = async () => {
    try {
      const txs: Transaction[] = (await Promise.all(
        (transactions as string[]).map((tx: string) => web3.eth.getTransaction(tx)),
      )).filter((tx: Transaction) => Boolean(tx) && !web3.utils.toBN(tx.value).isZero());
      setTotalValue(
        txs.reduce<BN>((prev, curr) => prev.add(web3.utils.toBN(curr.value)), totalValue),
      );
      console.log(txs);
      setTransactions(txs);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  return (
    <Box p={1} bgcolor={aragonTheme.badgeAppBackground}>
      {Boolean(error) ? (
        <Typography>Error</Typography>
      ) : isLoading ? (
        <Typography>Loading</Typography>
      ) : (
        <>
          <Box mb={2}>
            <Grid container justify="space-between">
              <Grid item>
                <Typography variant="caption">
                  Total value of block: ETH {web3.utils.fromWei(totalValue.toString(), "ether")}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="caption">
                  * Showing only {txs.length} txs with ETH value.
                </Typography>
              </Grid>
            </Grid>
          </Box>
          {txs.map((tx: Transaction, i: number) => (
            <Box mb={i === txs.length - 1 ? 0 : 2} key={i}>
              <Grid container spacing={1}>
                <Grid item lg={5}>
                  <Box>
                    <Typography>ETH {web3.utils.fromWei(tx.value, "ether")}</Typography>
                    <Divider />
                    <Typography variant="caption" color="textSecondary">
                      Value
                    </Typography>
                  </Box>
                </Grid>
                <Grid item lg={7} xs={12}>
                  <Box>
                    <SafeLink href={`https://etherscan.io/tx/${tx.hash}`} target="_blank">
                      <Typography noWrap className={classes.txHash}>
                        {tx.hash}
                      </Typography>
                    </SafeLink>
                    <Divider />
                    <Typography variant="caption" color="textSecondary">
                      Tx. ID
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          ))}
        </>
      )}
    </Box>
  );
});
