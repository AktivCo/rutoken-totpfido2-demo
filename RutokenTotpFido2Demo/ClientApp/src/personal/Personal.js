import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import cn from "classnames";

import {getUserInfo, signOut} from "../actions";

import Layout from "../common/Layout";
import InitFido from "./fido/InitFido";
import InitTotp from "./totp/InitTotp";
import RenderFidoKeysList from "./RenderFidoKeysList";
import RenderTotpKeysList from "./RenderTotpKeysList";


const RenderTwoFactor = ({fidoKeys, totpKeys}) => {

    const renderStatus = () => cn({
        "personal-two-factor__value ": true,
        "personal-two-factor__value--on": fidoKeys.length || totpKeys.length
    });

    let status = 'Выключена';
    if (fidoKeys.length) status = 'Включена (Рутокен MFA)';
    if (totpKeys.length) status = 'Включена (Рутокен OTP)';

    return (
        <div className="personal-two-factor">
            <div className="personal-two-factor__text">
                Двухфакторная защита учётной записи:
            </div>

            <div className={renderStatus()}>
                {status}
            </div>
        </div>
    );
}

const RenderDeviceInit = ({selectedInitType}) => {
    if (selectedInitType === 'FIDO') return <InitFido/>;
    if (selectedInitType === 'TOTP') return <InitTotp/>;
    return null;
}

const RenderTwoFactorInit = () => {
    const [selectedInitType, selectToggle] = useState(null);

    return (
        <>
            <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="personal-two-factor-heading">Добавить второй фактор защиты</div>
                {
                    selectedInitType && (
                        <div className="personal-logout personal-logout__text"
                                onClick={() => selectToggle(null)}
                        >
                            Отменить
                        </div>
                    )
                }
            </div>

            <div className="personal-two-factor-blocks">
                <div
                    className="personal-two-factor-block cursor-pointer"
                    onClick={() => selectToggle("TOTP")}
                >
                    OTP
                    {
                        selectedInitType === 'TOTP'
                            ? <span className="personal-two-factor-block--done"/>
                            : null
                    }
                </div>
                <div
                    className="personal-two-factor-block cursor-pointer"
                    onClick={() => selectToggle("FIDO")}
                >
                    MFA
                    {
                        selectedInitType === 'FIDO'
                            ? <span className="personal-two-factor-block--done"/>
                            : null
                    }
                </div>
            </div>

            <RenderDeviceInit selectedInitType={selectedInitType}></RenderDeviceInit>
        </>
    );
}

const DevicesContainer = ({fidoKeys, totpKeys}) => {


    if (fidoKeys.length) {
        return <RenderFidoKeysList keys={fidoKeys}/>;
    }

    if (totpKeys.length) {
        return <RenderTotpKeysList keys={totpKeys}/>;
    }

    return <RenderTwoFactorInit></RenderTwoFactorInit>;
}

const Personal = () => {
    const userInfo = useSelector(state => state.userInfo);
    

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserInfo());
    }, []);

    if (!userInfo) return <></>;

    const renderDateLeft = () => {
        if(userInfo.hoursLeft == 0) return `${userInfo.minutesLeft} м.`;
        return `${userInfo.hoursLeft} ч. ${userInfo.minutesLeft} м.`;
    }
    
    return (
        <Layout>
            <div className="personal">
                <div className="personal-heading">Личный кабинет</div>
                <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="personal-info">
                            <div className="personal-info__logo"></div>
                            <div className="personal-info__name">{userInfo.userName}</div>
                        </div>
                        <div className="personal-logout" onClick={() => dispatch(signOut())}>
                            <div className="personal-logout__text">Выйти</div>
                            <div className="personal-logout__logo"></div>
                        </div>
                    </div>
                    <div className="personal-expiration">
                        <div className="personal-expiration__text">Срок действия учётной записи:</div>
                        <div className="personal-expiration__value">{renderDateLeft()}</div>
                    </div>
                    <RenderTwoFactor {...userInfo} />
                </div>
                <DevicesContainer {...userInfo} />
            </div>
        </Layout>
    );
}

export default Personal;
