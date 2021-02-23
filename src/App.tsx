import "./App.css";
import { Draft } from "./components/Draft";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Draft Card</h1>
      </header>
      <main>
        <Draft draft={3} user="BBB" />
      </main>
    </div>
  );
}

export default App;
