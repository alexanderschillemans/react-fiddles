import React, { Component } from 'react';
import './App.css';
import News from './News/News';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            My Feed
          </p>
        </header>
        <News />
      </div>
    );
  }
}

export default App;
