import { createAction } from 'redux-actions'

// 好处： 当我们使用这种方式创建的时候，我们不需要将 type 抽象成常量，后续使用直接使用对应的定义好的常量即可
export const create_increment = createAction('create_increment')
export const create_decrement = createAction('create_decrement')