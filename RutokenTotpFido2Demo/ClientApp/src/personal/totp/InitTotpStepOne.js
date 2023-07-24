import React from "react";
import StepContainer from "../StepContainer";

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

        </StepContainer>
    );
};

export default InitTotpStepOne;