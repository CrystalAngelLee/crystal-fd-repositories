import { Component } from 'react'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import api from '../../server/api'

import './index.less'

type PageStateProps = {
  counterStore: {
    counter: number
    increment: Function
    decrement: Function
    incrementAsync: Function
  }
}

interface Index {
  props: PageStateProps
}

@inject('counterStore')
@observer
class Index extends Component {
  componentWillMount() {}

  componentDidMount() {
    api.get('products').then((res) => {
      console.log('res', res)
      // productStore.productList = [...productStore.productList, ...res.data];
    })
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  increment = () => {
    this.props.counterStore.increment()
  }

  decrement = () => {
    this.props.counterStore.decrement()
  }

  incrementAsync = () => {
    this.props.counterStore.incrementAsync()
  }

  render() {
    const { counter } = this.props.counterStore
    return (
      <View className="index">
        <Button onClick={this.increment}>+</Button>
        <Button onClick={this.decrement}>-</Button>
        <Button onClick={this.incrementAsync}>Add Async</Button>
        <Text>{counter}</Text>
      </View>
    )
  }
}

export default Index
