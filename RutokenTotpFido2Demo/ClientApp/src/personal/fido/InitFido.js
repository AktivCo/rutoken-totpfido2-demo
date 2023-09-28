import React, { useState } from "react";
import {useDispatch, useSelector} from "react-redux";

import RegisterFidoModal from "./RegisterFidoModal";
import {showModal} from "../../actions";
import CustomSwitch from "../../controls/Switch/CustomSwitch";

const InitFido = ({setVisible}) => {
    const dispatch = useDispatch();

    const fidoKeys = useSelector(state => state.userInfo.fidoKeys);
    
    const [isWithoutLogin, setIsWithoutLogin] = useState(false);

    const registerFidoDevice = () => {
        dispatch(showModal(RegisterFidoModal, {isWithoutLogin: isWithoutLogin}));
    }

    const close = () => {
        setVisible(false);
    }

    return (
        <div className='mfa-step-one gap-16'>
            {
                fidoKeys.length > 0 &&
                <div className='d-flex align-items-center justify-content-between gap-4'>
                    <div className='personal-add-device-header'>Добавить второй фактор защиты</div>
                    <div className='personal-logout personal-logout__text'
                            onClick={() => close()}
                    >
                        Отменить
                    </div>
                </div>
            }
            <div className='d-flex flex-column'>
                <div className='step-mfa'>ШАГ 1</div>
                <div className='personal-add-device-header'>Подключите устройство</div>
            </div>
            <div className='d-flex flex-column gap-16'>
                <div className='image-mfa'></div>
                <div className='brief-mfa'>
                    <div>Подключите Рутокен MFA к компьютеру и нажмите <b>«Добавить»</b>.</div>
                    <div>Когда появится индикация, нажмите кнопку на корпусе устройства.</div>
                </div>
            </div>
            <div>
                <div className='without-login'>
                    <div className='without-login-switch'>
                        Вход без логина и пароля
                        <CustomSwitch checked={isWithoutLogin} setChecked={setIsWithoutLogin}></CustomSwitch>
                    </div>
                    {
                        isWithoutLogin &&
                        <div className="without-paswd-text">
                            <div>Беспарольная аутентификация требует поддержки</div>
                            <div>со стороны браузера и операционной системы. <span className="link-text cursor-pointer">Подробнее</span></div>
                        </div>
                    }
                </div>
            </div>
            <div className='d-flex align-items-start'>
                <button className='add-mfa' onClick={() => registerFidoDevice()}>Добавить Рутокен MFA</button>
            </div>
        </div>
    );
};

export default InitFido;