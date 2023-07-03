const loginState = (state = false, action) => {
    switch (action.type) {
        case "SET_LOGIN_STATE":
            return action.payload
        default:
            return state
    }
}

export { loginState };