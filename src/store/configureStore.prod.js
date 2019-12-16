import {createStore, applyMiddleware, compose} from 'redux'
import rootReducer from '../reducers'
import ReduxPromise from 'redux-promise'
import ReduxThunk from 'redux-thunk'
import apiMiddleware from './middlewares/apiMiddleware'

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, compose(
    applyMiddleware(ReduxPromise),
    applyMiddleware(ReduxThunk),
    applyMiddleware(apiMiddleware),
    )
  )
}