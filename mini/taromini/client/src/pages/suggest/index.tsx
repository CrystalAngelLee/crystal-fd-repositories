import React from 'react'
import { View, Text } from '@tarojs/components'
import { AtFab } from 'taro-ui'

interface SuggestProps {}

const Suggest: React.FC<SuggestProps> = () => {
  return (
    <View>
      <AtFab className={'fabicon'} /* onClick={_onEditData} */>
        <Text className='at-fab__icon at-icon at-icon-add' />
      </AtFab>
    </View>
  )
}

export default Suggest
