import React, { Component } from "react";
import "./App.css";

import Drawing from "./components/drawing";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Drawing />
        </header>
      </div>
    );
  }
}

export default App;
