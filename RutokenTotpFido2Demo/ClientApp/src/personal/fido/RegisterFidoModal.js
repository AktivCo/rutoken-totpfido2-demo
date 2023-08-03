import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";

import ModalComponent from "../../modal/ModalComponent";
import EditDeviceNameModal from "./EditDeviceNameModal";
import {registerFido, showModal, hideModal} from "../../actions";

const RegisterFidoModal = ({isWithoutLogin}) => {
    const dispatch = useDispatch();

    const statuses = {
        loading: 0,
        success: 1,
        error: 2
    }
    const [status, setStatus] = useState(null);

    useEffect(() => register(), []);

    const register = () => {
        setStatus(statuses.loading);
        dispatch(registerFido(isWithoutLogin))
            .then((response) => {
                setStatus(statuses.success);
                setTimeout(() => {
                    dispatch(showModal(EditDeviceNameModal, {isCreate: true, credential: response, isWithoutLogin: isWithoutLogin}))
                }, 1000);
            })
            .catch(err => {
                setStatus(statuses.error);
            });
    }

    const close = () => {
        dispatch(hideModal());
    }

    const renderHeader= () => {
        return (
            <div className='d-flex flex-column align-items-center gap-4'>
                <div className='step-mfa'>ШАГ 2</div>
                <div className='modal-title'>Добавление токена</div>
            </div>
        );
    }

    return (
        <ModalComponent rootCss={'custom-modal'} title={renderHeader()}>
            <div className='d-flex flex-column align-items-stretch'>
                {status === statuses.loading &&
                    <div className='modal-pb d-flex flex-column align-items-center gap-16'>
                        <div className='spinner'></div>
                        <div className='modal-info-text d-flex flex-column align-items-center'>
                            <div>Не отключайте токен</div>
                            <div>до завершения процесса</div>
                        </div>
                    </div>
                }
                {status === statuses.success &&		
                    <div className='modal-pb d-flex flex-column align-items-center gap-16'>	
                        <div className='check-mark-big'></div>
                        <div className='modal-title'>Успешно</div>
                    </div>
                }
                {status === statuses.error &&
                    <div className='modal-gap d-flex flex-column align-items-stretch'>
                        <div className='d-flex flex-column align-items-center gap-16'>
                            <div className='attention-big'></div>
                            <div className='modal-result-text'>
                                <div>Произошла ошибка,</div>
                                <div>попробуйте еще раз</div>
                            </div>
                        </div>
                        <div className='d-flex flex-column align-items-stretch gap-8'>
                            <button className='add-mfa' onClick={() => register()}>Повторить</button>
                            <div className='d-flex flex-column align-items-center'>
                                <div className='register-toggle-link fw-bolder cursor-pointer' 
                                    onClick={() => close()}>
                                        Закрыть
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </ModalComponent>
    )
}

export default RegisterFidoModal;