import React from 'react'

function Counter({count, increment, decrement, ...props}) {
    return (
        <div>
            <button onClick={increment}>+</button>
            <span>{count}</span>
            <button onClick={() => decrement(3)}>-</button>
        </div>
    )
}

export default Counter
