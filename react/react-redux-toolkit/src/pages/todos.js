import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { TODOS_FEATURE_KEY } from '../constances/todos.const'
import { addTodo } from '../store/todos.slice'

function Todos() {
    const dispatch = useDispatch()
    const todos = useSelector(state => state[TODOS_FEATURE_KEY])
    return (
        <section className="main">
            <button onClick={() => dispatch(addTodo({ title: 'test' }))}>
                添加任务
            </button>
            <ul className="todo-list">
                {todos.map(todo => (
                    <li key={todo.cid}>
                        <div className="view">
                            <input className="toggle" type="checkbox" />
                            <label>{todo.title}</label>
                            <button className="destroy" />
                        </div>
                        <input className="edit" />
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default Todos
