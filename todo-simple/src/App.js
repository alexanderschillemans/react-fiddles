import React from 'react';
import './style.css';

import { TodoContainer } from './TodoContainer.js';

class App extends React.Component {
  render() {
    return (
      <div className="container">
          <TodoContainer />
      </div>
    );
  }
}

export default App;
