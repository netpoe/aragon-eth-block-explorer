import { SafeLink, theme as aragonTheme } from "@aragon/ui";
import {
  Box,
  Card,
  Container,
  createStyles,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@material-ui/core";
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";
import OpenInNewOutlinedIcon from "@material-ui/icons/OpenInNewOutlined";
import SearchIcon from "@material-ui/icons/Search";
import { withStyles } from "@material-ui/styles";
import BN from "bn.js";
import { DateTime } from "luxon";
import React from "react";
import Web3 from "web3";
import { Transaction } from "web3-core";
import { Block } from "web3-eth";
import { theme } from "../../theme";
import { enableEthereumWallet, getWeb3InstanceByNetworkID } from "../../web3";
import { Header } from "./Header";

const styles = createStyles({
  main: {
    backgroundColor: aragonTheme.secondaryBackground,
    minHeight: "100vh",
    [theme.breakpoints.down("sm")]: {},
  },
  searchContainer: {
    backgroundColor: aragonTheme.infoBackground,
    minHeight: "35vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  searchInputContainer: {
    marginTop: theme.spacing(3),
  },
});

export interface IBlockTransactionDetails {
  transactions: Transaction[] | string[];
  classes: any;
}

const BlockTransactionDetails = withStyles(
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
      )).filter((tx: Transaction) => !web3.utils.toBN(tx.value).isZero());
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
                <Grid item lg={7}>
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

export interface IBlockCardProps extends Block {
  classes: any;
}

const BlockCard = withStyles(
  createStyles({
    ...styles,
    blockCard: {
      marginBottom: theme.spacing(2),
    },
    blockNumberBox: {
      backgroundColor: aragonTheme.badgeInfoBackground,
      padding: theme.spacing(2),
      flexDirection: "column",
      justifyContent: "center",
      display: "flex",
      height: "100%",
    },
    blockNumber: {
      color: aragonTheme.textPrimary,
    },
    iconButton: {
      borderRadius: "inherit",
      height: "100%",
    },
    displayTxDetailsText: {
      "&:hover": {
        cursor: "pointer",
      },
    },
  }),
)(({ hash, number, timestamp, size, transactions, gasUsed, classes }: IBlockCardProps) => {
  const [displayTxDetails, setDisplayTxDetails] = React.useState(false);

  return (
    <Card className={classes.blockCard}>
      <Grid container>
        <Grid item lg={3}>
          <Box p={1} height="100%">
            <Box className={classes.blockNumberBox}>
              <Typography align="center" className={classes.blockNumber} variant="h5">
                {number}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item lg={9}>
          <Box p={1} display="flex" justifyContent="space-between">
            <Box>
              <Typography variant="overline" color="textSecondary">
                {DateTime.fromSeconds(Number(timestamp)).toRelative()}
              </Typography>
            </Box>
          </Box>
          <Box display="flex" flexDirection="row" px={1}>
            <Box mr={2} flexBasis="25%">
              <Typography>
                {size} <Typography variant="caption">Bytes</Typography>
              </Typography>
              <Divider />
              <Typography variant="caption" color="textSecondary">
                Size
              </Typography>
            </Box>
            <Box mr={2} flexBasis="25%">
              <Typography>{transactions.length}</Typography>
              <Divider />
              <Typography variant="caption" color="textSecondary">
                Tx. Count
              </Typography>
            </Box>
            <Box mr={2} flexBasis="25%">
              <Typography>{gasUsed}</Typography>
              <Divider />
              <Typography variant="caption" color="textSecondary">
                Gas Used
              </Typography>
            </Box>
          </Box>
          <Box display="flex" p={1} justifyContent="space-between">
            <Box mr={1}>
              <SafeLink href={`https://etherscan.io/block/${number}`} target="blank">
                <Typography variant="caption">
                  <OpenInNewOutlinedIcon fontSize="inherit" /> View on etherscan.io
                </Typography>
              </SafeLink>
            </Box>
            <Box mr={1}>
              <Typography
                variant="caption"
                onClick={() => setDisplayTxDetails(!displayTxDetails)}
                className={classes.displayTxDetailsText}
              >
                Display block txs details <ExpandMoreOutlinedIcon fontSize="inherit" />
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      {displayTxDetails && <BlockTransactionDetails transactions={transactions} />}
    </Card>
  );
});

const LatestBlocksContainer = withStyles(
  createStyles({
    ...styles,
  }),
)(({ classes }: { classes: any }) => {
  const [latestBlockNumber, setLatestBlockNumber] = React.useState<number>(0);
  const [latestBlocks, setLatestBlocks] = React.useState<Block[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState(null);

  const getLatestBlocks = async () => {
    try {
      const web3 = getWeb3InstanceByNetworkID();
      let blockNumber = (await web3.eth.getBlockNumber()) + 1;
      setLatestBlockNumber(blockNumber);
      const blocks: Block[] = (await Promise.all(
        Array(10)
          .fill(null)
          .map(block => web3.eth.getBlock(blockNumber--)),
      )).filter(Boolean);
      console.log(blocks);
      setLatestBlocks(blocks);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  React.useEffect(() => {
    getLatestBlocks();
  }, []);

  return (
    <Container maxWidth="xl">
      <Box py={6}>
        <Grid container justify="center">
          {Boolean(error) ? (
            <Typography>Error</Typography>
          ) : isLoading ? (
            <Typography>Loading</Typography>
          ) : (
            <Grid item xs={12} lg={6}>
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Showing the latest 10 blocks
                </Typography>
              </Box>
              <Box>
                {latestBlocks.map((block: Block, i: number) => (
                  <BlockCard key={i} {...block} />
                ))}
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
});

export const Home = withStyles(styles)(({ classes }: { classes: any }) => {
  React.useEffect(() => {
    enableEthereumWallet();
  }, []);

  return (
    <>
      <Header />
      <Box bgcolor="primary.main" className={classes.main}>
        <Container maxWidth="xl" className={classes.searchContainer}>
          <Typography align="center" variant="h3" gutterBottom>
            Aragon Block Explorer
          </Typography>
          <Grid container justify="center" className={classes.searchInputContainer}>
            <Grid item xs={12} lg={6}>
              <Paper className={classes.root}>
                <InputBase
                  className={classes.input}
                  placeholder="Block no. or tx id..."
                  inputProps={{ "aria-label": "txid" }}
                  autoFocus
                />
                <Divider className={classes.divider} orientation="vertical" />
                <IconButton className={classes.iconButton} aria-label="search">
                  <SearchIcon />
                </IconButton>
              </Paper>
            </Grid>
          </Grid>
        </Container>
        <LatestBlocksContainer />
      </Box>
    </>
  );
});
