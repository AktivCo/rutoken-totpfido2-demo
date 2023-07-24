import React from 'react';
import ModalComponent from "../../modal/ModalComponent";


const EditDeviceNameModal = ({deviceId}) => {
    return (
        <ModalComponent title={"Изменение имени устройства"}>
            Изменение имени устройства с deviceId {deviceId}
        </ModalComponent>
    )
}

export default EditDeviceNameModal;