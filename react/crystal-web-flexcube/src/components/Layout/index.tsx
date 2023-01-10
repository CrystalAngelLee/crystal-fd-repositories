import React, { FC } from "react";
import styled from "@emotion/styled";
import { style } from "./styles";
import { LayoutProps, StyledProps } from "./index.d";
import { Link, Outlet } from "react-router-dom";
import { IconFont } from "../../pubcomp/Icon";
import { HEADERS } from "../../constances";
import Button from "../../pubcomp/Button";

const Layout: FC<LayoutProps> = ({ className: prefixCls }) => {
  return (
    <div className={prefixCls}>
      <header className={`${prefixCls}-header`}>
        <span className={`${prefixCls}-header-icon`}>
          <Link to={window.BASEROUTE}>
            <IconFont type='icon-menu' />
          </Link>
        </span>
        <ul className={`${prefixCls}-header-menu`}>
          {HEADERS.map(({ id, name, href }) => {
            return (
              <li key={id} className='menu-item'>
                <Button
                  type='fastenerlink'
                  to={`${
                    window.BASEROUTE === "/" ? "" : window.BASEROUTE
                  }${href}`}
                >
                  {name}
                </Button>
              </li>
            );
          })}
        </ul>
      </header>
      <Outlet />
    </div>
  );
};
export default styled(React.memo(Layout))<StyledProps>`
  ${style}
`;
