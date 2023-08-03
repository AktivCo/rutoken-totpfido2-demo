import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';


import {loginFido, loginWithoutTwoFactor} from "../actions";

const LoginFIDO = () => {
    const twoFactorType = useSelector(state => state.twoFactorType);
    const dispatch = useDispatch();
    useEffect(() => loginFIDO(), [twoFactorType]);
    const statuses = {
        loading: 0,
        success: 1,
        error: 2
    }
    const [status, setStatus] = useState(null);

    const loginFIDO = () => {

        setStatus(statuses.loading);
        dispatch(loginFido())
            .then((response) => {
                setStatus(statuses.success);
            })
            .catch(err => {
                setStatus(statuses.error);
            });

    }
    return (
        <div className="register-form-container">
            <h4 className="text-center mb-4">
                Подключение к токену
            </h4>
            {status === statuses.loading &&
                <div className='modal-pb d-flex flex-column align-items-center'>
                    <div className='spinner'></div>
                    <div className='modal-info-text d-flex flex-column align-items-center mt-4'>
                        <div>Не отключайте токен</div>
                        <div>до завершения процесса</div>
                    </div>
                </div>
            }
            {status === statuses.success &&
                <div className='modal-pb d-flex flex-column align-items-center'>
                    <div className='modal-pb d-flex flex-column align-items-center'>
                        <div className='check-mark-big'></div>
                        <h5 className='fw-bold mt-2'>Успешно!</h5>
                    </div>
                </div>
            }
            {status === statuses.error &&
                <div className='d-flex flex-column align-items-stretch'>
                    <div className='d-flex flex-column align-items-center'>
                        <div className='attention-big'></div>
                        <div className='modal-result-text'>
                            <div>Произошла ошибка,</div>
                            <div>попробуйте еще раз</div>
                        </div>
                    </div>
                    <div className='d-flex flex-column align-items-stretch mt-4'>
                        <button className='add-mfa' onClick={() => loginFIDO()}>Повторить</button>
                    </div>
                    <div className="text-center d-block mt-2">
                        <span className="
                            register-toggle-link
                            fw-bolder
                            cursor-pointer"
                              onClick={() => dispatch(loginWithoutTwoFactor())}
                        >
                            Назад
                        </span>
                    </div>
                </div>
            }
        </div>
    )
}





export default LoginFIDO;