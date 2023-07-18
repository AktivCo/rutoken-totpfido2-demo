import axios from "axios";
import { coerceToArrayBuffer, coerceToBase64Url } from "../utils/utils";

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
    return (dispatch, getState) => {
        let sequense = Promise.resolve();

        sequense = sequense.then(() => axios.post('/totp/register', getState().totpParams));

        sequense = sequense
            .then((response) => getUserInfo()(dispatch));

        return sequense;
    };
}

const removeTotp = (key) => {
    return (dispatch) => {
        let sequense = Promise.resolve();

        sequense = sequense.then(() => axios.get(`/totp/remove/${key.id}`));

        sequense = sequense
            .then((response) => getUserInfo()(dispatch));

        return sequense;
    };
}

const getSecret = () => {
    return (dispatch) => {
        let sequense = Promise.resolve();

        sequense = sequense.then(() => axios.get(`/totp/getsecret`));

        sequense = sequense
            .then((response) => response.data);

        return sequense;

    };
}

const getQrCodeLink = () => {
    return (dispatch, getState) => {

        let sequense = Promise.resolve();

        sequense = sequense.then(() => axios.post(`/totp/qr`, getState().totpParams));

        sequense = sequense
            .then((response) => response.data);

        return sequense;

    };
}

const checkTotp = (totpPassword) => {
    return (dispatch, getState) => {

        const checkParams = {
            ...getState().totpParams,
            totpPassword
        }
        
        let sequense = Promise.resolve();
        
        sequense = sequense.then(() => axios.post(`/totp/check`, checkParams));

        sequense = sequense
            .then((response) => response.data);

        return sequense;

    };
}

const cacheTotpParams = (params) => (dispatch) => {
    const sequense = Promise.resolve().then(() => {
        dispatch({
            type: 'TOTP_PARAMS',
            payload: params
        });
    });
    return sequense;
}

const registerFido = () => {
    return (dispatch) => {
        let sequense = Promise.resolve();
        
        sequense = sequense.then(() => axios.get('/mfa/makecredentialoptions'));

        sequense = sequense.then((response) => {
            let option = JSON.parse(response.data);
            if (option.status !== "ok")
                throw new Error("Ошибка регистрации токена");

            option.challenge = coerceToArrayBuffer(option.challenge);
            option.user.id = coerceToArrayBuffer(option.user.id);
            option.excludeCredentials = option.excludeCredentials.map((x) => {
                x.id = coerceToArrayBuffer(x.id);
                return x;
            });
            if (option.authenticatorSelection.authenticatorAttachment === null) 
                option.authenticatorSelection.authenticatorAttachment = undefined;

            return option;
        });

        sequense = sequense.then((response) => {
            return navigator.credentials.create({
                publicKey: response
            });
        });

        return sequense;
    };
}

const confirmRegisterFido  =  (credential, label, isWithoutLogin) => {
    return (dispatch) => {
        let sequense = Promise.resolve();

		let attestationObject = new Uint8Array(credential.response.attestationObject);
		let clientDataJSON = new Uint8Array(credential.response.clientDataJSON);
		let rawId = new Uint8Array(credential.rawId);

        const attestationResponse = {
			id: credential.id,
			rawId: coerceToBase64Url(rawId),
			type: credential.type,
			extensions: credential.getClientExtensionResults(),
			response: {
				AttestationObject: coerceToBase64Url(attestationObject),
				clientDataJson: coerceToBase64Url(clientDataJSON)
			}
		};
        
        sequense = sequense.then(() => axios.post('/mfa/makecredential', {attestationResponse, label, isWithoutLogin}));

        sequense = sequense.then((response) => {
            let result = response.data;
            if (result.status !== "ok") 
                throw new Error("Ошибка подтверждения регистрации токена");

            return result;
        });
        
        sequense = sequense.then((response) => getUserInfo()(dispatch));

        return sequense;
    };
}

const renameDeviceFido = (id, label) => {
    return (dispatch) => {
        let sequense = Promise.resolve();

        sequense = sequense.then(() => axios.post('/mfa/renamedevice', {id, label}));

        sequense = sequense.then((response) => getUserInfo()(dispatch));

        return sequense;
    };
}

const deleteDeviceFido = (id) => {
    return (dispatch) => {
        let sequense = Promise.resolve();

        sequense = sequense.then(() => axios.post('/mfa/deletefidokey', null, { params: { id: id}}));
        
        sequense = sequense.then((response) => getUserInfo()(dispatch));

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
    signInOrUp,
    signOut,
    setLoginState,
    checkLoginState,
    getUserInfo,

    getSecret,
    getQrCodeLink,
    registerTotp,
    removeTotp,
    cacheTotpParams,
    checkTotp,

    registerFido,
    confirmRegisterFido,
    renameDeviceFido,
    deleteDeviceFido,
    
    showModal,
    hideModal
};