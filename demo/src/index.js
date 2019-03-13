import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux'
import Reducers from './reducer'
import reduxThunk from 'redux-thunk';
import ReduxToastr from 'react-redux-toastr';
import promise from 'redux-promise';

//used composeEnhancers to enable Redux-devtool.
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(Reducers, composeEnhancers(applyMiddleware(reduxThunk, promise)));


ReactDOM.render(
  <Provider store={store}>
    <App />
    <ReduxToastr
      timeOut={3000}
      newestOnTop={false}
      preventDuplicates
      position="bottom-right"
      transitionIn="fadeIn"
      transitionOut="fadeOut"
      progressBar
      closeOnToastrClick />
  </Provider>,
document.getElementById('root'));

