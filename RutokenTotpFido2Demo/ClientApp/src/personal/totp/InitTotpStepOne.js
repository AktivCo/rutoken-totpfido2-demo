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
                Для работы в нем необходимо мобильное устройство с NFC-модулем на базе Android 9.0
                и выше.
            </div>
            <div className="d-block mt-2">
                <a className="fw-bolder cursor-pointer"
                   href="https://dev.rutoken.ru/pages/viewpage.action?pageId=132776819#id-%D0%A3%D1%82%D0%B8%D0%BB%D0%B8%D1%82%D0%B0%D0%B8%D0%BD%D0%B8%D1%86%D0%B8%D0%B0%D0%BB%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D0%B8%D0%A0%D1%83%D1%82%D0%BE%D0%BA%D0%B5%D0%BDOTP.%D0%A0%D1%83%D0%BA%D0%BE%D0%B2%D0%BE%D0%B4%D1%81%D1%82%D0%B2%D0%BE%D0%BF%D0%BE%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8E-%D0%9D%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B9%D0%BA%D0%B0%D1%83%D1%81%D1%82%D1%80%D0%BE%D0%B9%D1%81%D1%82%D0%B2%D0%B0%D0%A0%D1%83%D1%82%D0%BE%D0%BA%D0%B5%D0%BDOTP%D0%B2%D0%9E%D0%A1Android"
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