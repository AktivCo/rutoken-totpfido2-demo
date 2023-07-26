import React, {useEffect, useState} from "react";
import StepContainer from "../StepContainer";
import {useDispatch, useSelector} from "react-redux";
import {getQrCodeLink} from "../../actions";

const QrCodeRenderer = () => {

    const dispatch = useDispatch();
    const [qrCodeLink, setQrCodeLink] = useState(null);

    useEffect(() => {
        dispatch(getQrCodeLink())
            .then((dataUri => {
                setQrCodeLink(dataUri);
            }));
    }, []);
    
    if(!qrCodeLink) return null;

    return (
        <div className="mt-3 d-flex">
            <img width="120" height="120" src={qrCodeLink} className="personal-qrcode__userlink"></img>
            <div className="d-flex p-2 align-items-center text-secondary">
                <small>
                    QR-код для сохранения <br/>
                    секретного ключа <br/>
                    приложения
                </small>
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
