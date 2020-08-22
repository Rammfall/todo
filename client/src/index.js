import { render } from 'react-dom';
import React from 'react';
import 'webp-in-css/polyfill';

import Application from './app';

const root = document.createElement('div');

root.setAttribute('id', `b_root_est${Math.random()}`);
root.classList.add('broot');
document.body.append(root);

render(<Application />, root);
