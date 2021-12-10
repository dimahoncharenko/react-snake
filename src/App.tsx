// Components
import Stage from "./components/Stage";

// Util functions
import { createStage } from "./gameHelpers";

function App() {
  return (
    <div className="App">
      <Stage stage={createStage()}/>
    </div>
  );
}

export default App;
