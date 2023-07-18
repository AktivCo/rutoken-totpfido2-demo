import React from 'react';
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

const ModalComponent = ({title, footer, children, rootCss}) => {
    return (
        <Modal className={rootCss} isOpen={true} fade={false} centered>
            {
                title &&
                <ModalHeader>{title}</ModalHeader>
            }
            <ModalBody>
                {children}
            </ModalBody>
            {
                footer &&
                <ModalFooter>
                    {footer}
                </ModalFooter>
            }
        </Modal>
    )
}

export default ModalComponent;