import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './header/header';
import Footer from './footer/footer';
import Content from './content';
import './application.scss';

const App = () => (
  <Router>
    <div className="application">
      <Header />
      <Switch>
        <Route path="/" />
        <Route path="/about/" compnent={Content} />
      </Switch>
      <Footer />
    </div>
  </Router>
);

export default App;
