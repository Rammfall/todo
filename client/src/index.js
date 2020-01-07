import ReactDOM from 'react-dom';
import React, { PureComponent } from 'react';

class MyComponent extends PureComponent {
  render() {
    return <div>Hello World</div>;
  }
}

ReactDOM.render(<MyComponent />, MyComponent);
