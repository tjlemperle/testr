import {createStore, combineReducers, applyMiddleware} from 'redux'
import userReducer from './userReducer'
import testReducer from './testReducer'
import promiseMiddleware from 'redux-promise-middleware'
import { composeWithDevTools } from 'redux-devtools-extension'


const rootReducer = combineReducers({
    users: userReducer,
    posts: testReducer
})

export default createStore(
    rootReducer, 
    composeWithDevTools(applyMiddleware(promiseMiddleware))
    )