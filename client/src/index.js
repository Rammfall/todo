import ReactDOM from 'react-dom';
import React, { Component } from 'react';

const root = document.getElementById('root');
class MyComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      res: 4
    };
  }

  render() {
    const { res } = this.state;

    return <div>{res}</div>;
  }
}

ReactDOM.render(<MyComponent />, root);
