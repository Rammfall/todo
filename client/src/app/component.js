import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import Header from './header/header';
import Footer from './footer/footer';
import Content from './content';
import './application.scss';

const App = () => {
  axios.post('/api/v1/user/create/', {
    username: 'some',
    email: 'email@mad.re',
    password: 'pass'
  });

  return (
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
};

export default App;
