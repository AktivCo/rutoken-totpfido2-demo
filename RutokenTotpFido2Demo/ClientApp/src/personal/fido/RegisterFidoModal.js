import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {Modal} from "reactstrap";
import ModalComponent from "../../modal/ModalComponent";
import EditDeviceNameModal from "./EditDeviceNameModal";
import {registerFido, showModal} from "../../actions";

const RegisterFidoModal = () => {
    const dispatch = useDispatch();
    useEffect(() => register(), []);

    const register = () => {
        dispatch(registerFido())
            .then(() => {
                dispatch(showModal(EditDeviceNameModal, {deviceId: 1}))
            })
            .catch(err => {
                //handle error
            });
    }

    return (
        <ModalComponent title={"Регистрация устройства"}>

        </ModalComponent>
    )
}

export default RegisterFidoModal;