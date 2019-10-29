import { theme as aragonTheme } from "@aragon/ui";
import {
  Box,
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
import { theme } from "../../theme";
import { Header } from "./Header";

const styles = createStyles({
  fullHeightBox: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      minHeight: "auto",
    },
  },
  introTitle: {
    [theme.breakpoints.down("sm")]: {
      ...theme.typography.h4,
    },
  },
  introText: {
    [theme.breakpoints.down("sm")]: {
      ...theme.typography.h5,
    },
  },
  introTextBox: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    paddingBottom: theme.spacing(6),
    paddingRight: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      paddingTop: 180,
      paddingRight: 0,
    },
  },
  main: {
    backgroundColor: aragonTheme.secondaryBackground,
    minHeight: "100vh",
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

export const Home = withStyles(styles)(({ classes }: { classes: any }) => {
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
      </Box>
    </>
  );
});
