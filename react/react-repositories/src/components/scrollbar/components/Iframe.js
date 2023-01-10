import React, { PureComponent } from "react";
import ScrollBar from "./ScrollBar";
import NativeScrollBar from "./NativeScrollBar";
import PropTypes from "prop-types";

const prefixCls = "scroll-bar-iframe";

class IframeScroll extends PureComponent {
  static propTypes = {
    targetDom: PropTypes.string.isRequired,
    scrollWidth: PropTypes.number.isRequired,
    clientWidth: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.state = {
      clientWidth: props.clientWidth || 0,
      scrollWidth: props.scrollWidth || 0,
    };
    this.window = window;
    this.document = document;
    this.targetElement = null;
    this.scrollBar = React.createRef();
    this.nativeScrollBar = React.createRef();
    this.randomId = `scrollIrame_${Math.random().toString().slice(3, 9)}`;
    window.addEventListener('resize', this.handleResize)
  }

  componentDidMount() {
    this.getTargetDom();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.targetDom === this.props.targetDom && nextProps.scrollWidth !== this.props.scrollWidth) {
      this.getTargetDom(nextProps);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }
  

  handleResize = () => {
    if (this.targetElement) {
      this.calculateClientWidth();
      this.calculateScrollWidth();
    }
  }

  // search targetDom in Irame
  getTargetDom = props => {
    const { targetDom, clientWidth, scrollWidth } = props || this.props;
    const iframe = document.querySelector(`#${this.randomId} iframe`);
    const win = iframe.contentWindow;
    const doc = win.document;
    this.window = win;
    this.document = doc;

    this.targetElement = this.document.querySelector(targetDom);
    !clientWidth && this.calculateClientWidth();
    !scrollWidth && this.calculateScrollWidth();
  };

  // calculate clientWidth and scrollWidth
  calculateClientWidth = () => {
    this.setState({ clientWidth: this.targetElement.clientWidth });
  };

  calculateScrollWidth = scrollWidth => {
    this.setState({ scrollWidth: scrollWidth || this.targetElement.scrollWidth });
  };

  // bind event listener
  bindElemtListener = () => {
    this.document.removeEventListener && this.document.removeEventListener("scroll", this.onElementScroll);
    this.document.addEventListener("scroll", this.onElementScroll);
  };

  bindMouseUpElmentListener = () => {
    this.document.addEventListener("mouseup", this.onElementMouseUp);
  };

  unBindMouseUpElmentListener = () => this.document.removeEventListener("mouseup", this.onElementMouseUp);

  onElementScroll = e => {
    const target = e.target || e.srcElement;
    const scrollingElement = target.scrollingElement;
    this.scrollBar.current.onElementScroll(scrollingElement);
  };

  onElementMouseUp = _ => {
    this.scrollBar.current.onDocMouseUp();
  };

  render() {
    const { children, native = false } = this.props;
    const { clientWidth, scrollWidth } = this.state;
    return (
      <div className={prefixCls} id={this.randomId}>
        {children}
        {native && clientWidth < scrollWidth ? <NativeScrollBar ref={this.nativeScrollBar} clientWidth={clientWidth} scrollWidth={scrollWidth} targetElement={this.targetElement} /> : clientWidth < scrollWidth ? <ScrollBar ref={this.scrollBar} clientWidth={clientWidth} scrollWidth={scrollWidth} scrollDocument={this.document} targetElement={this.targetElement} bindElemtListener={this.bindElemtListener} bindMouseUpElmentListener={this.bindMouseUpElmentListener} unBindMouseUpElmentListener={this.unBindMouseUpElmentListener} /> : null}
      </div>
    );
  }
}

export default IframeScroll;
