import React, { Component } from "react";
import classnames from "classnames";

const prefixCls = "scrollbar";
export default class ScrollBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShow: false,
      scrollLeft: 0,
      scrollTop: 0, // 记录最新一次滚动的scrollTop，用于判断滚动方向
      timer: null, // 滚动条消失定时器
      startX: 0,
      startY: 0, // 记录最新一次点击滚动条时的pageY
      distanceX: 0,
      distanceY: 0, // 记录每次点击滚动条浮标时的内容容器此刻的scrollTop
    };
    this._targetElem = null;
  }

  componentDidMount() {
    const { targetDom } = this.props;
    this._targetElem = document.querySelector(targetDom);
    if (this._targetElem) {
      this.onInitalScrollbar();
    }
  }

  onInitalScrollbar = () => {
    this.scrollX = document.querySelector(".scrollbar");
    this.scrollXBar = document.querySelector(".scrollbar-inner");
    this.calcSize(); // 计算滚动条浮标高度
    this._targetElem.addEventListener("scroll", this.handleScroll);
    this.scrollX.addEventListener("mouseover", this.hoverSrollXBar);

    const scrollAreaValue = this._targetElem.scrollWidth;
    const clientAreaValue = this._targetElem.clientWidth;
    if (scrollAreaValue > clientAreaValue) {
      this.setState({ isShow: true });
    }
  };

  calcSize = () => {
    const clientAreaValue = this._targetElem.clientWidth;
    this.scrollXBar.style.width = (clientAreaValue * clientAreaValue) / this._targetElem.scrollWidth + "px";
  };

  handleScroll = el => {
    const e = el;
    const target = e.target || e.srcElement;
    // 如果最新一次滚动的scrollTop跟上一次不同，即发生了垂直滚动
    // 主要是为了区分是垂直滚动还是横向滚动，因为这里暂时不写纵向滚动条，所以这里注释，为了一个提醒
    // if (target.scrollTop !== scrollTop) {}
    const scrollAreaValue = this._targetElem.scrollWidth;
    const clientAreaValue = this._targetElem.clientWidth;
    const scrollValue = this._targetElem.scrollLeft;
    this.calcSize(); // 每次滚动的时候重新计算滚动条尺寸，以免容器内容发生变化后，滚动条尺寸不匹配变化后的容器宽高
    const distance = (scrollValue * clientAreaValue) / scrollAreaValue; // 根据公式二计算滚动条浮标应该移动距离
    this.scrollXBar.style.transform = `translateX(${distance}px)`;
    this.setState({ scrollLeft: target.scrollLeft });
  };

  hoverSrollXBar = () => {
    const sA = this._targetElem.scrollWidth;
    const cA = this._targetElem.clientWidth;
    // 达到展示滚动条条件时
    if (sA > cA) {
      //     this.scrollXBar.style[style] = cA * cA / sA + 'px'; // 设置滚动条长度
      //     // this.scrollXBar.className += ' is-show';
      this.scrollXBar.addEventListener("mousedown", this.clickStart);
      this.scrollX.addEventListener("mouseout", this.hoverOutSroll);
    }
  };

  clickStart = el => {
    const { startX } = this.state;
    const e = el;
    const _startX = e.pageX; // 记录此刻点击时的pageY，用于后面拖动鼠标计算移动了多少距离
    const distanceX = this._targetElem.scrollLeft; // 记录此刻点击时的内容容器的scrollTop，用于后面根据拖动鼠标移动距离计算得出的内容容器对应滚动比例，进行相加操作，得出最终的scrollTop
    this.setState({ startX: _startX, distanceX }, () => {
      startX.removeEventListener && startX.removeEventListener("mouseout", this.hoverOutSroll);
      document.addEventListener("mousemove", this.moveScrollBar);
      document.addEventListener("mouseup", this.clickEnd);
    });
  };

  /**
   * 滚动条所在区域鼠标移出时，滚动条要消失
   */
  hoverOutSroll = el => {
    this.scrollXBar.removeEventListener("mousedown", this.clickStart);
    this.scrollXBar.removeEventListener("mouseout", this.hoverOutSroll);
  };

  /**
   * 按住滚动条移动
   */
  moveScrollBar = el => {
    const { startX, distanceX } = this.state;
    const e = el;
    const delta = e.pageX - startX;
    const scrollAreaValue = this._targetElem.scrollWidth;
    const clientAreaValue = this._targetElem.clientWidth;
    let change = (scrollAreaValue * delta) / clientAreaValue; // 根据移动的距离，计算出内容应该被移动的距离（scrollTop）
    change += distanceX; // 加上原本已经移动的内容位置，得出确实的scrollTop
    // 如果计算值是负数，证明肯定回到滚动最开始的位置了
    if (change < 0) {
      this._targetElem.scrollLeft = 0;
      return;
    }
    // 如果大于最大等于移动距离，那么即到达底部
    if (change + clientAreaValue >= scrollAreaValue) {
      this._targetElem.scrollLeft = scrollAreaValue - clientAreaValue;
      return;
    }
    this._targetElem.scrollLeft = change; // 设置了scrollTop会引起scroll事件的触发
  };

  clickEnd = () => {
    document.removeEventListener("mousemove", this.moveScrollBar);
    document.removeEventListener("mouseup", this.clickEnd);
    this.scrollX.addEventListener("mouseout", this.hoverOutSroll);
  };

  render() {
    const { className } = this.props;
    const { isShow } = this.state;
    return (
      <div className={classnames(prefixCls, isShow ? "outerbar" : "", className ? className : "")}>
        <div className={classnames(`${prefixCls}-inner`, isShow ? "is-show" : "", className ? `${className}-inner` : "")}></div>
      </div>
    );
  }
}
