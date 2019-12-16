import {applyMiddleware, createStore, compose} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import ReduxPromise from 'redux-promise'
import ReduxThunk from 'redux-thunk'
import apiMiddleware from './middlewares/apiMiddleware'
import rootReducer from "../reducers";

const composeEnhancers = composeWithDevTools({serialize: true, trace: true})


export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, composeEnhancers(
    applyMiddleware(ReduxPromise),
    applyMiddleware(ReduxThunk),
    applyMiddleware(apiMiddleware),
  ))

}