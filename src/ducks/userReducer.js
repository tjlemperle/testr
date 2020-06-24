import axios from 'axios'


const initialState = {
    // user_id: 0,
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    user_email: '',
    role: ''
}

const SET_USER = 'SET_USER'
const GET_USER = 'GET_USER'
const RESET_USER = 'RESET_USER'

export function getUser(){
    const user = axios.get('/auth/me')

    return{
        type: GET_USER,
        payload: user
    }
}

export function resetUser(){
    return{
        type: RESET_USER,
        payload: initialState
    }
}

export function setUser(userObj){
    return {
        type: SET_USER,
        payload: userObj
    }
}



export default function reducer(state = initialState, action) {
    const {type, payload} = action
    switch(type) {
        case SET_USER:
            return {...state, ...payload}
        case GET_USER + '_PENDING':
            return state
        case GET_USER + '_FULFILLED':
            return {...state, ...payload, isLoggedIn: true}
        case GET_USER + '_REJECTED':
            return initialState
        default:
            return state
    }
}