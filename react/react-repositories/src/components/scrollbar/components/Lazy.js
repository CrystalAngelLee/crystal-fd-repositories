import React, { PureComponent } from "react";
import PropTypes from "prop-types";

/* 懒模式加载滚动条：目标组件加载完成后加载滚动条 */
export default class LazyScroll extends PureComponent {
  static propTypes = {};

  render() {
    const { children } = this.props;
    return <div>{children}</div>;
  }
}
