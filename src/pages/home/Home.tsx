import { Box, Container, createStyles, Grid } from "@material-ui/core";
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
  gtqBtcButton: {
    padding: 0,
    fontSize: theme.typography.h5.fontSize,
    color: theme.palette.primary.main,
    [theme.breakpoints.down("sm")]: {
      ...theme.typography.h5,
    },
  },
});

export const Home = withStyles(styles)(({ classes }: { classes: any }) => {
  return (
    <>
      <Header />
      <Box bgcolor="primary.main">
        <Container maxWidth="xl">
          <Grid container></Grid>
        </Container>
      </Box>
    </>
  );
});
