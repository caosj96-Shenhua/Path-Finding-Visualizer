import React from 'react';
import './App.css';
import PathfindingVisualizer from './PathfindingVisualizer/PathfindingVisualizer';
import TestBoard from './PathfindingVisualizer/TestBoard';

function App() {
  return (
    <div className="App">
      <PathfindingVisualizer></PathfindingVisualizer>

    </div>
    /*
  <div className="App">
    <TestBoard></TestBoard>
  </div>
  */
  );
}

export default App;