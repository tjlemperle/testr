// import axios from 'axios'


const initialState = {
    user_id: 0,
    username: '',
    password: ''
}

const SET_USER = 'SET_USER'

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
        default:
            return state
    }
}