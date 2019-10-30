import { SafeLink, theme as aragonTheme } from "@aragon/ui";
import { Box, Card, createStyles, Divider, Grid, Hidden, Typography } from "@material-ui/core";
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";
import OpenInNewOutlinedIcon from "@material-ui/icons/OpenInNewOutlined";
import { withStyles } from "@material-ui/styles";
import { DateTime } from "luxon";
import React from "react";
import { Block } from "web3-eth";
import { styles, theme } from "../../theme";
import { BlockTransactionDetails } from "./BlockTransactionDetails";

export interface IBlockCardProps extends Block {
  classes: any;
}

export const BlockCard = withStyles(
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