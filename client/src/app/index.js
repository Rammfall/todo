import React, { PureComponent } from 'react';

import Header from './header/header';
import './application.scss';

export default class Application extends PureComponent {
  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}
