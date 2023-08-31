import React, {useEffect, useState} from "react";
import StepContainer from "../StepContainer";
import {useDispatch, useSelector} from "react-redux";
import {getQrCodeLink} from "../../actions";

const QrCodeRenderer = () => {

    const dispatch = useDispatch();
    const [qrCodeLink, setQrCodeLink] = useState(null);
    const [collapse, setCollapse] = useState(true);

    useEffect(() => {
        dispatch(getQrCodeLink())
            .then((dataUri => {
                setQrCodeLink(dataUri);
            }));
    }, []);

    const collapseClick = () => {
        setCollapse(!collapse);
    }

    if(!qrCodeLink) return null;

    return (
        <div>
        <div className="mt-3 d-flex">
            <img width="183" height="183" src={qrCodeLink} className="personal-qrcode__userlink"></img>
            <div className="d-flex p-2 align-items-center text-secondary">
                <small>
                    QR-код для сохранения <br/>
                    секретного ключа <br/>
                    приложения
                </small>
            </div>
        </div>
        <div>
            <div className="d-flex mt-2 mb-3">
                <div className="d-flex align-items-center cursor-pointer" onClick={() => collapseClick()}>
                    <div className={collapse ? "totp-arrow arrow-icon me-2" : "totp-arrow arrow-icon me-2 rotate-180"}></div>
                    <div className="register-toggle-link">Сохраните секретный ключ в приложении и перенесите его на токен</div>
                </div>
            </div>
            {
                !collapse &&
                <div className="totp-info-ol">
                    <ol>
                        <li>Нажмите на кнопку для сканирования QR-кода и отсканируйте QR-код.</li>
                        <li>Подключите Рутокен OTP:
                            <ul>
                                <li>нажмите кнопку на корпусе токена;</li>
                                <li>поднесите токен к NFC-модулю мобильного устройства;</li>
                                <li>в приложении нажмите <strong>Подключить токен.</strong></li>
                            </ul>
                        </li>
                        <li>В приложении нажмите <strong>Установить настройки.</strong></li>
                        <li>Там же нажмите <strong>Записать секретный ключ.</strong></li>
                    </ol>
                </div>
            }
        </div>
    </div>
    )

}
const InitTotpStepThree = ({currentStep, toNextStep}) => {
    
    const totpParams = useSelector(state => state.totpParams);
    
    return (
        <StepContainer
            stepId={3}
            header={"Установите настройки в приложении и перенесите секретный ключ"}
            currentStep={currentStep}
            toNextStep={toNextStep}
        >
            { totpParams && <QrCodeRenderer /> }
        </StepContainer>
    );
};

export default InitTotpStepThree;
