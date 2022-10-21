import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import SocialNetworkApp from './App';
import reportWebVitals from './reportWebVitals';

document.title = "Social Network";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <SocialNetworkApp/>
);

reportWebVitals();
