import { combineReducers } from 'redux';


const loginState = (state = null, action) => {
    switch (action.type) {
        case "SET_LOGIN_STATE":
            return action.payload
        default:
            return state
    }
}

const userInfo = (state = null, action) => {
    switch (action.type) {
        case "SET_USER_INFO":
            return action.payload
        default:
            return state
    }
}

const rootReducer = combineReducers({
    loginState,
    userInfo
});

export default rootReducer;