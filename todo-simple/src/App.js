import React from 'react';
import './css/style.css';
// import M from 'materialize-css';

import { TodoContainer } from './TodoContainer.js';

class App extends React.Component {
  
  componentDidMount() {
    // M.AutoInit();
  }

  render() {
    return (
      <div className="container">
          <TodoContainer />
      </div>
    );
  }
}

export default App;
