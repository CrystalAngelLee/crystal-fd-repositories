import { configureStore } from '@reduxjs/toolkit'
import { TODOS_FEATURE_KEY } from '../constances/todos.const'
import TodosReducer from './todos.slice'

export default configureStore({
    /* 合并 reducer */
    reducer: {
        [TODOS_FEATURE_KEY]: TodosReducer
    },
    /* 是否启用开发者工具 */
    devTools: process.env.NODE_ENV !== 'production'
})