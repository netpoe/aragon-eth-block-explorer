import { SafeLink } from "@aragon/ui";
import { AppBar, Box, Grid, Toolbar } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import { createStyles, withStyles } from "@material-ui/styles";
import React from "react";
import { Link } from "../../components";
import { theme } from "../../theme";
import { routes } from "../routes";

const styles = createStyles({
  appBar: {
    position: "absolute",
    backgroundColor: "transparent",
    [theme.breakpoints.down("sm")]: {
      position: "absolute",
      marginBottom: theme.spacing(6),
    },
  },
  list: {
    padding: 0,
    margin: 0,
  },
  listItem: {
    justifyContent: "flex-end",
  },
});

export const Header = withStyles(styles)(({ classes }: { classes: any }) => (
  <AppBar className={classes.appBar} color="inherit" elevation={0}>
    <Toolbar style={{ justifyContent: "space-between" }}>
      <Box py={2}>
        <Link to={routes.root}></Link>
      </Box>
      <Box>
        <Grid container>
          <Grid item>
            <SafeLink href={`https://github.com/netpoe/aragon-eth-block-explorer`} target="blank">
              <GitHubIcon />
            </SafeLink>
          </Grid>
        </Grid>
      </Box>
    </Toolbar>
  </AppBar>
));

const linkStyles = {
  color: theme.palette.primary.main,
  textDecoration: "none",
};
