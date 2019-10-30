import { SafeLink, theme as aragonTheme } from "@aragon/ui";
import {
  Box,
  Card,
  Container,
  createStyles,
  Divider,
  Grid,
  Hidden,
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

const styles = createStyles({});

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
    blockNumberBoxWrapper: {
      [theme.breakpoints.down("sm")]: {
        paddingTop: 0,
      },
    },
  }),
)(({ hash, number, timestamp, size, transactions, gasUsed, classes }: IBlockCardProps) => {
  const [displayTxDetails, setDisplayTxDetails] = React.useState(false);

  return (
    <Card className={classes.blockCard}>
      <Hidden smUp>
        <Grid container justify="space-between">
          <Grid item xs={6}>
            <Box px={1}>
              <Typography variant="overline" color="textSecondary">
                {DateTime.fromSeconds(Number(timestamp)).toRelative()}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              px={1}
              minHeight={28}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              textAlign="right"
            >
              <SafeLink href={`https://etherscan.io/block/${number}`} target="blank">
                <Typography variant="caption">
                  View on etherscan.io <OpenInNewOutlinedIcon fontSize="inherit" />
                </Typography>
              </SafeLink>
            </Box>
          </Grid>
        </Grid>
      </Hidden>
      <Grid container>
        <Grid item lg={3} xs={12}>
          <Box p={1} height="100%" className={classes.blockNumberBoxWrapper}>
            <Box className={classes.blockNumberBox}>
              <Typography align="center" className={classes.blockNumber} variant="h5">
                {number}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item lg={9} xs={12}>
          <Hidden mdDown>
            <Box p={1}>
              <Typography variant="overline" color="textSecondary">
                {DateTime.fromSeconds(Number(timestamp)).toRelative()}
              </Typography>
            </Box>
          </Hidden>
          <Grid container>
            <Grid item lg={3} xs={4}>
              <Box px={1}>
                <Typography>
                  {size} <Typography variant="caption">Bytes</Typography>
                </Typography>
                <Divider />
                <Typography variant="caption" color="textSecondary">
                  Size
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={3} xs={4}>
              <Box px={1}>
                <Typography>{transactions.length}</Typography>
                <Divider />
                <Typography variant="caption" color="textSecondary">
                  Tx. Count
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={3} xs={4}>
              <Box px={1}>
                <Typography>{gasUsed}</Typography>
                <Divider />
                <Typography variant="caption" color="textSecondary">
                  Gas Used
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Hidden mdDown>
            <Grid container justify="space-between">
              <Grid item lg={6} xs={6}>
                <Box p={1}>
                  <SafeLink href={`https://etherscan.io/block/${number}`} target="blank">
                    <Typography variant="caption">
                      <OpenInNewOutlinedIcon fontSize="inherit" /> View on etherscan.io
                    </Typography>
                  </SafeLink>
                </Box>
              </Grid>
              <Grid item lg={6} xs={6}>
                <Box p={1} display="flex" justifyContent="flex-end">
                  <Typography
                    variant="caption"
                    align="right"
                    onClick={() => setDisplayTxDetails(!displayTxDetails)}
                    className={classes.displayTxDetailsText}
                  >
                    Display block txs details <ExpandMoreOutlinedIcon fontSize="inherit" />
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Hidden>
        </Grid>
      </Grid>
      <Hidden smUp>
        <Box p={1} textAlign="center">
          <Typography
            variant="caption"
            onClick={() => setDisplayTxDetails(!displayTxDetails)}
            className={classes.displayTxDetailsText}
          >
            Display block txs details <ExpandMoreOutlinedIcon fontSize="inherit" />
          </Typography>
        </Box>
      </Hidden>
      {displayTxDetails && <BlockTransactionDetails transactions={transactions} />}
    </Card>
  );
});

export interface ILatestBlocksContainer {
  blockHeight: number | null;
  classes: any;
}

const LatestBlocksContainer = withStyles(
  createStyles({
    ...styles,
  }),
)(({ blockHeight, classes }: ILatestBlocksContainer) => {
  const [latestBlockNumber, setLatestBlockNumber] = React.useState<number>(0);
  const [latestBlocks, setLatestBlocks] = React.useState<Block[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState(null);
  const [web3, setWeb3Instance] = React.useState<Web3>(getWeb3InstanceByNetworkID());
  const [latestBlocksCount, setLatestBlocksCount] = React.useState<number>(10);

  const getLatestBlocks = async () => {
    try {
      let blockNumber = (await web3.eth.getBlockNumber()) + 1;
      setLatestBlockNumber(blockNumber);
      const blocks: Block[] = (await Promise.all(
        Array(latestBlocksCount)
          .fill(null)
          .map(block => web3.eth.getBlock(blockNumber--)),
      )).filter(Boolean);
      console.log(blocks);
      setLatestBlocks(blocks);
      setIsLoading(false);
      setError(null);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  const getBlockAtHeight = async () => {
    try {
      setLatestBlockNumber(blockHeight as number);
      const block: Block = await web3.eth.getBlock(blockHeight as number);
      console.log(block);
      setLatestBlocks([block].filter(Boolean));
      setIsLoading(false);
      setError(null);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  React.useEffect(() => {
    if (Boolean(blockHeight)) {
      getBlockAtHeight();
    } else {
      getLatestBlocks();
    }
  }, [blockHeight]);

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
                {Boolean(blockHeight) ? (
                  <Typography variant="subtitle1" gutterBottom>
                    Showing block at {blockHeight}:
                  </Typography>
                ) : (
                  <Typography variant="subtitle1" gutterBottom>
                    Showing the latest {latestBlocksCount} blocks
                  </Typography>
                )}
              </Box>
              <Box>
                {latestBlocks.length > 0 ? (
                  <>
                    {latestBlocks.map((block: Block, i: number) => (
                      <BlockCard key={i} {...block} />
                    ))}
                  </>
                ) : (
                  <Card>
                    <Box>
                      <Typography>There are no blocks left.</Typography>
                    </Box>
                  </Card>
                )}
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
});

export interface ISearchInputContainer {
  onValidSearchTerm: (height: number | null) => void;
  classes: any;
}

export const SearchInputContainer = withStyles(
  createStyles({
    ...styles,
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
  }),
)(({ onValidSearchTerm, classes }: ISearchInputContainer) => {
  const [web3, setWeb3Instance] = React.useState<Web3>(getWeb3InstanceByNetworkID());
  const [value, setValue] = React.useState<string>("");
  let inputRef = React.createRef<HTMLInputElement>();

  const onKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") {
      return;
    }
    console.log(value);

    if (web3.utils.isHexStrict(value)) {
      const tx: Transaction = await web3.eth.getTransaction(value);
      const { blockNumber } = tx;
      console.log(tx);
      onValidSearchTerm(Number(blockNumber));
      return;
    }

    if (Boolean(Number(value))) {
      onValidSearchTerm(Number(value));
      return;
    }

    onValidSearchTerm(null);
  };

  return (
    <Container maxWidth="xl" className={classes.searchContainer}>
      <Typography align="center" variant="h3" gutterBottom>
        Aragon Block Explorer
      </Typography>
      <Grid container justify="center" className={classes.searchInputContainer}>
        <Grid item xs={12} lg={6}>
          <Paper className={classes.root}>
            <InputBase
              ref={inputRef}
              onKeyPress={onKeyPress}
              onChange={e => setValue(e.target.value)}
              value={value}
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
  );
});

export const Home = withStyles(
  createStyles({
    ...styles,
    main: {
      backgroundColor: aragonTheme.secondaryBackground,
      minHeight: "100vh",
      [theme.breakpoints.down("sm")]: {},
    },
  }),
)(({ classes }: { classes: any }) => {
  const [blockHeight, setBlockHeight] = React.useState<number | null>(null);

  React.useEffect(() => {
    enableEthereumWallet();
  }, []);

  return (
    <>
      <Header />
      <Box bgcolor="primary.main" className={classes.main}>
        <SearchInputContainer
          onValidSearchTerm={(height: number | null) => setBlockHeight(height)}
        />
        <LatestBlocksContainer blockHeight={blockHeight} />
      </Box>
    </>
  );
});
