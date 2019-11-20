import { theme as aragonTheme } from "@aragon/ui";
import {
  Container,
  createStyles,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { withStyles } from "@material-ui/styles";
import React from "react";
import Web3 from "web3";
import { Transaction } from "web3-core";
import { styles, theme } from "../../theme";
import { getWeb3InstanceByNetworkID } from "../../web3";

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
      [theme.breakpoints.down("sm")]: {
        marginTop: theme.spacing(1),
      },
    },
    searchContainer: {
      background: `linear-gradient(180deg, ${aragonTheme.gradientStartActive}, ${aragonTheme.gradientStart})`,
      color: "white",
      minHeight: "35vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      paddingBottom: theme.spacing(6),
      [theme.breakpoints.down("sm")]: {
        "& h3": {
          fontSize: theme.typography.h5.fontSize,
        },
      },
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

    resolveSearch();
  };

  const resolveSearch = async () => {
    console.log(value);

    if (web3.utils.isHexStrict(value)) {
      const tx: Transaction = await web3.eth.getTransaction(value);
      console.log(tx);
      const { blockNumber } = tx;
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
      <Typography align="center" variant="h3" gutterBottom color="inherit">
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
            <IconButton
              className={classes.iconButton}
              aria-label="search"
              onClick={() => resolveSearch()}
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
});
