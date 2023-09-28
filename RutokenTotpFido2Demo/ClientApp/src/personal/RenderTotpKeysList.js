import React, {useEffect, useState} from "react";
import {useDispatch} from 'react-redux';

import {hideModal, removeTotp, showModal} from "../actions";

import DeleteDeviceModal from "./fido/DeleteDeviceModal";
import {BucketIcon} from "../controls/BucketIcon"

const TotpKeyRow = ({totpkey}) => {
    const dispatch = useDispatch();

    const deleteDevice = (id) => {
        dispatch(showModal(DeleteDeviceModal, {
            title: 'Удаление устройства OTP',
            body: 'Вы уверены, что хотите удалить OTP устройство?',
            action: removeDevice,
            id: id
        }));
    }

    const removeDevice = (totpKey) => {
        dispatch(removeTotp(totpKey))
            .then(() => dispatch(hideModal()))
    }
    
    return (
        <div className="item-device d-flex align-items-center justify-content-between">
            <div>
                <div className="d-flex align-items-center column-gap-2">
                    <div className="fw-w-600">Рутокен OTP</div>
                </div>
            </div>
            <div className="bucket-block" onClick={() => deleteDevice(totpkey)}>
                <div className="bucket-icon cursor-pointer">
                    <BucketIcon></BucketIcon>
                </div>
            </div>
        </div>
    );
}

const RenderTotpKeysList = ({keys}) => {

    return (
        <div className="pb-4">
            <div>
                {keys.map((el, id) => <TotpKeyRow key={id} totpkey={el}></TotpKeyRow>)}
            </div>
        </div>

    )
}


export default RenderTotpKeysList;
