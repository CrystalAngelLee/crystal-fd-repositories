import { createSlice } from '@reduxjs/toolkit'
import { TODOS_FEATURE_KEY } from '../constances/todos.const'

const initialState = []

const { reducer: TodosReducer, actions } = createSlice({
    name: TODOS_FEATURE_KEY,
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.push(action.payload)
        }
    },
})

export const { addTodo } = actions
export default TodosReducer