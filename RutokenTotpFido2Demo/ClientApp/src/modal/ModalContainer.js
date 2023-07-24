import React from 'react';
import {useSelector} from "react-redux";

const ModalContainer = () => {
    const MODAL = useSelector(state => state.modal);
    
    if (!MODAL.modal) {
        return <></>;
    }
    
    const WrappedModalComponent = MODAL.modal;
    
    return <WrappedModalComponent {...MODAL.data} />;
};

export default ModalContainer;
