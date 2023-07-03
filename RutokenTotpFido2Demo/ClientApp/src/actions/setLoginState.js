const SET_LOGIN_STATE = (param) => ({
    type: 'SET_LOGIN_STATE',
    payload: param
})


const setLoginState = (param) => {
    return (dispatch) => {
        return Promise.resolve()
            .then(() => {
                dispatch(SET_LOGIN_STATE(param));
            });
    }
}

export { setLoginState };