import Counter from './scense/counter'
import CustomCounter from './scense/counter.custom'
import DelayCounter from './scense/counter.delay'
import CreateCouter from './scense/couter.createaction'

function App() {
  return (
    <div className="App">
      <div> 简易计数器 </div>
      <Counter/>
      <div> 指定增减数值计数器 </div>
      <CustomCounter/>
      <div> 延迟执行计数 </div>
      <DelayCounter/>
      <div>CreactAction counter</div>
      <CreateCouter/>
    </div>
  );
}

export default App;
