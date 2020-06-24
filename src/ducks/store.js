import {createStore, combineReducers, applyMiddleware} from 'redux'
import userReducer from './userReducer'
import testReducer from './testReducer'
import promiseMiddleware from 'redux-promise-middleware'


const rootReducer = combineReducers({
    users: userReducer,
    posts: testReducer
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware))