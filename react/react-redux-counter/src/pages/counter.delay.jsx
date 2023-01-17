function Counter({ count, delay_increment, delay_decrement, asnyc_increment, asnyc_decrement }) {
    return (
      <div className="Counter">
        {/* <button id='plus' onClick={delay_increment}>+</button> */}
        {/* 使用 saga 所触发的 Action 方法 */}
        <button id='plus' onClick={() => asnyc_increment(8)}>+</button>
        <span id='count'>{count}</span>
        {/* <button id='minus' onClick={() => delay_decrement(2)}>-</button> */}
        <button id='minus' onClick={() => asnyc_decrement(1)}>-</button>
      </div>
    );
}

export default Counter