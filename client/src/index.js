import React from 'react';
import ReactDOM from 'react-dom';
import BookSearch from './components/BookSearch';
import './index.css';


var perPage = 5;

ReactDOM.render(
  <BookSearch url="/" perPage={perPage} />,
  document.getElementById('root')
);

