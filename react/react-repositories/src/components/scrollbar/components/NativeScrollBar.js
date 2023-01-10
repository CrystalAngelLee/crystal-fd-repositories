import React, { PureComponent } from "react";
import PropTypes from "prop-types";

const prefixCls = "native-scroll-bar";
export default class NativeScrollBar extends PureComponent {
  static propTypes = {
    clientWidth: PropTypes.number.isRequired,
    scrollWidth: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      clientWidth: props.clientWidth,
      scrollWidth: props.scrollWidth,
    };
    this.randomId = Math.random().toString().slice(3, 13);
    this.outterRef = React.createRef()
  }

  // slider to viewer
  onScroll = () => {
    const { targetElement } = this.props;
    targetElement.scrollLeft = this.outterRef.current && this.outterRef.current.scrollLeft || 0;
  }

  render() {
    const { clientWidth, scrollWidth } = this.props;
    if (clientWidth >= scrollWidth) return null;
    return (
      <div className={`${prefixCls}-outter`} ref={this.outterRef} style={{ width: clientWidth }} onScroll={this.onScroll}>
        <div className={`${prefixCls}-inner`} style={{ width: scrollWidth }} />
      </div>
    );
  }
}
