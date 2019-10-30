import { theme as aragonTheme } from "@aragon/ui";
import { Box, Card, Container, createStyles, Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React from "react";
import Web3 from "web3";
import { Block } from "web3-eth";
import { styles, theme } from "../../theme";
import { getWeb3InstanceByNetworkID } from "../../web3";
import { BlockCard } from "./BlockCard";

export interface ILatestBlocksContainer {
  blockHeight: number | null;
  classes: any;
}

export const LatestBlocksContainer = withStyles(
  createStyles({
    ...styles,
    loadMoreBox: {
      border: `3px dotted ${aragonTheme.contentBorderActive}`,
      borderRadius: 7,
      height: 128,
      "&:hover": {
        cursor: "pointer",
        "& p": {
          color: theme.palette.text.primary,
        },
      },
    },
  }),
)(({ blockHeight, classes }: ILatestBlocksContainer) => {
  const [latestBlockNumber, setLatestBlockNumber] = React.useState<number>(0);
  const [latestBlocks, setLatestBlocks] = React.useState<Block[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState(null);
  const [web3, setWeb3Instance] = React.useState<Web3>(getWeb3InstanceByNetworkID());
  const [latestBlocksCount, setLatestBlocksCount] = React.useState<number>(10);

  const appendBlock = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    try {
      const block: Block = await web3.eth.getBlock(
        latestBlocks[latestBlocks.length - 1].number - 1,
      );
      console.log(block);
      setLatestBlocks([...latestBlocks, block].filter(Boolean));
      setLatestBlocksCount(latestBlocks.length + 1);
      setIsLoading(false);
      setError(null);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  const getLatestBlocks = async () => {
    try {
      let blockNumber = (await web3.eth.getBlockNumber()) + 1;
      setLatestBlockNumber(blockNumber);
      const blocks: Block[] = (await Promise.all(
        Array(10)
          .fill(null)
          .map(block => web3.eth.getBlock(blockNumber--)),
      )).filter(Boolean);
      console.log(blocks);
      setLatestBlocks(blocks);
      setLatestBlocksCount(blocks.length);
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

  React.useEffect(() => {}, [latestBlocksCount]);

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
                    <Box
                      onClick={appendBlock}
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      textAlign="center"
                      className={classes.loadMoreBox}
                    >
                      <Typography color="textSecondary">Load 1 block more</Typography>
                    </Box>
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