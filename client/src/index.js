import React from 'react';
import ReactDOM from 'react-dom';
import BookSearch from './components/BookSearch';
import './index.css';


ReactDOM.render(
  <BookSearch url="/" perPage={5} />,
  document.getElementById('root')
);
