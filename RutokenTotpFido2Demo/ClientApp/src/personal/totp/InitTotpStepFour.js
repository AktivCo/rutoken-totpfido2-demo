import React from "react";
import StepContainer from "../StepContainer";

const InitTotpStepFour = ({currentStep}) => {
    return (
        <StepContainer
            stepId={4}
            header={"Проверьте одноразовый пароль"}
            currentStep={currentStep}
        >
            
        </StepContainer>
    );
};

export default InitTotpStepFour;