import React, { Component } from 'react';

class Questionnaire extends Component {
  static displayName = 'Questionnaire';
  static defaultProps = {
    prefixCls: 'cr-questionnaire',
  }
  render() {
    const { prefixCls } = this.props;
    return (
      <div className={prefixCls}>

      </div>
    )
  }
}

export default Questionnaire