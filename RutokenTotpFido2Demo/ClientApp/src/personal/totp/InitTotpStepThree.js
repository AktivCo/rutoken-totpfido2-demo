import React from "react";
import StepContainer from "../StepContainer";

const InitTotpStepThree = ({currentStep}) => {
    return (
        <StepContainer
            stepId={3}
            header={"Установите настройки в приложении и перенесите секретный ключ"}
            currentStep={currentStep}
        >
            
        </StepContainer>
    );
};

export default InitTotpStepThree;