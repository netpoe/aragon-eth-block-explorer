import { theme as aragonTheme } from "@aragon/ui";
import { Box, createStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React from "react";
import { styles, theme } from "../../theme";
import { Header } from "./Header";
import { LatestBlocksContainer } from "./LatestBlocksContainer";
import { SearchInputContainer } from "./SearchInputContainer";

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
