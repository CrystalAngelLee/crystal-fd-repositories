import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const prefixCls = "scroll-bar";
class ScrollBar extends PureComponent {
  static propTypes = {
    clientWidth: PropTypes.number.isRequired,
    scrollWidth: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      visible: props.clientWidth < props.scrollWidth,
      clientWidth: props.clientWidth,
      scrollWidth: props.scrollWidth,
      slider: 0,
      distanceX: 0,
      scrollLeft: 0,
    };
    this.randomId = Math.random().toString().slice(3, 13);
    this.startX = 0;
    this.startDistance = 0;
    this.onMounceDown = false;
    this.outerSlider = null; // record document outer slider
    this.innnerSlider = null; // record document inner slider
  }

  componentDidMount() {
    this.calculateSilder();
    this.setElemEvent();
    this.props.bindElemtListener();
  }

  componentWillReceiveProps(nextProps) {
    this.setVisible(nextProps);
    nextProps.bindElemtListener();
  }

  setElemEvent = () => {
    this.outerSlider = document.getElementById(`outer_${this.randomId}`);
    this.innnerSlider = document.getElementById(`inner_${this.randomId}`);
    if (this.outerSlider && this.innnerSlider) {
      this.outerSlider.addEventListener("mouseover", this.onOuterMouseOver);
    } else {
      setTimeout(() => this.setElemEvent(), 500);
    }
  };

  setVisible = props => {
    const { clientWidth, scrollWidth } = props || this.props;
    let visible = clientWidth < scrollWidth;

    this.setState({ visible: visible, clientWidth, scrollWidth }, () => {
      this.calculateSilder();
    });
  };

  // calculate innerBar width
  calculateSilder = () => {
    const { clientWidth, scrollWidth } = this.state;

    let slider = (clientWidth * clientWidth) / scrollWidth || 0;
    if (slider !== this.state.slider) {
      this.setState({ slider });
    }
  };

  // calculate slider remove distance
  getDistance = distance => {
    const { targetElement } = this.props;
    const { clientWidth, scrollWidth } = this.state;

    const distanceX = (targetElement.scrollLeft * clientWidth) / scrollWidth;
    this.setState({ distanceX, scrollLeft: distance });
  };

  // record the target document scroll distance
  onElementScroll = targetElem => {
    let distanceX = targetElem.scrollLeft;
    this.calculateSilder();
    this.getDistance(distanceX);
  };

  onOuterMouseOver = () => {
    const { clientWidth, scrollWidth } = this.state;
    if (clientWidth < scrollWidth) {
      this.innnerSlider && this.innnerSlider.addEventListener("mousedown", this.onInnerMouseDown);
      this.outerSlider && this.outerSlider.addEventListener("mouseout", this.onOuterMouseOut);
    }
  };

  onOuterMouseOut = () => {
    this.innnerSlider.removeEventListener("mousedown", this.onInnerMouseDown);
    this.innnerSlider.removeEventListener("mouseout", this.onOuterMouseOut);
  };

  onInnerMouseDown = e => {
    const { targetElement, bindMouseUpElmentListener } = this.props;
    // record the current pageX, for calculate later
    this.startX = e.pageX;
    // record the container scrollLeft, for calculate later
    this.startDistance = targetElement.scrollLeft;
    this.startX.removeEventListener && this.startX.removeEventListener("mouseout", this.onOuterMouseOut);
    document.addEventListener("mousemove", this.onDocMouseMove);
    document.addEventListener("mouseup", this.onDocMouseUp);
    bindMouseUpElmentListener && bindMouseUpElmentListener();
  };

  // press silder and scroll it
  onDocMouseMove = e => {
    const { targetElement } = this.props;
    const { clientWidth, scrollWidth } = this.state;
    let change = (scrollWidth * (e.pageX - this.startX)) / clientWidth;
    change += this.startDistance;
    if (change < 0) {
      targetElement.scrollLeft = 0;
      return;
    }
    if (change + clientWidth >= scrollWidth) {
      targetElement.scrollLeft = scrollWidth - clientWidth;
      return;
    }
    targetElement.scrollLeft = change;
  };

  onDocMouseUp = _ => {
    const { unBindMouseUpElmentListener } = this.props;
    this.outerSlider.removeEventListener("mouseout", this.onOuterMouseOut);
    document.removeEventListener("mousemove", this.onDocMouseMove);
    document.removeEventListener("mouseup", this.onDocMouseUp);
    unBindMouseUpElmentListener && unBindMouseUpElmentListener();
  };

  render() {
    const { visible, slider, distanceX } = this.state;
    const { clientWidth, scrollWidth } = this.props;
    if (clientWidth >= scrollWidth) return null;
    const innerStyles = {
      width: slider,
      transform: `translateX(${distanceX}px)`,
    };

    return (
      <div className={classnames({ [`${prefixCls}-slider`]: visible })} style={{ width: clientWidth }}>
        <div className={`${prefixCls}-slider-outer`} id={`outer_${this.randomId}`}>
          <div className={`${prefixCls}-slider-inner`} id={`inner_${this.randomId}`} style={innerStyles} />
        </div>
      </div>
    );
  }
}

export default ScrollBar;
