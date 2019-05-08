import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './AppContainer';
import { BrowserRouter } from 'react-router-dom';
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><AppContainer /></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});