import { SafeLink } from "@aragon/ui";
import { AppBar, Box, Grid, Toolbar, Typography } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import { createStyles, withStyles } from "@material-ui/styles";
import React from "react";
import { ReactComponent as MetamaskIcon } from "../../assets/svg/metamask-logo.svg";
import { theme } from "../../theme";
import { getWeb3NetworkID, getWeb3NetworkNameByNetworkID, isMetamaskSet } from "../../web3";

export const Header = withStyles(
  createStyles({
    appBar: {
      position: "absolute",
      backgroundColor: "transparent",
      [theme.breakpoints.down("sm")]: {
        position: "absolute",
        marginBottom: theme.spacing(6),
      },
    },
    toolbar: {
      justifyContent: "space-between",
    },
  }),
)(({ classes }: { classes: any }) => (
  <AppBar className={classes.appBar} color="inherit" elevation={0}>
    <Toolbar className={classes.toolbar}>
      <Box>
        <SafeLink href={`https://github.com/netpoe/aragon-eth-block-explorer`} target="blank">
          <GitHubIcon />
        </SafeLink>
      </Box>
      <Box>
        <Grid container>
          <Grid item>
            <Box display="flex" justifyContent="flex-end">
              <Box width={24}>{isMetamaskSet() && <MetamaskIcon />}</Box>
              <Box>
                <Typography>{getWeb3NetworkNameByNetworkID(getWeb3NetworkID())}</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Toolbar>
  </AppBar>
));
