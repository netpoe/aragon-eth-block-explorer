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
import { DateTime } from "luxon";
import React from "react";
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

const LatestBlocks = withStyles(
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
    blocksContainer: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    iconButton: {
      borderRadius: "inherit",
      height: "100%",
    },
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
    <Container maxWidth="xl" className={classes.blocksContainer}>
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
              {latestBlocks.map(
                ({ hash, number, timestamp, size, transactions, gasUsed }: Block, i: number) => (
                  <Card key={i} className={classes.blockCard}>
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
                            <Typography variant="caption">
                              Display block txs details{" "}
                              <ExpandMoreOutlinedIcon fontSize="inherit" />
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                      {/* <Grid item lg={1}>
                        <Box
                          display="flex"
                          justifyContent="center"
                          flexDirection="column"
                          height="100%"
                        >
                          <IconButton className={classes.iconButton}>
                            <ExpandMoreOutlinedIcon />
                          </IconButton>
                        </Box>
                      </Grid> */}
                    </Grid>
                  </Card>
                ),
              )}
            </Box>
          </Grid>
        )}
      </Grid>
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
        <LatestBlocks />
      </Box>
    </>
  );
});
