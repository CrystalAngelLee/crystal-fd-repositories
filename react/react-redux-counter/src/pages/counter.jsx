function Counter({ count, increment, decrement }) {
    return (
      <div className="Counter">
        <button id='plus' onClick={increment}>+</button>
        <span id='count'>{count}</span>
        <button id='minus' onClick={decrement}>-</button>
      </div>
    );
}

export default Counter