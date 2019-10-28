import { Typography } from "@material-ui/core";
import { TypographyProps } from "@material-ui/core/Typography";
import { createStyles, withStyles } from "@material-ui/styles";
import React from "react";

export interface ITypographyProps extends TypographyProps {
  classes: any;
}

const styles = createStyles({
  altTypography: {
    fontFamily: "Cinzel, serif",
  },
});

export const AltTypography = withStyles(styles)(
  ({ classes, children, ...rest }: ITypographyProps) => (
    <Typography className={classes.altTypography} {...rest}>
      {children}
    </Typography>
  ),
);
