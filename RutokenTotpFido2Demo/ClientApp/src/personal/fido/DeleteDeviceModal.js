import React from "react";
import {useDispatch} from "react-redux";
import {Button} from "reactstrap";

import ModalComponent from "../../modal/ModalComponent";
import {hideModal} from "../../actions";

const DeleteDeviceModal = ({action, id}) => {
    const dispatch = useDispatch();

    const close = () => {
        dispatch(hideModal());
    }

    const confirm = () => {
        action(id);
    }

    const renderHeader= () => {
        return (
            <div>
                Удаление устройства Fido2
            </div>
        );
    }

    const renderFooter= () => {
        return (
            <>
                <Button className='add-mfa' onClick={confirm}>
                    Подтвердить
                </Button>
                <div className="register-toggle-link fw-bolder cursor-pointer" onClick={close}>
                    Отменить
                </div>
            </>
        );
    }

    return (
        <ModalComponent rootCss={'custom-modal'} title={renderHeader()} footer={renderFooter()}>
            <div className="text-center">
                Вы уверены что хотите удалить устройство Fido2?
            </div>
        </ModalComponent>
    )
}

export default DeleteDeviceModal;