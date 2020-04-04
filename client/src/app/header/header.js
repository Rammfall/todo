import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import './header.scss';

export default class Header extends PureComponent {
  render() {
    return (
      <header className="header">
        <div className="container header__container">
          <Link to="/" className="header__logo">
            ToDoRes
          </Link>
          <nav>
            <ul className="nav">
              <li className="nav__item">
                <Link to="/" className="nav__link">
                  Home
                </Link>
              </li>
              <li className="nav__item">
                <Link to="/login/" className="nav__link">
                  Login
                </Link>
              </li>
              <li className="nav__item">
                <Link to="/register/" className="nav__link">
                  Register
                </Link>
              </li>
              <li className="nav__item">
                <Link to="/about/" className="nav__link">
                  About
                </Link>
              </li>
              <li className="nav__item">
                <Link to="/contact/" className="nav__link">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}
