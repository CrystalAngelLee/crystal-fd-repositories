import React, {
  useState,
  useReducer,
  useEffect,
  useLayoutEffect,
  useContext,
  useRef,
  useMemo,
  useCallback,
  memo,
} from 'react';
import MyContext from '../lib/my-context';

function countReducer(state, action) {
  switch (action.type) {
    case 'add':
      return state + 1;
    case 'minus':
      return state - 1;
    default:
      return state;
  }
}

function MyCountFun() {
  const context = useContext(MyContext);
  const inputRef = useRef();
  // const [count, setCount] = useState(0)
  const [count, dispatchCount] = useReducer(countReducer, 0);
  const [name, setName] = useState('jeck');
  const config = useMemo(
    () => ({
      text: `count is ${count}`,
      color: count > 3 ? 'red' : 'blue',
    }),
    [count]
  );

  const countRef = useRef();
  countRef.current = count;

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // setCount(c => c+1)
  //     dispatchCount({type: 'add' })
  //   }, 1000)
  //   return () => clearInterval(interval)
  // }, [])

  useEffect(() => {
    // console.log('effect');
    // console.log(inputRef);
    return () => {
      // console.log('effect deteched');
    };
  }, [count]);

  // 执行在 渲染之前， 尽量不要使用
  // useLayoutEffect(() => {
  //   console.log('useLayoutEffect')
  //   return () => {
  //     console.log('useLayoutEffect deteched')
  //   }
  // }, [count])

  // const handleButtonClick = useCallback(() => dispatchCount({ type: 'add' }), [])
  const handleButtonClick = useMemo(
    () => () => dispatchCount({ type: 'add' }),
    []
  );
  // 闭包问题处理
  const handleAlertButtonClick = function () {
    setTimeout(() => {
      alert(countRef.current);
    }, 2000);
  };

  return (
    <div>
      <input
        ref={inputRef}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Child config={config} onButtonClick={handleButtonClick} />
      <button onClick={handleAlertButtonClick}>alert button</button>
      {/* <button onClick={() => dispatchCount({ type: 'add' })}>{count}</button>
      <p>{context}</p> */}
    </div>
  );
}

const Child = memo(function Child({ config, onButtonClick }) {
  return (
    <button onClick={onButtonClick} style={{ color: config.color }}>
      {config.text}
    </button>
  );
});

export default MyCountFun;
