import React, { Ref } from "react";
import Link from "next/link";

type AppNavLinkProps = {
  activeClassName: string;
  className: string;

  [x: string]: any;
};

const AppNavLink = React.forwardRef(function AppNavLink(
  { activeClassName, className, ...rest }: AppNavLinkProps,
  ref: Ref<HTMLAnchorElement>
) {
  return (
    <Link ref={ref} href={rest.to} {...rest}>
      {rest.children}
    </Link>
  );
});

export default AppNavLink;
