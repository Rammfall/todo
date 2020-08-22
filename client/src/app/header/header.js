import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';

import './header.scss';

export default class Header extends PureComponent {
  render() {
    return (
      <header className="header">
        <div className="container header__container">
          <NavLink to="/" className="header__logo">
            ToDoRes
          </NavLink>
          <nav>
            <ul className="nav">
              <li className="nav__item">
                <NavLink
                  activeClassName="nav__link--active"
                  to="/login/"
                  className="nav__link"
                >
                  Login
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  activeClassName="nav__link--active"
                  to="/register/"
                  className="nav__link"
                >
                  Register
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  activeClassName="nav__link--active"
                  to="/about/"
                  className="nav__link"
                >
                  About
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  activeClassName="nav__link--active"
                  to="/contact/"
                  className="nav__link"
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}
