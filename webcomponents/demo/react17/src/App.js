import './App.css';

function App() {
  return (
    <main>
      <fc-bubbles click style={{ '--color': '#57a9ff' }}>
        <fc-3d-btn />
      </fc-bubbles>

      <fc-bubbles click style={{ '--color': '#0af', '--spread-x': '20%' }}>
        <fc-dbl-warp-btn />
      </fc-bubbles>
      
      <fc-bubbles click style={{ '--spread-y': '80%' }}>
        <fc-underline-btn />
      </fc-bubbles>

      <fc-bubbles click>
        <fc-pixel-btn />
      </fc-bubbles>
      
      <fc-bubbles click>
        <fc-parenthesis-btn />
      </fc-bubbles>
      
      <fc-bubbles click>
        <fc-round-btn />
      </fc-bubbles>
      
      <fc-bubbles click style={{ '--spread-x': '40%' }}>
        <fc-arrow-btn />
      </fc-bubbles>
      
      <fc-bubbles click style={{ '--color': '#0bf', '--spread-x': '20%' }}>
        <fc-warp-btn />
      </fc-bubbles>

      <fc-china />
    </main>
  );
}

export default App;
