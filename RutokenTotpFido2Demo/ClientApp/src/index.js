// import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import {createRoot} from 'react-dom/client';
import CheckLogin from './CheckLogin';

import './styles/main.scss';

import thunk from 'redux-thunk'
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import rootReducer from './reducers';


const store = createStore(rootReducer, applyMiddleware(thunk))


const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(<Provider store={store}><CheckLogin/></Provider>);


