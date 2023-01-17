function Counter({ count, c_increment, c_decrement }) {
    return (
      <div className="Counter">
        <button id='plus' onClick={() => c_increment(5)}>+</button>
        <span id='count'>{count}</span>
        <button id='minus' onClick={() => c_decrement(5)}>-</button>
      </div>
    );
}

export default Counter