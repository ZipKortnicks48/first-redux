import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import 'bootstrap/dist/css/bootstrap.min.css';
import {applyMiddleware, compose, createStore} from 'redux';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {createBrowserHistory as createHistory} from 'history';

import App from "./App";

import rootReducer from './services/reducers';

import * as serviceWorker from './serviceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = process.env.NODE_ENV === 'production' ? [thunk] : [thunk];
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)));
export const history = createHistory();


ReactDOM.render(<Provider store={store}>
        <Router history={history}>
            <App/>
        </Router>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
