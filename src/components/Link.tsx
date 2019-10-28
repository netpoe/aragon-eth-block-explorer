import { StyledComponentProps } from "@material-ui/core";
import { createStyles, withStyles } from "@material-ui/styles";
import React from "react";
import { Link as RouterDomLink, LinkProps } from "react-router-dom";
import { theme } from "../theme";

export interface ILinkProps extends LinkProps, StyledComponentProps {
  secondary?: boolean;
  classes: any;
  innerRef?: React.Ref<HTMLAnchorElement> | React.Ref<any> | React.RefObject<any>;
  children?: any;
  to: string;
}

const styles = createStyles({
  mainLinkStyles: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    fontSize: theme.typography.body1.fontSize,
  },
  secondaryLinkStyles: {
    textDecoration: "underline",
    fontSize: theme.typography.body2.fontSize,
  },
  anchor: {
    textDecoration: "none",
  },
});

export const Link = withStyles(styles)(({ secondary, to, classes, children }: ILinkProps) => (
  <RouterDomLink
    to={to}
    className={secondary ? classes.secondaryLinkStyles : classes.mainLinkStyles}
  >
    {children}
  </RouterDomLink>
));

export interface IAnchorProps extends React.HTMLProps<HTMLAnchorElement> {
  children: any;
  classes: any;
}

export const Anchor = withStyles(styles)(({ children, classes, ...rest }: IAnchorProps) => (
  <a {...rest} className={classes.anchor}>
    {children}
  </a>
));
