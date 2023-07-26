import React from "react";
import StepContainer from "../StepContainer";
import {Accordion} from "reactstrap";


const InitTotpStepOne = ({currentStep, toNextStep}) => {
    const stepId = 1;
    return (
        <StepContainer
            stepId={stepId}
            header={"Установите приложение на смартфон"}
            currentStep={currentStep}
            toNextStep={toNextStep}
        >
            <div>
                Приложение предназначено для настройки устройств Rutoken OTP. <br/>
                Для работы в нем необходимо устройство с NFC-модулем на базе Android 9.0
                и выше.
            </div>
            <div className="d-block mt-2">
                <a className="fw-bolder cursor-pointer"
                   href="https://dev.rutoken.ru/pages/viewpage.action?pageId=132776819"
                   target="_blank"
                >
                    Подробная инструкция
                </a>
            </div>
            <div className="mt-3 d-flex">
                <div className="personal-qrcode__link"></div>
                <div className="d-flex p-2 align-items-center text-secondary">
                    <small>QR-код для установки <br /> приложения</small>
                </div>
            </div>
            {/*<Accordion  open={true}/>*/}

        </StepContainer>
    );
};

export default InitTotpStepOne;