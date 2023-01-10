function Counter({ count, create_increment, create_decrement }) {
    return (
      <div className="Counter">
        {/* 无需传参 */}
        {/* <button id='plus' onClick={create_increment}>+</button>
        <span id='count'>{count}</span>
        <button id='minus' onClick={create_decrement}>-</button> */}
        {/* 传参写法 */}
        <button id='plus' onClick={() => create_increment(3)}>+</button>
        <span id='count'>{count}</span>
        <button id='minus' onClick={() => create_decrement(3)}>-</button>
      </div>
    );
}

export default Counter