import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { compose, createStore } from 'redux';
import persistState from 'redux-localstorage';

import './index.css';
import App from './App';
import myApp from './reducers';
import registerServiceWorker from './registerServiceWorker';

const enhancer = compose(
    persistState(),
)
const store = createStore(myApp, enhancer)

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
), document.getElementById('root'));

registerServiceWorker();
