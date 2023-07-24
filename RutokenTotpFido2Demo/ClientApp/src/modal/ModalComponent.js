import React from 'react';
import {useDispatch} from "react-redux";
import {Modal, ModalBody, ModalHeader} from "reactstrap";


const ModalComponent = ({title, children}) => {
    return (
        <Modal isOpen={true} fade={false}>
            <ModalHeader>{title}</ModalHeader>
            <ModalBody>
                {children}
            </ModalBody>
        </Modal>
    )
}

export default ModalComponent;