import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {Input} from 'reactstrap';

import ModalComponent from "../../modal/ModalComponent";
import {confirmRegisterFido, renameDeviceFido, hideModal} from "../../actions";

const EditDeviceNameModal = ({isCreate, credential, isWithoutLogin}) => {
    const dispatch = useDispatch();

    const [error, setError] = useState('');
    const [mfaName, setMfaName] = useState('');
    const handleMfaNameChange = (evt) => setMfaName(evt.target.value);

    const registerNewCredential = () => {
        dispatch(createOrUpdate())
            .then((response) => {
                dispatch(hideModal());
            })
            .catch(err => {
                setError(err.response.data.message);
            });
    }

    const createOrUpdate = () => {
        return isCreate ? confirmRegisterFido(credential, mfaName, isWithoutLogin)
                        : renameDeviceFido(credential, mfaName)
    }

    const close = () => {
        dispatch(hideModal());
    }

    const renderHeader= () => {
        return (
            <div className='d-flex flex-column align-items-center gap-4'>
                {
                    isCreate &&
                    <div className='step-mfa'>ШАГ 3</div>
                }
                <div className='modal-title'>Назовите Рутокен MFA</div>
            </div>
        );
    }

    return (
        <ModalComponent rootCss={'custom-modal' + (isCreate ? ' fade-modal' : '')} title={renderHeader()}>
            <div className='modal-edit d-flex flex-column align-items-stretch justify-content-center'>
                <div className='d-flex flex-column align-items-stretch'>
                    <Input className={"modal-input form-control " + (error ? 'modal-input-error' : '')} 
                        placeholder="Название" value={mfaName} onChange={handleMfaNameChange}></Input>
                    {
                        error 
                            ? <small className="modal-error-text d-block text-danger">{error}</small>
                            : <></>
                    }
                </div>
            </div>
            <div className='modal-pb d-flex flex-column align-items-stretch gap-8'>
                <button className='add-mfa' onClick={() => registerNewCredential()}>Готово</button>
                {
                    !isCreate &&
                    <div className='d-flex flex-column align-items-center'>
                        <div className='register-toggle-link fw-bolder cursor-pointer' 
                            onClick={() => close()}>
                                Закрыть
                        </div>
                    </div>
                }
            </div>
        </ModalComponent>
    )
}

export default EditDeviceNameModal;