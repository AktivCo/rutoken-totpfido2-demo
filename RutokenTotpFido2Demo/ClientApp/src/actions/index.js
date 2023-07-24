import axios from "axios";

const SET_LOGIN_STATE = (param) => ({
    type: 'SET_LOGIN_STATE',
    payload: param
});

const SET_USER_INFO = (param) => ({
    type: 'SET_USER_INFO',
    payload: param
});


const setLoginState = (param) => {
    return (dispatch) => {
        return Promise.resolve()
            .then(() => {
                dispatch(SET_LOGIN_STATE(param));
            });
    }
}

const checkLoginState = () => {

    return (dispatch) => {
        let sequense = Promise.resolve();

        sequense = sequense.then(() => {
            return axios.get('/user/loginstate', {});
        });

        sequense = sequense
            .then(() => dispatch(SET_LOGIN_STATE(true)))
            .catch(() => {
            });

        return sequense;
    };
}


const signInOrUp = (toSingUp, userName, password, repeatPassword) => {
    return (dispatch) => {

        let sequense = Promise.resolve();

        let model = {
            userName: userName,
            password: password
        }

        let uri = '/user/login';

        if (toSingUp) {
            model.repeatPassword = repeatPassword;
            uri = '/user/register';
        }

        sequense = sequense.then(() => {
            return axios.post(uri, model);
        });

        sequense = sequense
            .then(() => dispatch(SET_LOGIN_STATE(true)));

        sequense = sequense.catch(err => {
            return Promise.reject(err.response.data.message);
        });

        return sequense;
    };
}


const signOut = () => {
    return () => {

        let sequense = Promise.resolve();

        sequense = sequense.then(() => axios.get('/user/logout'));

        sequense = sequense.then(() => window.location.reload());

        return sequense;
    };
}

const getUserInfo = () => {
    return (dispatch) => {
        let sequense = Promise.resolve();

        sequense = sequense.then(() => axios.get('/user/info'));

        sequense = sequense
            .then((response) => dispatch(SET_USER_INFO(response.data)));

        return sequense;
    };
}

const registerTotp = () => {
    return (dispatch) => {
        let sequense = Promise.resolve();

        sequense = sequense.then(() => axios.get('/user/registertotp'));

        sequense = sequense
            .then((response) => getUserInfo()(dispatch));

        return sequense;
    };
}

const removeTotp = (key) => {
    return (dispatch) => {
        console.log(key);
        let sequense = Promise.resolve();

        sequense = sequense.then(() => axios.get(`/user/removetotp/${key.id}`));

        sequense = sequense
            .then((response) => getUserInfo()(dispatch));

        return sequense;
    };
}

const registerFido = () => {
    return (dispatch) => {
        let sequense = Promise.resolve();

        sequense = sequense.then(() => {
            //register
            let pr = new Promise((resolve, reject) => {
                setTimeout(() => resolve(), 2000);
            })
            return pr;
        });
        

        return sequense;
    };
}


const showModal = (modal, data) => (dispatch) => {

    const sequense = Promise.resolve().then(() => {
        dispatch({
            type: 'SHOW_MODAL',
            payload: {
                modal,
                data,
            },
        });
    });
    return sequense;
};

const hideModal = () => (dispatch) => {
    const sequense = Promise.resolve().then(() => {
        dispatch({
            type: 'HIDE_MODAL',
            payload: null,
        });
    });
    return sequense;
};


export {
    setLoginState,
    checkLoginState,
    getUserInfo,
    registerTotp,
    removeTotp,
    signInOrUp,
    signOut,
    registerFido,
    showModal,
    hideModal
};