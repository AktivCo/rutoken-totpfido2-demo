import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import {createRoot} from 'react-dom/client';
import CheckLogin from './CheckLogin';
import App from './App';

import './styles/main.scss';

import thunk from 'redux-thunk'
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import rootReducer from './reducers';


const store = createStore(rootReducer, applyMiddleware(thunk))

console.log(store);

// const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(<Provider store={store}><App/></Provider>);


