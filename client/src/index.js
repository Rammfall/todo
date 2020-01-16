import ReactDOM from 'react-dom';
import React, { PureComponent } from 'react';

const root = document.getElementById('root');
class MyComponent extends PureComponent {
  render() {
    return <div>Hello World</div>;
  }
}

ReactDOM.render(<MyComponent />, root);
